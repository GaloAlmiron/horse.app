// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar la conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Crear un esquema para los datos de las tareas
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  category: String,
  done: Boolean
});

// Crear un modelo para los datos de las tareas
const Task = mongoose.model('Task', taskSchema);

// Configurar las rutas de la aplicación
app.get('/tasks', async (req, res) => {
    // Obtener la lista de tareas pendientes
    const tasks = await Task.find({ done: false });
  
    // Enviar la lista de tareas como respuesta
    res.send(tasks);
  });
  
  app.post('/tasks/new', async (req, res) => {
    // Crear una nueva tarea con los datos recibidos
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      category: req.body.category,
      done: false
    });
  
    // Guardar la nueva tarea en la base de datos
    await task.save();
  
    // Enviar una respuesta indicando que la tarea se ha creado correctamente
    res.send({ message: 'Task created successfully' });
  });
  