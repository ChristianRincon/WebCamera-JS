const camara = document.getElementById('camara');
const boton = document.getElementById('capturarFoto');
const btnVoz = document.getElementById('capturaVoz');
const contenedorBotones = document.getElementById('btnContainer');
const titulo = document.getElementById('titulo');
const audio = document.getElementById("audio");

let mediaStream = null;

navigator.mediaDevices.getUserMedia({video: true})
.then(stream =>{
    camara.srcObject = stream;
    mediaStream = stream;

    contenedorBotones.style.Display = 'flex';

    const botonCapturar = document.createElement('button');
    botonCapturar.className = 'boton';
    botonCapturar.textContent = 'Capturar Foto';
    boton.appendChild(botonCapturar);

    const botonVoz = document.createElement('button');
    botonVoz.className = 'boton';
    botonVoz.textContent = 'Captura por voz';
    btnVoz.appendChild(botonVoz);
})
.catch(error =>{
    console.error('Error al acceder a su cámara:', error)
})


// Función para capturar y descargar la imagen
function capturaDescarga() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = camara.videoWidth;
    canvas.height = camara.videoHeight;

    context.drawImage(camara, 0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'captura.jpg';
    audio.play();
    link.click();
}

// Utilizamos la api de reconocimiento de voz 'SpeechRecognition'
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'es-ES';

recognition.addEventListener('result', event => {
    const transcript = event.results[0][0].transcript; //'event.results' es una lista de resultados. 
    console.log(event.results) // Podemos ver dicha lista en el navegador

    if (transcript.toLowerCase().includes('foto')) {
        camara.style.transform = "scale(1.098)";
        camara.style.transition = "1000ms";
        camara.style.boxShadow = "2px 2px 30px 30px red";
        capturaDescarga();
        var mensaje = new SpeechSynthesisUtterance("Tremenda foto crack!")
        mensaje.rate = 0.8;
        mensaje.pitch = 0.9;
        window.speechSynthesis.speak(mensaje);
        titulo.textContent= 'Hermosa voz y hermosa foto';
    }

    setTimeout(() => {
        titulo.textContent = 'Intenta con nuevas fotos';
        camara.style.transform = "scale(1)";
        camara.style.boxShadow = "none";
    }, 2000);
});

// Evento para capturar imagen por medio del boton
capturarFoto.addEventListener('click', () =>{
    camara.style.transform = "scale(1.098)";
    camara.style.transition = "1000ms";
    camara.style.boxShadow = "2px 2px 30px 30px red";
    capturaDescarga();
    titulo.textContent = '¡Tremenda captura!';

    setTimeout(() => {
        titulo.textContent = 'Intenta con nuevas fotos';
        camara.style.transform = "scale(1)";
        camara.style.boxShadow = "none"
    }, 2000);
})

//Evento para capturar imagen por medio de la voz (Recomiendo decir "foto" lo más claro posible)
btnVoz.addEventListener('click', () =>{
    titulo.textContent= 'Di la palabra "Foto"';
    recognition.start();
})

