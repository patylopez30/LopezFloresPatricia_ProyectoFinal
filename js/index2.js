function cambiarFondo(){
    document.body.style.backgroundColor = document.body.style.backgroundColor === "pink" ? "olive" : "pink";

}


let animacion = document.querySelector('#animacion');
let activar = false;
let frame = 0;
let intervalo;

function transicion(){
    let imagen = `an_${(frame % 4) + 1}.jpg`;
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
