/////////-------------Liste erstellen-----------/////////

let state = {
  todos: [],
  activeFilter: "all",
};

////-------------LocalStorage-------------///////////

function actualTodos() {
  localStorage.setItem("actualTodoApp", JSON.stringify(state.todos));
}

function readSaveTodos() {
  if (localStorage.getItem("actualTodoApp") !== null) {
    state.todos = JSON.parse(localStorage.getItem("actualTodoApp"));
  } else {
    console.warn("keine Todos vorhanden");
  }
}

/////////-----------Liste anlegen + und für die User sichtbar machen-----------///////////

const list = document.querySelector("#list");

function renderTodos() {
  list.innerHTML = "";

  let filteredTodos = state.todos;
  if (state.activeFilter === "done") {
    filteredTodos = state.todos.filter((todo) => todo.done === true);
  } else if (state.activeFilter === "open") {
    filteredTodos = state.todos.filter((todo) => todo.done === false);
  }

  filteredTodos.forEach((todo) => {
    const todoLi = document.createElement("li");

    todoLi.todoObj = todo;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    todoLi.appendChild(checkbox);

    const todoText = document.createTextNode(todo.description);
    todoLi.append(todoText);

    list.appendChild(todoLi);
  });
}
readSaveTodos();
renderTodos();

//////////---------------checkbox--------------////////

list.addEventListener("change", (e) => {
  const checkbox = e.target;
  const liElement = checkbox.parentElement;
  const todo = liElement.todoObj;

  todo.done = checkbox.checked;
  actualTodos();
  readSaveTodos();
});

////////////-----------pushTodos + Prüfung auf gleiche Todos------------////////

document.querySelector("#push").addEventListener("click", function () {
  const input = document.querySelector("#todos input");
  const inputValue = input.value;

  if (inputValue.length < 3) {
    alert("");
  } else {
    const alreadyExsistingTodo = state.todos.filter(function (todoEntry) {
      let inputValueLowerCase;
      const todoEntryLowerCase = todoEntry.description.toLowerCase();

      if (inputValue) {
        inputValueLowerCase = inputValue.toLowerCase();
      } else {
        inputValueLowerCase = "";
      }

      return todoEntryLowerCase.includes(inputValueLowerCase);
    });
    if (alreadyExsistingTodo.length > 0) {
      alert("Eintrag schon vorhanden!");
    } else {
      state.todos.push({
        description: input.value,
        done: false,
      });
      actualTodos();
      readSaveTodos();
      renderTodos();
    }
    input.value = "";
  }
});

/////////-------------deleteButton----------/////////

document.querySelector("#delete").addEventListener("click", function () {
  const lastTodos = state.todos.filter((todo) => todo.done === false);
  state.todos = lastTodos;
  actualTodos();
  readSaveTodos();
  renderTodos();
});

//---------shit-button---------///////

const shitButton = document.getElementById("shit-button");
const imgObject = document.getElementById("my-image");
shitButton.addEventListener("click", () => {
  imgObject.hidden = !imgObject.hidden;
});

/////////---------radioButtons---------------//////////

document.querySelector("#done").addEventListener("click", function () {
  state.activeFilter = "done";
  renderTodos();
});

document.querySelector("#open").addEventListener("click", function () {
  state.activeFilter = "open";
  renderTodos();
});

document.querySelector("#all").addEventListener("click", function () {
  state.activeFilter = "all";
  renderTodos();
});
