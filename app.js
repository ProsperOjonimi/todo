"use strict";
const taskContainer = document.querySelector(".tasks-container");
const tasksEmpty = document.querySelector(".task-container_empty");
const addBtn = document.querySelector(".add-task");
const inputField = document.querySelector(".input-field");
const tasksNav = document.querySelector(".tasks-navigation");
const themeSwitch = document.querySelector(".dark-mode");
const lightSwitch = document.querySelector(".light-mode");
const body = document.querySelector("body");
const headerText = document.querySelector(".header_text");
const paragraphs = document.querySelectorAll("p");
const task = document.querySelectorAll(".task");
const editBtns = document.querySelectorAll(".pencil-icon");
const deleteBtns = document.querySelectorAll(".trash-icon");

console.log(headerText);

class App {
  tasks = [];
  isDarkMode = false;
  #data;
  doneState = [];
  constructor() {
    addBtn.addEventListener("click", this._addTasks.bind(this));
    themeSwitch.addEventListener("click", this._themeSwitch.bind(this));
    lightSwitch.addEventListener("click", this._lightTheme.bind(this));

    this._getLocalStorage();
  }

  _addTasks() {
    const inputText = inputField.value.trim();
    if (!inputText) return alert("Please input a task");

    this.tasks.push(inputText);
    this.doneState.push(false);
    localStorage.setItem("doneState", JSON.stringify(this.doneState));
    console.log(this.doneState);
    tasksEmpty.classList.add("hidden");
    taskContainer.classList.remove("hidden");
    // tasksNav.classList.remove("hidden");
    inputField.value = "";

    console.log(this.tasks);
    this.tasks.forEach((e, idx) => {
      this._setlocalStorage();

      this._renderTasks();
    });
  }
  _deleteTasks(t) {
    const taskDelete = t.querySelectorAll(".trash-icon");
    taskDelete.forEach((b) => {
      b.addEventListener("click", (e) => {
        const btnId = parseInt(b.getAttribute("data-id"));
        this.tasks.splice(btnId, 1);
        console.log(this.#data);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        // this.#data.splice(btnId, 1);
        console.log(this.tasks);
        this._renderTasks();
      });
    });
  }
  _mark(t) {
    console.log("checkbox");
    const checkBox = t.querySelectorAll(".checkbox");
    // let doneState = JSON.parse(localStorage.getItem("doneStates"));
    console.log(checkBox);
    // let doneStates = JSON.parse(localStorage.getItem("doneState"));

    checkBox.forEach((c, i) => {
      c.addEventListener("click", (e) => {
        if (c.checked) {
          c.closest(".task").classList.add("task-done");
          console.log(parseInt(c.getAttribute("data-id")));
          this.doneState[parseInt(c.getAttribute("data-id"))] = true;
          localStorage.setItem("doneState", JSON.stringify(this.doneState));
          console.log(this.doneState);
        } else {
          c.closest(".task").classList.remove("task-done");
          this.doneState[parseInt(c.getAttribute("data-id"))] = false;
          localStorage.setItem("doneState", JSON.stringify(this.doneState));
          console.log(this.doneState);
        }
      });
    });
  }
  _editTasks(t) {
    const editBtn = t.querySelectorAll(".pencil-icon");
    editBtn.forEach((b) => {
      b.addEventListener("click", (e) => {
        const btnEditId = parseInt(b.getAttribute("data-id"));
        // this.tasks.splice(btnEditId, 1);
        const newTask = prompt("Edit task");
        if (!newTask) return;
        console.log(newTask);
        console.log(btnEditId);
        console.log(this.tasks[btnEditId]);
        this.tasks[btnEditId] = newTask;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        this._renderTasks();
      });
    });
  }
  _themeSwitch() {
    this.isDarkMode = true;
    if (this.isDarkMode) {
      themeSwitch.classList.add("hidden");
      lightSwitch.classList.remove("hidden");
      console.log(themeSwitch);
      body.style.backgroundColor = "#101828";
      headerText.style.color = "#FFFFFF";
      addBtn.style.backgroundColor = "#4a5565";
      paragraphs.forEach((p) => {
        p.style.color = "#FFFFFF";
      });
      inputField.classList.add("light-input");
      this._renderTasks?.();
    } else {
      return;
    }
  }
  _lightTheme() {
    this.isDarkMode = false;
    themeSwitch.classList.remove("hidden");
    lightSwitch.classList.add("hidden");
    body.style.backgroundColor = "#f3f4f6";
    headerText.style.color = "#333333";
    addBtn.style.backgroundColor = "#000000";
    paragraphs.forEach((p) => {
      p.style.color = "#000000";
    });
    inputField.classList.remove("light-input");
    this._renderTasks?.();
  }

  _setlocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  _getLocalStorage() {
    this.#data = JSON.parse(localStorage.getItem("tasks"));

    if (!this.#data) return;

    this.tasks = this.#data;
    console.log(this.tasks);
    this._renderTasks();
  }

  _renderTasks() {
    if (this.tasks.join("")) {
      const doneStates = JSON.parse(localStorage.getItem("doneState")) || [];
      taskContainer.querySelector(".tasks-proper").innerHTML = "";
      this.tasks.forEach((e, idx) => {
        if (this.tasks.length > 0) {
          const isDone = doneStates[idx];
          const html = `
           <div class="task${isDone ? " task-done" : ""}">
            <div class="task-main">
              <input type="checkbox" name="done" id="done" class="checkbox" data-id=${idx}/>
              <p>${e}</p>
            </div>
            <div class="functional-icons">
              <img src="images/pencil 1.svg" alt="pencil" class="pencil-icon" data-id=${idx}/>
              <img src="images/trash 1.svg" alt="trash" class="trash-icon" data-id=${idx}/>
            </div>
          </div>
          `;
          taskContainer
            .querySelector(".tasks-proper")
            .insertAdjacentHTML("afterbegin", html);
        }
      });
      this._deleteTasks(taskContainer);
      this._mark(taskContainer);
      this._editTasks(taskContainer);

      themeSwitch.addEventListener("click", this._themeSwitch);
      const task = document.querySelectorAll(".task");
      const editBtns = document.querySelectorAll(".pencil-icon");
      const deleteBtns = document.querySelectorAll(".trash-icon");
      const p = document.querySelectorAll("p");

      console.log(this.isDarkMode);
      if (this.isDarkMode) {
        task.forEach((t) => {
          t.style.backgroundColor = "#4a5565";
        });
        editBtns.forEach((b) => {
          b.src = "images/pencil 1.png";
        });
        deleteBtns.forEach((b) => {
          b.src = "images/trash 1.png";
        });
        p.forEach((p) => {
          p.style.color = "#FFFFFF";
        });
      }
      tasksEmpty.classList.add("hidden");
    } else {
      taskContainer.classList.add("hidden");
      taskContainer.innerHTML = `
    <div class="tasks-proper">
          </div>
    
    `;
      tasksNav.classList.add("hidden");
      tasksEmpty.classList.remove("hidden");
    }
  }
}
lightSwitch.classList.add("hidden");
const app = new App();
app._renderTasks();
