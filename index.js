let container, canvas, imagen;
const caja_canvas = {
    x:0,
    y:0,
}
const map = {};
const nave = {
    img: './imagenes/nave.png',
    ancho: 80,
    alto: 85,
    x: 250,
    y: 250,
    ang: 0,
    disparar: false,
}
const mouse = {
    x: 0,
    y: 0,
}
class Meteroritos{
    constructor(x, y,ancho, alto, vx, vy, acel, direccion){
        this.img = './imagenes/meteorito.png';
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.vx = vx;
        this.vy = vy;
        this.acel = acel;
        // si es 1-baja 2-sube 3-va_iz 4 va_dere  
        this.direccion = direccion;
    }
}
class balas{
    constructor(x,y,ang){
        this.xIni = x;
        this.yIni = y;
        this.x = x;
        this.y = y;
        this.bala_ang = ang;
        this.acel = 1;
        this.velx = x; 
        this.vely = y; 
    }
}
const arr_balas = [];
const arr_meteo = [];
setInterval(()=>{
    const x_al = ()=>{
        let num = Math.random()*1000;
        return num;
    }
    arr_meteo.push(new Meteroritos(x_al(),-50,50,50,10,0,0.1,1));
    arr_meteo.push(new Meteroritos(x_al(),600,50,50,10,0,0.1,2));
},3000);


function dib_mete(){
    const img_meteo = document.createElement('img');
    img_meteo.src = './imagenes/meteorito.png';
    for (const meteoro of arr_meteo) {
        canvas.drawImage(img_meteo,meteoro.x, meteoro.y, meteoro.ancho, meteoro.alto);
        if(meteoro.direccion == 1){
            meteoro.vy += meteoro.acel;
            meteoro.y += meteoro.vy; 
        }else if(meteoro.direccion == 2){
            meteoro.vy += meteoro.acel;
            meteoro.y -= meteoro.vy;       
        }else if(meteoro.direccion == 3){
            meteoro.vx += meteoro.acel;
            meteoro.x += meteoro.vx; 
        }
    }
}
function iniciar(){
    container = document.getElementById("container");
    container.addEventListener('mousemove', detecPosMouse);
    const element = document.getElementById('canvas');
    caja_canvas.x = element.offsetLeft;
    caja_canvas.y = element.offsetTop;
    imagen = document.createElement('img');
    imagen.src = nave.img;
    canvas = element.getContext("2d");
    imagen.addEventListener("load",dibujar)
    window.addEventListener('click', disparar);
    onkeydown = onkeyup = (e)=> leerEntradas(e);
    loop();
}
function disparar(){
    nave.disparar = true;
}
function detecPosMouse(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}
function leerEntradas(e){
    map[e.key] = e.type == 'keydown';
}
function disparo(){
    if(nave.disparar){
        arr_balas.push(new balas(nave.x+nave.ancho/2, nave.y+nave.alto/2, nave.ang));
        nave.disparar = false;
    }
    
    for (const bala of arr_balas) {
        canvas.fillRect(bala.x, bala.y, 10, 10);
        bala.velx += 20
        bala.vely += 20
        bala.x = ((bala.velx - bala.xIni) * Math.sin(bala.bala_ang+Math.PI/2)) + bala.xIni;
        bala.y = (( bala.yIni - bala.vely) * Math.cos(bala.bala_ang+Math.PI/2)) + bala.yIni;
        canvas.fillStyle = 'red';
    }
}
function dibujar(){
    canvas.clearRect(0,0,500,500);
    dib_mete();
    canvas.save();
    const xMedio = (nave.x+nave.ancho+nave.x)/2;
    const yMedio = (nave.y+nave.alto+nave.y)/2;
    nave.ang = Math.atan2(mouse.y-(yMedio + caja_canvas.y),mouse.x-(xMedio + caja_canvas.x));
    canvas.translate(xMedio,yMedio);
    canvas.rotate(nave.ang+Math.PI/2);
    canvas.drawImage(imagen,nave.x -xMedio,nave.y -yMedio,nave.ancho,nave.alto);
    canvas.restore();
}
function mover_nave(){
    if(map.w){
        nave.y -= 4;
    }
    if(map.s){
        nave.y += 4;
    }
    if(map.d){
        nave.x += 4;
    }
    if(map.a){
        nave.x -= 4;
    }
}
function loop(){
    dibujar();
    mover_nave();
    disparo();
   requestAnimationFrame(loop);
}
window.addEventListener("load", iniciar);