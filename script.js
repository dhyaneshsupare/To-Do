//When first time we load the webpage we need to first load our DOM content so that our tasks from localStorage could work.
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];  //If we already saved or added a task which is not completed we need to fetch that arraylist.

    //For rendering a tasks from localStorage to DOM.
    function renderTask(task) {
      const li = document.createElement('li')
      li.setAttribute('data-id', task.id)

      if(task.completed) li.classList.add("completed")

      li.innerHTML = `
      <span> ${task.text}</span>
      <button>delete</button>`;

      li.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed;
        li.classList.toggle('completed')
        saveTasks();
      });

      li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();  //prevent toggeling from deleting an event.
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove();
        saveTasks();
      })

      todoList.appendChild(li)
    }

    tasks.forEach((task) => renderTask(task));  //A forEach loop to render all tasks of an array to DOM.
    
    //To store all this tasks and to remove it from our local storage.
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", () => {
      const taskText = todoInput.value.trim(); //To grab the input task text and remove extra spaces behind it.

      //If someone hit add task btn without filling a task
      if (taskText === "") return;

      //Every time a new task is added it creates a new id and its status for it.
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };

      //To add this new created task in our array.
      tasks.push(newTask);

      //Before clearing the input we need to save it in loclStorage.
      saveTasks();
      renderTask(newTask);

      //clear the input after every successful task added.
      todoInput.value = "";
      console.log(tasks);

      
    });
})