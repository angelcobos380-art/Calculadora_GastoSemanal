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
    }
}
class UI {

}

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
}

