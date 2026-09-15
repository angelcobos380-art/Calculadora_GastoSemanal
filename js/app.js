// Variables y Selectores 
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");


// Eventos 

eventListener();
function eventListener(){
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto );
}

//Clases 
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}
class UI {
    insertarPresupuesto(cantidad){
        //Extrayendo los valores
      const{presupuesto, restante} = cantidad;

      //Agregando al html 
      document.querySelector("#total").textContent = presupuesto;
      document.querySelector("#restante").textContent = restante;

    }
}


//Instanciar
const ui = new UI();
let presupuesto; 

// Funciones 
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt("Cual es tu presupuesto?");
    // console.log(presupuestoUsuario);
    
    if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }
//Presupuesto Valido
presupuesto = new Presupuesto(presupuestoUsuario);
console.log(presupuesto);

ui.insertarPresupuesto(presupuesto);
}

