import logging
import os
import json
import requests
from datetime import datetime, timedelta
import pyodbc

import azure.functions as func

search_endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
search_key = os.getenv("AZURE_SEARCH_API_KEY") 
search_api_version = '2023-07-01-Preview'
search_index_name = os.getenv("AZURE_SEARCH_INDEX")

AOAI_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
AOAI_key = os.getenv("AZURE_OPENAI_API_KEY")
AOAI_api_version = os.getenv("AZURE_OPENAI_API_VERSION")
embeddings_deployment = os.getenv("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT")
chat_deployment = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")

sql_db_server = os.getenv("SQL_DB_SERVER")
sql_db_user = os.getenv("SQL_DB_USER")
sql_db_password = os.getenv("SQL_DB_PASSWORD")
sql_db_name = os.getenv("SQL_DB_NAME")

blob_sas_url = os.getenv("BLOB_SAS_URL")

server_connection_string = f"Driver={{ODBC Driver 17 for SQL Server}};Server=tcp:{sql_db_server},1433;Uid={sql_db_user};Pwd={sql_db_password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
database_connection_string = server_connection_string + f"Database={sql_db_name};"

# font color adjustments
blue, end_blue = '\033[36m', '\033[0m'

place_orders = False

functions = [
    {
        "name": "get_support_image",
        "description": "Get support image for user query",
        "parameters": {
            "type": "object",
            "properties": {
                "user_question": {
                    "type": "string",
                    "description": "User question (i.e., 'Tienes información sobre cómo instalar el XView?', etc.)"
                },
            },
            "required": ["user_question"],
        }
    }
]

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    messages = json.loads(req.get_body())

    response = chat_complete(messages, functions= functions, function_call= "auto")

    products = []
    
    try:
        response_message = response["choices"][0]["message"]
    except:
        logging.info(response)

    # if the model wants to call a function
    if response_message.get("function_call"):
        # Call the function. The JSON response may not always be valid so make sure to handle errors
        function_name = response_message["function_call"]["name"]

        available_functions = {
                "get_support_image": get_support_image,
        }
        function_to_call = available_functions[function_name] 

        function_args = json.loads(response_message["function_call"]["arguments"])
        function_response = function_to_call(**function_args)
        # print(function_name, function_args)

        # Add the assistant response and function response to the messages
        messages.append({
            "role": response_message["role"],
            "function_call": {
                "name": function_name,
                "arguments": response_message["function_call"]["arguments"],
            },
            "content": None
        })

        if function_to_call == get_support_image:
            product_info = json.loads(function_response)
            # show product information after search for a different product that the current one
            # if product_info['product_image_file'] != current_product_image:
                
            products = [display_product_info(product_info)]
            current_product_image = product_info['product_image_file']
            
            # return only product description to LLM to avoid chatting about prices and image files 
            function_response = product_info['description']

        messages.append({
            "role": "function",
            "name": function_name,
            "content": function_response,
        })
     
        response = chat_complete(messages, functions= functions, function_call= "none")
        
        response_message = response["choices"][0]["message"]

    messages.append({'role' : response_message['role'], 'content' : response_message['content']})

    logging.info(json.dumps(response_message))

    response_object = {
        "messages": messages,
        "products": products
    }

    return func.HttpResponse(
        json.dumps(response_object),
        status_code=200
    )


def display_product_info(product_info, display_size=40):
    """ Display product information """

    # Show image
    image_file = product_info['product_image_file']

    # image_url = blob_sas_url.split("?")[0] + f"/{image_file}?" + blob_sas_url.split("?")[1]
    image_url = blob_sas_url + f"/{image_file}"

    response = requests.get(image_url)
    print(image_url)

    # Check if the request was successful
    if response.status_code == 200:
        return {
            "tagline": product_info['tagline'],
            "image_url": image_url 
            }
    else:
        print(f"Failed to retrieve image. HTTP Status code: {response.status_code}")

    # print(f"""
    # {product_info['tagline']}
    # Original price: ${product_info['original_price']} Special offer: ${product_info['special_offer']} 
    # """)
    
def generate_embeddings(text):
    """ Generate embeddings for an input string using embeddings API """

    url = f"{AOAI_endpoint}/openai/deployments/{embeddings_deployment}/embeddings?api-version={AOAI_api_version}"

    headers = {
        "Content-Type": "application/json",
        "api-key": AOAI_key,
    }

    data = {"input": text}

    response = requests.post(url, headers=headers, data=json.dumps(data)).json()
    return response['data'][0]['embedding']

def get_support_image(user_question, categories='*', top_k=1):
    """ Vectorize user query to search Cognitive Search vector search on index_name. Optional filter on categories field. """
     
    url = f"{search_endpoint}/indexes/{search_index_name}/docs/search?api-version={search_api_version}"

    headers = {
        "Content-Type": "application/json",
        "api-key": f"{search_key}",
    }
    
    vector = generate_embeddings(user_question)

    data = {
        "vectors": [
            {
                "value": vector,
                "fields": "description_vector",
                "k": top_k
            },
        ],
        "select": "tagline, description, product_image_file",
    }

    # optional filtered search
    if categories != '*':
        data["filter"] = f"category eq '{categories}'"

    results = requests.post(url, headers=headers, data=json.dumps(data))    
    results_json = results.json()
    
    # Extracting the required fields from the results JSON
    product_data = results_json['value'][0] # hard limit to top result for now

    response_data = {
        "tagline": product_data.get('tagline'),
        "description": product_data.get('description'),
        "product_image_file": product_data.get('product_image_file'),
    }
    return json.dumps(response_data)

def chat_complete(messages, functions, function_call='auto'):
    """  Return assistant chat response based on user query. Assumes existing list of messages """
    
    url = f"{AOAI_endpoint}/openai/deployments/{chat_deployment}/chat/completions?api-version={AOAI_api_version}"

    headers = {
        "Content-Type": "application/json",
        "api-key": AOAI_key
    }

    data = {
        "messages": messages,
        "functions": functions,
        "function_call": function_call,
        "temperature" : 0,
    }

    response = requests.post(url, headers=headers, data=json.dumps(data)).json()

    return response
