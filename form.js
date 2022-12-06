// Obtener el formulario de nueva tarea y la tabla de tareas pendientes
const newTaskForm = document.getElementById('new-task-form');
const pendingTasksTable = document.getElementById('pending-tasks-table');

// Configurar el formulario para enviar los datos de la nueva tarea a la aplicación web
newTaskForm.addEventListener('submit', async (event) => {
event.preventDefault();

// Obtener los datos del formulario
const formData = new FormData(newTaskForm);
const title = formData.get('title');
const description = formData.get('description');
const deadline = formData.get('deadline');
const category = formData.get('category');

// Enviar los datos a la aplicación web
const response = await fetch('/tasks/new', {
method: 'POST',
body: JSON.stringify({
title: title,
description: description,
deadline: deadline,
category: category
}),
headers: {
'Content-Type': 'application/json'
}
});

if (response.ok) {
// Si se ha creado la tarea correctamente, actualizar la lista de tareas pendientes
const tasks = await response.json();
updatePendingTasksTable(tasks);
} else {
// Si ha habido un error, mostrar un mensaje de error
alert('Error creating task. Please try again.');
}
});

// Función para actualizar la lista de tareas pendientes en la interfaz de usuario
function updatePendingTasksTable(tasks) {
// Limpiar la tabla de tareas pendientes
pendingTasksTable.innerHTML = '';

// Agregar una fila a la tabla por cada tarea pendiente
tasks.forEach((task) => {
const row = document.createElement('tr');// Agregar las columnas con los datos de la tarea
const titleColumn = document.createElement('td');
titleColumn.innerText = task.title;
row.appendChild(titleColumn);

const descriptionColumn = document.createElement('td');
descriptionColumn.innerText = task.description;
row.appendChild(descriptionColumn);

const deadlineColumn = document.createElement('td');
deadlineColumn.innerText = task.deadline;
row.appendChild(deadlineColumn);

const categoryColumn = document.createElement('td');
categoryColumn.innerText = task.category;
row.appendChild(categoryColumn);

// Agregar la fila a la tabla de tareas pendientes
pendingTasksTable.appendChild(row);
});
}