
const TaskPendientes = [{id: 1, tarea: "Hacer la cama"},{id: 2, tarea: "Lavar los platos"},{id: 3, tarea: "Sacar la basura"}];
const TaskCompletadas =[];

  //agregar tareas
  function AgregarTarea(){
    const inputTarea = document.getElementById("newTask");
    const btnGuardar = document.getElementById("addNewTask");
    let maxId = 0;

    const texto = inputTarea.value.trim(); // .trim() quita espacios vacíos al inicio/final

    if (texto === "") {
        alert("Por favor, escribe una tarea");
        return;
    };
    console.log(TaskPendientes.length);
    if (TaskPendientes.length === 0) {
        maxId = 1; // Si no hay tareas, empezamos con ID 1
        
    } else {

        // Extraemos todos los IDs en un nuevo arreglo de puros números
        const todosLosIds = TaskPendientes.map(t => t.id);
        // Buscamos el valor máximo y le sumamos 1
        // Usamos "..." (spread operator) porque Math.max no recibe arreglos directamente, sino una lista de números
        maxId = Math.max(...todosLosIds) + 1;
    };

        const nuevaTarea = 
        {
            id: maxId,
            tarea: texto
        };

        TaskPendientes.push(nuevaTarea);
        
        // Limpiar el input después de agregar la tarea
        inputTarea.value = "";

        const ListadoTareas = document.getElementById("TaskList");
        let htmlListado = "";
        
        for (let TareasPendiente of TaskPendientes){
            htmlListado += `<tr><th scope="row">${TareasPendiente.id}</th><td>${TareasPendiente.tarea}</td></tr>`
        };
        ListadoTareas.innerHTML= htmlListado;
        ActualizarResumen();   

  };

function EliminaActualiza(TipoOperacion){ 

    if (TipoOperacion === "eliminar"){
        const ListadoTareas = document.getElementById("EliminarTask");
        let htmlListado = "";
        for (let TareasPendiente of TaskPendientes){
            htmlListado += `
            <tr>
            <th scope="row">${TareasPendiente.id}</th>
            <td>${TareasPendiente.tarea}</td>
            <td>
            <span class="mdi mdi-delete-off" title="borrar" onclick="BorrarPorId(${TareasPendiente.id},'${TipoOperacion}')"></span>
            </td>
            </tr>`
        };
        ListadoTareas.innerHTML= htmlListado;
    } else if (TipoOperacion === "editar"){
            const ListadoTareas = document.getElementById("EditarList");
            let htmlListado = "";
            
            for (let TareasPendiente of TaskPendientes){
                htmlListado += `
                <tr>
                <th scope="row">${TareasPendiente.id}</th>
                <td>${TareasPendiente.tarea}</td>
                <td>
                <span class="mdi mdi-pencil" title="Modificar" id="Modificar" onclick="EditarPorId(${TareasPendiente.id})"></span>
                <span class="mdi mdi-delete-off" title="borrar" onclick="BorrarPorId(${TareasPendiente.id},'${TipoOperacion}')"></span>
                </td>
                </tr>`
            };
            ListadoTareas.innerHTML= htmlListado;
        }
    ActualizarResumen();
}

function EliminarTarea(){
    EliminaActualiza("eliminar");
}

function EditarTarea(){
    EliminaActualiza("editar");
}

function EditarPorId(idRecibido) {
    console.log("Editar tarea con ID:", idRecibido);
    
    const indice = TaskPendientes.findIndex((t) => t.id === idRecibido);
    
    // Validamos que el índice exista antes de continuar
    if (indice === -1) return;

    const tareaOriginal = TaskPendientes[indice];
    const respuestaPrompt = prompt("Modificar tarea:", tareaOriginal.tarea);

    if (respuestaPrompt !== null && respuestaPrompt.trim() !== "") {
        const textoLimpio = respuestaPrompt.trim();
        
        // Validación de duplicados
        const existe = TaskPendientes.some(
            (t) => t.tarea.toLowerCase() === textoLimpio.toLowerCase() && t.id !== idRecibido
        );
        
        if (existe) {
            alert("Error: Ya tienes una tarea llamada '" + textoLimpio + "'");
        } else {
            TaskPendientes[indice].tarea = textoLimpio;
            
            // Importante: Volver a renderizar la vista de edición si estás en ella
            EliminaActualiza("editar"); 
            ActualizarResumen();
        }
    }
}

function BorrarPorId(idRecibido,TipoOperacion) {
    // 1. Buscamos la posición (índice) de la tarea que tenga ese ID
    const indice = TaskPendientes.findIndex((elemento) => elemento.id === idRecibido);
    
    // 2. Si existe, la borramos del arreglo
    if (indice !== -1) {
        TaskCompletadas.push(TaskPendientes[indice]);
        TaskPendientes.splice(indice, 1);
    }
    
    // 3. ¡IMPORTANTE! Volvemos a renderizar la lista para que el cambio se vea
    EliminaActualiza(TipoOperacion); 
    ActualizarResumen();
}


const BotonAgregarTarea = document.getElementById("addNewTask");
const BotonEditarTarea = document.getElementById("editTask");
const BotonEliminarTarea = document.getElementById("eraseTask");

BotonAgregarTarea.addEventListener("click", AgregarTarea);
BotonEditarTarea.addEventListener("click", EditarTarea);
BotonEliminarTarea.addEventListener("click", EliminarTarea);
ActualizarResumen();


function ActualizarResumen(){
let SumaTareas=TaskPendientes.length + TaskCompletadas.length;

//Cargar resumen de tareas
const CargarTareas = document.getElementById("TaskResumen");
let htmltareas = `<h3>Resumen</h3>
 <p>Total Tareas: ${SumaTareas}</p>
 <p>Completadas: ${TaskCompletadas.length} </p>
 <p>Pendientes: ${TaskPendientes.length} </p>`

//console.log(htmltareas);
CargarTareas.innerHTML= htmltareas;

//Cargar listado de tareas pendientes
const ListadoTareas = document.getElementById("TaskListado");
let htmlListado = "";

for (let TareasPendiente of TaskPendientes){
    htmlListado += `<tr><th scope="row">${TareasPendiente.id}</th><td>${TareasPendiente.tarea}</td></tr>`
};
  //console.log(htmlListado);
  ListadoTareas.innerHTML= htmlListado;
};