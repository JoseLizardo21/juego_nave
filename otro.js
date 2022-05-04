let container, nave;
let nave_datos = {
    y: 0,
    x: 0,
}
const map = {};
function iniciar(){
    container = document.getElementById('container');
    nave = document.getElementById('nave');
    onkeydown = onkeyup = (e)=> leerEntradas(e);
}
function leerEntradas(e){
    map[e.key] = e.type == 'keydown';
    setInterval(mover_nave, 1000);
}
function mover_nave(){
    if(map.s){
        nave_datos.y = nave.offsetTop;
        nave.style.top = nave_datos.y + 1 + "px";
    }
    if(map.w){
        nave_datos.y = nave.offsetTop;
        nave.style.top = nave_datos.y - 1 + "px";
    }
    if(map.a){
        nave_datos.x = nave.offsetLeft;
        nave.style.left = nave_datos.x - 1 + "px";
    }
    if(map.d){
        nave_datos.x = nave.offsetLeft;
        nave.style.left = nave_datos.x + 1 + "px";
    }
}
window.addEventListener("load", iniciar);