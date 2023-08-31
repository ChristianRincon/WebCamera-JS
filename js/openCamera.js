const camara = document.getElementById('camara');
const boton = document.getElementById('capturarFoto');
const btnVoz = document.getElementById('capturaVoz');
const contenedorBotones = document.getElementById('btnContainer');
const titulo = document.getElementById('titulo');

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
        capturaDescarga();
        titulo.style.transform = "scale(1.4)";
        titulo.style.transition = "1000ms";
        titulo.textContent= 'Hermosa voz y hermosa foto';
    }

    setTimeout(() => {
        titulo.style.transform = "scale(1)";
        titulo.style.transition = "1000ms";
        titulo.textContent = 'Intenta con nuevas fotos';
    }, 2000);
});

// Evento para capturar imagen por medio del boton
capturarFoto.addEventListener('click', () =>{
    capturaDescarga();
    titulo.style.transform = "scale(1.4)";
    titulo.style.transition = "1000ms";
    titulo.textContent = '¡Tremenda captura!';

    setTimeout(() => {
        titulo.style.transform = "scale(1)";
        titulo.style.transition = "1000ms";
        titulo.textContent = 'Intenta con nuevas fotos';
    }, 2000);
})

//Evento para capturar imagen por medio de la voz (Recomiendo decir "foto" lo más claro posible)
btnVoz.addEventListener('click', () =>{
    titulo.textContent= 'Di la palabra "Foto" ';
    recognition.start();
})

