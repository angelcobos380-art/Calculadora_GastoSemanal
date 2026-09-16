// Variables y Selectores 
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");


// Eventos 

eventListener();
function eventListener(){
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto );

    formulario.addEventListener("submit", agregarGasto);
}

//Clases 
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total,gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
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
    imprimirAlerta(mensaje,tipo){
        //crear el div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert");

        if(tipo === "error"){
            divMensaje.classList.add("alert-danger");
        }else {
            divMensaje.classList.add("alert-success");
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en el HTML
        document.querySelector(".primario").insertBefore( divMensaje, formulario)

        // Quitar del HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){
        this.limpiarHTML(); //Elimina el HTML previo
        //Iterar sobre los gastos
        gastos.forEach(gasto => {
            const {cantidad, nombre, id}= gasto;

            //Crear un LI
            const nuevoGasto = document.createElement("li");
            nuevoGasto.className = "list-group-item d-flex justify-content-between align-items-center";
            nuevoGasto.dataset.id = id; 

            //Agregar el HTML del Gasto 
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span> `;

            //Boton para borrar el gasto
            const btnBorrar = document.createElement("button");
            btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
            btnBorrar.innerHTML = "Borrar &times;"
            nuevoGasto.appendChild(btnBorrar);

            //Agregar al html

            gastoListado.appendChild(nuevoGasto);
        })
    }
    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
    actualizarRestante(restante){
    document.querySelector("#restante").textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const { presupuesto, restante } = presupuestoObj;
        const restanteDiv = document.querySelector(".restante")

        // Comprobar 25%
        if( (presupuesto / 4 ) > restante){
            restanteDiv.classList.remove("alert.success", "alert-warning");
            restanteDiv.classList.add("alert-danger");
        } else if((presupuesto/2) > restante){
            restanteDiv.classList.remove("alert.success");
            restanteDiv.classList.add("alert-warning");
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


//Añade Gastos

function agregarGasto(e){
    e.preventDefault();

//Leer datos del formulario 
const nombre = document.querySelector("#gasto").value;
const cantidad = Number(document.querySelector("#cantidad").value);

//Validar
    if(nombre==="" || cantidad === ""){
        ui.imprimirAlerta("Ambos campos son obligatorios", "error");
        return;

    } else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta("Cantidad no Valida", "error");
        return;
    }

    //Generar un objeto con el gasto 
    const gasto = {nombre, cantidad, id: Date.now() }

    //añade nuevo gasto
    presupuesto.nuevoGasto( gasto );

    //Mensaje de Exito
    ui.imprimirAlerta("Gasto Agregado Correctamente");

    // Imprimir los gastos 
    const {gastos, restante } = presupuesto;
    ui.agregarGastoListado(gastos)

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
    //Reiniciar Formulario
    formulario.reset();
}
