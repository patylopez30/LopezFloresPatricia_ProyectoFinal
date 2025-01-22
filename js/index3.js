function cambiarFondo(){
    document.body.style.backgroundColor = document.body.style.backgroundColor === "salmon" ? "white" : "salmon";

}

let programas = [];

async function cargarPrograma() {
    try {
        let respuesta = await fetch("programas.json");
        programas = await respuesta.json();
    } catch (error) {
        console.log(error => console.error("Error Al Cargar La Información:", error));
    }
}

function actualizarInfo() {
    let programa = document.getElementById("programa");
    let campo = document.getElementById("campo");
    let informacion = document.getElementById("informacion");
    let indiceSeleccionado = parseInt(programa.value, 5);
    let campoSeleccionado = campo.value;

    if(indiceSeleccionado < 0) {
        informacion.value = "Selecciona A Un Programa Válido";
        return;
    }

    let datos = programas [indiceSeleccionado];

    if(programas && campoSeleccionado in datos)
        informacion.value = datos[campoSeleccionado];
    else
        informacion.value = "Información No Disponible";
}

async function init() {
    await cargarPrograma();
    document.getElementById("programa").addEventListener("change", actualizarInfo);
    document.getElementById("campo").addEventListener("change", actualizarInfo);
}

init()
    .then(() => {
        console.log("Inicialización Completada");
    }).catch((error) => {
    console.log(`Error Durante La Inicialización ${error.message}`);
});




let animacion = document.querySelector('#animacion');
let activar = false;
let frame = 0;
let intervalo;

function transicion(){
    let imagen = `menu_${(frame % 4) + 1}.jpg`;
    animacion.style.backgroundImage = `url("img/${imagen}")`;
}

animacion.addEventListener('dblclick', function(){
    if(!activar) {
        activar = true;
        intervalo = setInterval(() => {
            transicion();
            frame++;
        }, 220)
    } else {
        activar = false;
        clearInterval(intervalo);
    }
});

transicion();