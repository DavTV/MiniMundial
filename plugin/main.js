const contenedorBanderas = $("#banderas");
const primerPais = $("#primerPais");
const segundoPais = $("#segundoPais");
const optionPais1=$("#opccionPais1");
const optionPais2=$("#opccionPais2");
const pais1=$("#pais1");
const pais2 = $("#pais2");
const modal = $("#modalContenedor")
const abrirModal=$("#btnModal");
const cerrarModal=$("#btnCerrarModal");
const formModal = $("#modal");
const selectEquipo = $("#equipoApostado")
const error =$("#mensajeError");
const apuesta = $("#apuesta");
const castigo =$("#castigo"); 
const btnIniciar=$("#iniciar");
const tiempo=$("#tiempo");
const pantalla = $("#pantalla");
const btnPase = $("#pase");
const btnReiniciar = $("#reinicio");
const goles = $("#goles");
const fin = $("#fin");
auxiliarInicio= 0; 
// const puntaje1 = $("#puntaje1");
// const puntaje2 = $("#puntaje2");
let arrayBanderas=["ad","ae","af","ag","ai","al","am","ao","aq","ar","as","at","au","aw","ax","az","ba","bb","bd","be","bf","bg","bh","bi","bj","bl","bm","bn","bo","bq","br","bs"];

let jugadas =[12,34,67,10,4,5,1,56,23,59,100];

PintarBanderas(arrayBanderas);
PintarOpciones(arrayBanderas,primerPais);
PintarOpciones(arrayBanderas,segundoPais);
SeleccionPaís();
FuncionModal();
IniciarJuego();

// PINTAR LAS BANDERAS DE LA VISTA INDEX
function PintarBanderas(array){
   
    for (let i = 0; i < 20; i++) {
        let bandera = array[i];
        let img = $('<img>',{
            "src":`imagenes/banderas/${bandera}.png`,
            "class":"imgBanderas"
        });

        contenedorBanderas.append(img);
    }
}

// PINTAR LAS OPCIONES DEL MENU DE JUEGO
function PintarOpciones(array,select){
    for (let i = 0; i < 20; i++) {
        let bandera = array[i];
       let div= $("<div>",{
            "class":"option",
            "data-bandera":bandera,
            "data-imagen":`imagenes/banderas/${bandera}.png" alt="${bandera}`,
            "html": `
            <img src="imagenes/banderas/${bandera}.png" alt="${bandera}">
            <span>${bandera}</span>
        `
       });
        select.append(div);
        
    }
}

// SELECIONAR LOS PAISES SELECCIONADOS
function SeleccionPaís(){
    let valor1,valor2;
    
    $(document).click(function(e){
        let option = e.target;
  
        if(option.classList.contains("option")){
            let detalle= e.target.parentElement;    
            detalle.removeAttribute("open");

         if(detalle.id == "primerPais"){

             pais1.html(`
                <img src="${option.getAttribute("data-imagen")}" class="paisVersus" />
                <p>${option.getAttribute("data-bandera")}</p>
             
             `);
            //  ---
             valor1=option.getAttribute("data-bandera");
           
             optionPais1.val(valor1);
             optionPais1.text(valor1);
             auxiliarInicio = auxiliarInicio+1;
         }else{
            pais2.html(`
            <img src="${option.getAttribute("data-imagen")}" class="paisVersus" />
            <p>${option.getAttribute("data-bandera")}</p>
            
         `);
         valor2=option.getAttribute("data-bandera");
        
            optionPais2.val(valor2)
            optionPais2.text(valor2);
            auxiliarInicio = auxiliarInicio+1;



         }   
        }
    })
    
}

// TODAS LAS FUNCIONES DEL MODAL
function FuncionModal(){
    abrirModal.click(function(){
        modal.removeClass("none");
    })
    cerrarModal.click(function(e){
        e.preventDefault();
        modal.addClass("none");

    })
    formModal.submit(function(e){
        e.preventDefault();
        if(selectEquipo.val() == ""){
            error.text("Debe Selecionar un equipo primero.")
        }else{
            error.text("");
            modal.addClass("none");
            apuesta.text("Se apostaron: "+castigo.val()+ " a " + selectEquipo.val());
        }

    })
}


// EMPIEZA LA LOGICA DEL JUEGO
// Cada pase es una posición al azar del arreglo de jugadas
//Despues de cada selección de pase se hará un desorden del arreglo para variar los resultado
function IniciarJuego(){
    let contador = 0;
    // let tiempo =0;
    btnIniciar.click(function(){
        
 
        if(auxiliarInicio<=1){
            fin.text("SELECCIONE SUS EQUIPOS PRIMERO");
        }else{
            let interval = setInterval(() => {
                contador = contador+1;
                
                tiempo.text(contador+" sg");
                if(contador>=60){
                    clearInterval(interval)
                    fin.text("FIN DEL JUEGO");
                    btnPase.addClass("none");
                    btnReiniciar.removeClass("none");
                    auxiliarInicio=0;
                }

            }, 1000);
        GenerarPase();  

    }
    })
}

function GenerarPase(){
   let auxiliar = pais1, paseAnterior; 
    let puntuacion = 0;

    pantalla.html(`<h3>Empieza a jugar ${auxiliar.find("p").text()}</h3>`);
    btnPase.click(function(){
        // --------
        DesordenarArreglo(jugadas);
        // -----
        let pase = ValorAzar(jugadas);
        // ---
        puntuacion=0;
        pantalla.html( `<h3>${auxiliar.text()} Saco : ${pase}</h3> ` )
        
        puntuacion = puntuacion+pase;
        // console.log(puntuacion)
        if(paseAnterior <= pase){
            // auxiliar=auxiliar;
            pantalla.html( `<h3>${auxiliar.text()}  Saco :  ${pase} continua jugando</h3>`);
            if(puntuacion>=100 || pase>=100){
            pantalla.html( `<h3>${auxiliar.text()} Realizo un gol</h3>`);
             let div =  $("<div>",{
                "text": `Gol de  ${auxiliar.text()}`
            });
            goles.append(div);
            puntuacion = 0;
            }
        }else{
            if(auxiliar == pais1){
                auxiliar=pais2;               
                pantalla.html( `<h3>Le toca jugar a  ${auxiliar.text()}</h3>` );
            }else{
                auxiliar=pais1;
                pantalla.html( `<h3>Le toca jugar a  ${auxiliar.text()}</h3>` );

            }
            // console.log(puntuacion,"P")
        }

        
        paseAnterior= pase;

    })
}
function ValorAzar(arreglo){
    let posicion = Math.floor(Math.random()*arreglo.length);
    return arreglo[posicion];
}
function DesordenarArreglo(array){
    console.log(array)
    let nuevoOrden = [];
    let eliminado;
    do{
        let posicion = Math.floor(Math.random() * array.length);
        eliminado=array.splice(posicion,1);
        nuevoOrden.push(eliminado[0])
    }while(array.length != 0);
     jugadas = nuevoOrden;
}
