document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const newTaskInput = document.getElementById("newTask");
    const addTaskButton = document.getElementById("addTask");
  
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span class="${task.is_done ? "done" : ""}">${task.task_name}</span>
          <button class="markDone">Done</button>
          <button class="deleteTask">Delete</button>
        `;
  
        const markDoneButton = taskItem.querySelector(".markDone");
        markDoneButton.addEventListener("click", function () {
          tasks[index].is_done = !tasks[index].is_done;
          renderTasks();
        });
  
        const deleteTaskButton = taskItem.querySelector(".deleteTask");
        deleteTaskButton.addEventListener("click", function () {
          tasks.splice(index, 1);
          renderTasks();
        });
  
        taskList.appendChild(taskItem);
      });
      saveTasksToLocalStorage();
    }
  
    // Add task
    addTaskButton.addEventListener("click", function () {
      const taskName = newTaskInput.value;
      if (taskName.trim() !== "") {
        tasks.push({ task_name: taskName, is_done: false });
        renderTasks();
        newTaskInput.value = "";
      }
    });
  
    renderTasks();
  });
  