
const TaskPendientes = [];
const TaskCompletadas =[];

  //agregar tareas
  function AgregarTarea(){
    const inputTarea = document.getElementById("newTask");
    const btnGuardar = document.getElementById("addNewTask");
    let maxId=0;

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
            tarea: texto,
            completada: false
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

function EditarTarea(){
    const ListadoTareas = document.getElementById("EditarList");
    let htmlListado = "";
      
    for (let TareasPendiente of TaskPendientes){
    htmlListado += `
    <tr>
    <th scope="row">${TareasPendiente.id}</th>
    <td>${TareasPendiente.tarea}</td>
    <td>
        <span class="mdi mdi-pencil" title="Modificar"></span>
        <span class="mdi mdi-delete-off" title="borrar"></span>
    </td>
    </tr>`
    };
    ListadoTareas.innerHTML= htmlListado;
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