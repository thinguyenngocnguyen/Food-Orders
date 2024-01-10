const inputBox = document.querySelector("#newTask");
const addBtn = document.querySelector("#addItem");
const deleteALL = document.querySelector("#clearAll");

let todoList = [];
const TODOLIST_LOCALSTORAGE = "new_list_todo";

let completedList = [];
const COMPLETEDLIST_LOCALSTORAGE = "new_list_complete";

showTasks();

addBtn.onclick = () => {
  let enterTask = inputBox.value;

  let getLocalStorageData_todo = localStorage.getItem(TODOLIST_LOCALSTORAGE);
  if (getLocalStorageData_todo == null) {
    todoList = [];
  } else {
    todoList = JSON.parse(getLocalStorageData_todo);
  }

  let getLocalStorageData_complete = localStorage.getItem(
    COMPLETEDLIST_LOCALSTORAGE
  );
  if (getLocalStorageData_complete == null) {
    completedList = [];
  } else {
    completedList = JSON.parse(getLocalStorageData_complete);
  }

  todoList.push(enterTask);
  localStorage.setItem(TODOLIST_LOCALSTORAGE, JSON.stringify(todoList));
  showTasks();
  addBtn.classList.remove("active");
};

function showTasks() {
  let getLocalStorageData_todo = localStorage.getItem(TODOLIST_LOCALSTORAGE);
  if (getLocalStorageData_todo == null) {
    todoList = [];
  } else {
    todoList = JSON.parse(getLocalStorageData_todo);
  }

  let getLocalStorageData_complete = localStorage.getItem(
    COMPLETEDLIST_LOCALSTORAGE
  );
  if (getLocalStorageData_complete == null) {
    completedList = [];
  } else {
    completedList = JSON.parse(getLocalStorageData_complete);
  }

  const pendingTache = document.querySelector(".pendingTasks");
  pendingTache.textContent = todoList.length;
  if (todoList.length > 0) {
    deleteALL.classList.add("active");
  } else {
    deleteALL.classList.remove("active");
  }

  let todoListContentHTML = "";
  let completedListContentHTML = "";

  todoList.forEach((element, index) => {
    todoListContentHTML += `
    <li> ${element}
    <div>
    <span class="supp" onclick="deleleTask('${element}')">
    <i class="fa-solid fa-trash" style:" ></i>
    </span>
    <span class="comp" onclick="completedTask('${element}')">
    <i class="fa-solid fa-circle-check"></i>
    </span>
    </div>

    </li>
    `;
  });

  completedList.forEach((element, index) => {
    completedListContentHTML += `
    <li> ${element} 
    <div>
    <span class="supp" onclick="deleleTask('${element}')">
    <i class="fa-solid fa-trash" style:" ></i>
    </span>
    <span class="comp" onclick="completedTask('${element}')">
    <i class="fa-solid fa-circle-check"></i>
    </span>
    </div>
    </li>

    `;
  });
  document.querySelector("#todo").innerHTML = todoListContentHTML;
  document.querySelector("#completed").innerHTML = completedListContentHTML;
  inputBox.value = "";
}

//
function completedTask(element) {
  let index = todoList.findIndex((item) => item === element);
  var item = todoList.slice(index, index + 1);
  completedList.push(item[0]);
  todoList.splice(index, 1);

  localStorage.setItem(TODOLIST_LOCALSTORAGE, JSON.stringify(todoList));
  localStorage.setItem(
    COMPLETEDLIST_LOCALSTORAGE,
    JSON.stringify(completedList)
  );
  showTasks();
}
function deleleTask(element) {
  //kiểm tra xem xoá ở todo lít hay ở completed list
  let index = todoList.findIndex((item) => item === element);
  if (index != -1) {
    todoList.splice(index, 1);
    localStorage.setItem(TODOLIST_LOCALSTORAGE, JSON.stringify(todoList));
  } else {
    index = completedList.findIndex((item) => item === element);
    completedList.splice(index, 1);
    localStorage.setItem(
      COMPLETEDLIST_LOCALSTORAGE,
      JSON.stringify(completedList)
    );
  }

  showTasks();
}

deleteALL.onclick = () => {
  todoList = [];
  localStorage.setItem(TODOLIST_LOCALSTORAGE, JSON.stringify(todoList));
  showTasks();
};
