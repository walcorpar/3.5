const TaskPendientes = [];
const TaskCompletadas = [];

// AGREGAR TAREAS
function AgregarTarea() {
    const inputTarea = document.getElementById("newTask");
    let maxId = 0;
    const texto = inputTarea.value.trim();

    if (texto === "") {
        alert("Por favor, escribe una tarea");
        return;
    }

    if (TaskPendientes.length === 0 && TaskCompletadas.length === 0) {
        maxId = 1;
    } else {
        const todosLosIds = [...TaskPendientes, ...TaskCompletadas].map(t => t.id);
        maxId = Math.max(...todosLosIds) + 1;
    }

    const nuevaTarea = {
        id: maxId,
        tarea: texto,
        completada: false
    };

    TaskPendientes.push(nuevaTarea);
    inputTarea.value = "";

    // Después de agregar, refrescamos la vista actual
    ActualizarResumen();
}

// FUNCIÓN ÚNICA Y REUTILIZABLE PARA DIBUJAR TABLAS
// idContenedor: el ID del tbody donde se dibujará
// conAcciones: booleano para saber si ponemos los iconos de borrar/editar
function renderizarTabla(idContenedor, conAcciones) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    let htmlListado = "";
    for (let t of TaskPendientes) {
        htmlListado += `
        <tr>
            <th scope="row">${t.id}</th>
            <td>${t.tarea}</td>
            ${conAcciones 
                ? `
            <td>
                <span class="mdi mdi-pencil" title="Modificar" style="cursor:pointer"></span>
                <span class="mdi mdi-delete-off" title="borrar" style="cursor:pointer" 
                      onclick="BorrarPorId(${t.id}, '${idContenedor}')"></span>
            </td>` 
                : `
            <td>
                <span class="mdi mdi-delete-off" title="borrar" style="cursor:pointer" 
                      onclick="BorrarPorId(${t.id}, '${idContenedor}')"></span>
            </td>`}
        </tr>`;
    }
    contenedor.innerHTML = htmlListado;
}

// LÓGICA DE BORRADO REUTILIZABLE
function BorrarPorId(idRecibido, idContenedorOriginal) {
    const indice = TaskPendientes.findIndex((t) => t.id === idRecibido);
    
    if (indice !== -1) {
        TaskPendientes.splice(indice, 1);
    }
    
    // REUTILIZACIÓN: Volvemos a dibujar la tabla en el contenedor donde estábamos
    renderizarTabla(idContenedorOriginal, true);
    ActualizarResumen();
}

// FUNCIONES DE LOS BOTONES DEL MENÚ
function EditarTarea() {
    renderizarTabla("EditarList", true);
}

function EliminarTarea() {
    renderizarTabla("EliminarTask", false);
}

// ACTUALIZAR RESUMEN Y LISTA PRINCIPAL
function ActualizarResumen() {
    let SumaTareas = TaskPendientes.length + TaskCompletadas.length;

    // Cargar resumen
    const CargarTareas = document.getElementById("TaskResumen");
    CargarTareas.innerHTML = `
        <h3>Resumen</h3>
        <p>Total Tareas: ${SumaTareas}</p>
        <p>Completadas: ${TaskCompletadas.length}</p>
        <p>Pendientes: ${TaskPendientes.length}</p>`;

    // Cargar listado principal (sin botones de acción)
    renderizarTabla("TaskListado", false);
    
    // También actualizamos la lista de la sección "Agregar" (id: TaskList)
    renderizarTabla("TaskList", false);
}

// EVENTOS
document.getElementById("addNewTask").addEventListener("click", AgregarTarea);
document.getElementById("editTask").addEventListener("click", EditarTarea);
document.getElementById("eraseTask").addEventListener("click", EliminarTarea);

// Carga inicial
ActualizarResumen();