// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.

var system_prompt = `Eres Luisa, un asistente virtual de atención al cliente que ayuda a los clientes de Megacable con problemas de instalación de su equipo XView plus y a resolver dudas sobre cómo crear una cuenta de Netflix.

TAREAS PRINCIPALES:
- Ayuda a los clientes a configurar su equipo XView plus.
- Contesta preguntas frecuentes sobre el servicio de XView plus.
- Responde a las preguntas de los clientes sobre cómo crear una cuenta de Netflix.


En una conversación recuerda que:
- Antes de llamar a una función, intenta responder a las consultas de los clientes utilizando el contexto de la conversación.
- Si la información no está clara o disponible, consulta get_product_information para obtener detalles precisos. Nunca inventes respuestas.
- Proporciona respuestas en 3 oraciones, enfatizando la concisión y la precisión.
- Aborda las consultas relacionadas con la cuenta del cliente o los pedidos con las funciones apropiadas.
- Sé amable.
- Si alguien te da su nomnbre, usa su nombre en la conversación para referirte a él, sin comas (por ejempo "Hola Juan" en lugar de "Hola, Juan").


La siguiente sección es parte de tu conocimiento para atender y ayudar a los clientes:

NETFLIX:
  CREACION DE CUENTA:
  (Si te piden ayuda específica en la creación de cuenta, SIEMPRE usa la función get_support_image para proporcionar una imagen de ayuda visual dependiendo de en qué paso estén)
    1. Ingresa a netflix.com e ingresa un email.
    2. Al dar click, se te pedirá una contraseña.
    3. Verifica tu email para confirmar tu cuenta.
    Recuerda escribir una contraseña que tenga al menos ocho caractéres (mayúsculas, minúsculas, números y caracteres especiales como signos de interrogación, de pesos, entre otros)

  PREGUNTAS FRECUENTES:
    Q: ¿Cómo puedo acceder a netflix?
    A: Puedes acceder a netflix desde la app en tu equipo XView plus o entrando a netflix.com.
    ----
    Q: ¿Cómo puedo pagar netflix?
    A: Puedes pagar netflix con tarjeta de crédito o débito o con cargo a tu cuenta de Megcable.
    ----
    Q: ¿En dónde se me cobra?
    A: El cargo se hace a tu cuenta de Megacable o a la tarjeta que tengas registrada.
    ----
    Q: ¿Cómo lo instalo?
    A: Puedes instalar Netflix en tu equipo XView plus desde el menú principal.
    ----
    Q: ¿Cómo puedo poner en el menú principal mi app de netflix?
    A: Puedes agregar la app de Netflix al menú principal desde la sección de aplicaciones.



EQUIPO XVIEW PLUS:
  INSTALACION:
  (Haz hincapié en que en 4 sencillos pasos se puede instalar el equipo y dalos en orden y en un solo mensaje.)
  (Si te piden ayuda en la instalación ocupa la función get_support_image para proporcionar una imagen de ayuda visual)
    1. Conecta tu caja al cable coaxial que viene en la red interna de hogar.
    2. Configura la red de tu internet via Wi-Fi o Ethernet.
    3. Conecta el cable HDMI a la caja de tu XView plus.
    4. Finalmente conecta tu caja a la corriente eléctrica.
    ¡Prende tu caja y disfruta!

  PREGUNTAS FRECUENTES:
    Q: ¿Cómo se conecta el equipo?
    A: Conecta el equipo a la corriente y al televisor con el cable HDMI. Si tienes internet, conéctalo a través de Wi-Fi o Ethernet.
    ----
    Q: ¿Cómo sé que mi XView está encendido?
    A: La luz de la caja debe estar en verde.
    ----
    Q: La luz está en rojo, ¿qué significa?
    A: Si la luz está en rojo, la caja no tiene señal. Verifica que el cable HDMI esté conectado correctamente.
    ----
    Q: ¿Cómo se reinicia?
    A: Desconecta de la corriente y espera 10 segundos antes de volver a conectar.
    ----
    Q: Ya lo reinicie y no tengo señal de internet.
    A: Asegúrate de que las pestañas del cable ethernet estén bien aplastadas.
    ----
    Q: ¿Cómo ingreso a mis apps?
    A: Para ingresar a tus aplicaciones favoritas, ve a la sección de apps, selecciona la aplicación a la que deseas acceder y coloca tu usuario y contraseña actual. Las suscripción de las membresías de las aplicaciones no están incluidas en la mensualidad de Xview Plus.
    ----
    Q: ¿Cómo creo perfiles?
    A: Si deseas crear un perfil para cada miembro de tu familia ingresa a ajustes, perfiles y agregar nuevo perfil. Es importante que esta configuración la lleves a cabo desde el perfil del administrador ya que es el único que puede realizarlo. Durante la configuración del nuevo perfil deberás seleccionar una imagen, colocar el nombre y configurar el control de padres y el saldo para las compras dentro de la caja.
    
    RECOMENDACIONES:
    - Conecta en otro enchufe diferente al que tienes todo el equipo.
  

SERVICIO XVIEW PLUS:
  Q: ¿Cuál es la diferencia entre Xview y Xview Plus?
  A: Xview Plus es la evolución de Xview ya que tiene todas las bondades de Xview de pausar, reiniciar, regresar o grabar un programa en vivo, agregando más beneficios. Con la nueva caja de Xview Plus tu TV se convierte en Smart TV. Podrás descargar tus aplicaciones favoritas, controlar y darle indicaciones con tu voz, buscar tus series y películas de una manera más fácil y rápida en todas tus aplicaciones sin necesidad de salir de la caja.
  ----
  Q: ¿Cómo configuro mi control remoto con mi caja?
  A: Cuando inicias por primera vez tu caja Xview Plus, aparecerá una pantalla para realizar la configuración y deberás de seleccionar “Conectar”, presionar el botón “X” de Xview y Volumen+ (V+) simultáneamente durante 6 segundos y aparecerá un mensaje de vinculación exitosa.
  ----
  Q: ¿Cómo obtengo un control remoto de voz?
  A: Si tu equipo no viene con un control remoto por voz, podrás adquirirlo en tu CIS más cercano a un precio muy accesible
  ----
  Q: ¿Cuánto cuesta Xview Plus?
  A: Xview Plus tiene un costo de 50 pesos al mes.
  ----
  Q: ¿Tengo acceso a xview móvil?
  A: Por ser cliente Xview tendrás acceso a todos los canales interactivos de la plataforma en tus dispositivos móviles como celular, PC, Tablet.


REGLAS GENERALES:
- La única funcion que tienes disponible es get_support_image, la cual te permite obtener imagenes para ayuda visual al cliente.
- ¡NUNCA ADIVINES LAS ENTRADAS DE LAS FUNCION! Si la solicitud de un usuario no está clara, solicita más aclaraciones.
- Jamás le des al usuario links a imágenes (ni en formato markdown ni en formato plano)
- Si te preguntan qué puedes hacer, responde con la lista de tareas principales.
- Si te piden ayuda referente a netflix, siempre usa la función get_support_image para proporcionar una imagen de ayuda visual dependiendo de en qué paso estén.

`

// var system_prompt = `You are an AI assistant focused on delivering brief product details and assisting with the ordering process.
// - Before calling a function, aim to answer product queries using existing conversational context.
// - If the product information isn't clear or available, consult get_product_information for accurate details. Never invent answers.  
// - Address customer account or order-related queries with the appropriate functions.
// - Before seeking account specifics (like account_id), scan previous parts of the conversation. Reuse information if available, avoiding repetitive queries.
// - NEVER GUESS FUNCTION INPUTS! If a user's request is unclear, request further clarification. 
// - Provide responses within 3 sentences, emphasizing conciseness and accuracy.
// - If not specified otherwise, the account_id of the current user is 1000
// - Pay attention to the language the customer is using in their latest statement and respond in the same language!
// `

const TTSVoice = "en-US-JennyMultilingualNeural" // Update this value if you want to use a different voice

const CogSvcRegion = "westeurope" // Fill your Azure cognitive services region here, e.g. westus2

const IceServerUrl = "turn:relay.communication.microsoft.com:3478" // Fill your ICE server URL here, e.g. turn:turn.azure.com:3478
let IceServerUsername
let IceServerCredential

const TalkingAvatarCharacter = "lisa"
const TalkingAvatarStyle = "casual-sitting"

supported_languages = ["en-US", "es-ES"] // The language detection engine supports a maximum of 4 languages

let token

const speechSynthesisConfig = SpeechSDK.SpeechConfig.fromEndpoint(new URL("wss://{region}.tts.speech.microsoft.com/cognitiveservices/websocket/v1?enableTalkingAvatar=true".replace("{region}", CogSvcRegion)))

// Global objects
var speechSynthesizer
var avatarSynthesizer
var peerConnection
var previousAnimationFrameTimestamp = 0

messages = [{ "role": "system", "content": system_prompt }];

function removeDocumentReferences(str) {
  // Regular expression to match [docX]
  var regex = /\[doc\d+\]/g;

  // Replace document references with an empty string
  var result = str.replace(regex, '');

  return result;
}

// Setup WebRTC
function setupWebRTC() {
  // Create WebRTC peer connection
  fetch("/api/getIceServerToken", {
    method: "POST"
  })
    .then(async res => {
      const reponseJson = await res.json()
      peerConnection = new RTCPeerConnection({
        iceServers: [{
          urls: reponseJson["Urls"],
          username: reponseJson["Username"],
          credential: reponseJson["Password"]
        }]
      })

      // Fetch WebRTC video stream and mount it to an HTML video element
      peerConnection.ontrack = function (event) {
        console.log('peerconnection.ontrack', event)
        // Clean up existing video element if there is any
        remoteVideoDiv = document.getElementById('remoteVideo')
        for (var i = 0; i < remoteVideoDiv.childNodes.length; i++) {
          if (remoteVideoDiv.childNodes[i].localName === event.track.kind) {
            remoteVideoDiv.removeChild(remoteVideoDiv.childNodes[i])
          }
        }

        const videoElement = document.createElement(event.track.kind)
        videoElement.id = event.track.kind
        videoElement.srcObject = event.streams[0]
        videoElement.autoplay = true
        videoElement.controls = false
        document.getElementById('remoteVideo').appendChild(videoElement)

        canvas = document.getElementById('canvas')
        remoteVideoDiv.hidden = true
        canvas.hidden = false

        videoElement.addEventListener('play', () => {
          remoteVideoDiv.style.width = videoElement.videoWidth / 2 + 'px'
          window.requestAnimationFrame(makeBackgroundTransparent)
        })
      }

      // Make necessary update to the web page when the connection state changes
      peerConnection.oniceconnectionstatechange = e => {
        console.log("WebRTC status: " + peerConnection.iceConnectionState)

        if (peerConnection.iceConnectionState === 'connected') {
          document.getElementById('loginOverlay').classList.add("hidden");
        }

        if (peerConnection.iceConnectionState === 'disconnected') {
        }
      }

      // Offer to receive 1 audio, and 1 video track
      peerConnection.addTransceiver('video', { direction: 'sendrecv' })
      peerConnection.addTransceiver('audio', { direction: 'sendrecv' })

      // start avatar, establish WebRTC connection
      avatarSynthesizer.startAvatarAsync(peerConnection).then((r) => {
        if (r.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log("[" + (new Date()).toISOString() + "] Avatar started. Result ID: " + r.resultId)
          greeting()
        } else {
          console.log("[" + (new Date()).toISOString() + "] Unable to start avatar. Result ID: " + r.resultId)
          if (r.reason === SpeechSDK.ResultReason.Canceled) {
            let cancellationDetails = SpeechSDK.CancellationDetails.fromResult(r)
            if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
              console.log(cancellationDetails.errorDetails)
            };

            console.log("Unable to start avatar: " + cancellationDetails.errorDetails);
          }
        }
      }).catch(
        (error) => {
          console.log("[" + (new Date()).toISOString() + "] Avatar failed to start. Error: " + error)
          document.getElementById('startSession').disabled = false
          document.getElementById('configuration').hidden = false
        }
      )

    })
}

async function generateText(prompt) {

  messages.push({
    role: 'user',
    content: prompt
  });

  let generatedText
  let products
  await fetch(`/api/message`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(messages) })
    .then(response => response.json())
    .then(data => {
      generatedText = data["messages"][data["messages"].length - 1].content;
      messages = data["messages"];
      products = data["products"]
    });

  addToConversationHistory(generatedText, 'light');
  if (products.length > 0) {
    addProductToChatHistory(products[0]);
  }
  return generatedText;
}

// Connect to TTS Avatar API
function connectToAvatarService() {
  // Construct TTS Avatar service request
  let videoCropTopLeftX = 600
  let videoCropBottomRightX = 1320
  let backgroundColor = '#00FF00FF'

  const videoFormat = new SpeechSDK.AvatarVideoFormat()
  videoFormat.setCropRange(new SpeechSDK.Coordinate(videoCropTopLeftX, 0), new SpeechSDK.Coordinate(videoCropBottomRightX, 1080));

  const avatarConfig = new SpeechSDK.AvatarConfig(TalkingAvatarCharacter, TalkingAvatarStyle, videoFormat)
  avatarConfig.backgroundColor = backgroundColor

  avatarSynthesizer = new SpeechSDK.AvatarSynthesizer(speechSynthesisConfig, avatarConfig)
  avatarSynthesizer.avatarEventReceived = function (s, e) {
    var offsetMessage = ", offset from session start: " + e.offset / 10000 + "ms."
    if (e.offset === 0) {
      offsetMessage = ""
    }
    console.log("Event received: " + e.description + offsetMessage)
  }

}

window.startSession = () => {
  var iconElement = document.createElement("i");
  iconElement.className = "fa fa-spinner fa-spin";
  iconElement.id = "loadingIcon"
  var parentElement = document.getElementById("playVideo");
  parentElement.prepend(iconElement);

  speechSynthesisConfig.speechSynthesisVoiceName = TTSVoice
  document.getElementById('playVideo').className = "round-button-hide"

  fetch("/api/getSpeechToken", {
    method: "POST"
  })
    .then(response => response.text())
    .then(response => {
      speechSynthesisConfig.authorizationToken = response;
      token = response
    })
    .then(() => {
      speechSynthesizer = new SpeechSDK.SpeechSynthesizer(speechSynthesisConfig, null)
      connectToAvatarService()
      setupWebRTC()
    })
}

async function greeting() {
  addToConversationHistory("Hola, mi nombre es Luisa, ¿Cómo puedo ayudarte?", "light")

  // let spokenText = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>Hello, my name is Lisa. How can I help you?</voice></speak>"
  let spokenText = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='en-US'><voice name='Microsoft Server Speech Text to Speech Voice (en-US, JennyMultilingualNeural)'><lang xml:lang='es-MX'>Hola, mi nombre es Luisa ¿Cómo puedo ayudarte el día de hoy?.</lang></voice></speak>";
  avatarSynthesizer.speakSsmlAsync(spokenText, (result) => {
    if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
      console.log("Speech synthesized to speaker for text [ " + spokenText + " ]. Result ID: " + result.resultId)
    } else {
      console.log("Unable to speak text. Result ID: " + result.resultId)
      if (result.reason === SpeechSDK.ResultReason.Canceled) {
        let cancellationDetails = SpeechSDK.CancellationDetails.fromResult(result)
        console.log(cancellationDetails.reason)
        if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
          console.log(cancellationDetails.errorDetails)
        }
      }
    }
  })
}

window.speak = (text) => {
  async function speak(text) {
    addToConversationHistory(text, 'dark')

    fetch("/api/detectLanguage?text=" + text, {
      method: "POST"
    })
      .then(response => response.text())
      .then(async language => {
        console.log(`Detected language: ${language}`);

        const generatedResult = await generateText(text);

        let spokenTextssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyMultilingualNeural'><lang xml:lang="${language}">${generatedResult}</lang></voice></speak>`

        if (language == 'ar-AE') {
          spokenTextssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='ar-AE-FatimaNeural'><lang xml:lang="${language}">${generatedResult}</lang></voice></speak>`
        }
        let spokenText = generatedResult
        avatarSynthesizer.speakSsmlAsync(spokenTextssml, (result) => {
          if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            console.log("Speech synthesized to speaker for text [ " + spokenText + " ]. Result ID: " + result.resultId)
          } else {
            console.log("Unable to speak text. Result ID: " + result.resultId)
            if (result.reason === SpeechSDK.ResultReason.Canceled) {
              let cancellationDetails = SpeechSDK.CancellationDetails.fromResult(result)
              console.log(cancellationDetails.reason)
              if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
                console.log(cancellationDetails.errorDetails)
              }
            }
          }
        })
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  speak(text);
}

window.stopSession = () => {
  speechSynthesizer.close()
}

window.startRecording = () => {
  const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token, 'westeurope');
  speechConfig.authorizationToken = token;
  speechConfig.SpeechServiceConnection_LanguageIdMode = "Continuous";
  var autoDetectSourceLanguageConfig = SpeechSDK.AutoDetectSourceLanguageConfig.fromLanguages(supported_languages);
  // var autoDetectSourceLanguageConfig = SpeechSDK.AutoDetectSourceLanguageConfig.fromLanguages(["en-US"]);

  document.getElementById('buttonIcon').className = "fas fa-stop"
  document.getElementById('startRecording').disabled = true

  recognizer = SpeechSDK.SpeechRecognizer.FromConfig(speechConfig, autoDetectSourceLanguageConfig);

  recognizer.recognized = function (s, e) {
    if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
      console.log('Recognized:', e.result.text);
      window.stopRecording();
      // TODO: append to conversation
      window.speak(e.result.text);
    }
  };

  recognizer.startContinuousRecognitionAsync();

  console.log('Recording started.');
}

window.stopRecording = () => {
  if (recognizer) {
    recognizer.stopContinuousRecognitionAsync(
      function () {
        recognizer.close();
        recognizer = undefined;
        document.getElementById('buttonIcon').className = "fas fa-microphone"
        document.getElementById('startRecording').disabled = false
        console.log('Recording stopped.');
      },
      function (err) {
        console.error('Error stopping recording:', err);
      }
    );
  }
}

window.submitText = () => {
  document.getElementById('spokenText').textContent = document.getElementById('textinput').currentValue
  document.getElementById('textinput').currentValue = ""
  window.speak(document.getElementById('textinput').currentValue);
}


function addToConversationHistory(item, historytype) {
  const list = document.getElementById('chathistory');
  const newItem = document.createElement('li');
  newItem.classList.add('message');
  newItem.classList.add(`message--${historytype}`);
  newItem.textContent = item;
  list.appendChild(newItem);
}

function addProductToChatHistory(product) {
  const list = document.getElementById('chathistory');
  const listItem = document.createElement('li');
  listItem.classList.add('product');
  listItem.innerHTML = `
    <fluent-card class="product-card" style="width: 100%; max-width: 500px;">
      <div class="product-card__header" style="width: 100%; display: flex; justify-content: center;">
        <img src="${product.image_url}" alt="Product image" style="width: 100%; height: auto; max-width: 500px;">
      </div>
    </fluent-card>
  `;
  list.appendChild(listItem);
}


// Make video background transparent by matting
function makeBackgroundTransparent(timestamp) {
  // Throttle the frame rate to 30 FPS to reduce CPU usage
  if (timestamp - previousAnimationFrameTimestamp > 30) {
    video = document.getElementById('video')
    tmpCanvas = document.getElementById('tmpCanvas')
    tmpCanvasContext = tmpCanvas.getContext('2d', { willReadFrequently: true })
    tmpCanvasContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    if (video.videoWidth > 0) {
      let frame = tmpCanvasContext.getImageData(0, 0, video.videoWidth, video.videoHeight)
      for (let i = 0; i < frame.data.length / 4; i++) {
        let r = frame.data[i * 4 + 0]
        let g = frame.data[i * 4 + 1]
        let b = frame.data[i * 4 + 2]

        if (g - 150 > r + b) {
          // Set alpha to 0 for pixels that are close to green
          frame.data[i * 4 + 3] = 0
        } else if (g + g > r + b) {
          // Reduce green part of the green pixels to avoid green edge issue
          adjustment = (g - (r + b) / 2) / 3
          r += adjustment
          g -= adjustment * 2
          b += adjustment
          frame.data[i * 4 + 0] = r
          frame.data[i * 4 + 1] = g
          frame.data[i * 4 + 2] = b
          // Reduce alpha part for green pixels to make the edge smoother
          a = Math.max(0, 255 - adjustment * 4)
          frame.data[i * 4 + 3] = a
        }
      }

      canvas = document.getElementById('canvas')
      canvasContext = canvas.getContext('2d')
      canvasContext.putImageData(frame, 0, 0);
    }

    previousAnimationFrameTimestamp = timestamp
  }

  window.requestAnimationFrame(makeBackgroundTransparent)
}
