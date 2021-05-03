(() => {
  /* GRABING ALL ELEMENTS INTO VARIABLES */
  const toggleModeBtn = document.querySelector(".header__button");
  const todoList = document.querySelector(".todo-list");
  const initialItem = document.querySelector(
    ".todo-list__item"
  ); /* needed to clone node to not create complet element from scratch */
  const todoForm = document.querySelector(".todo-form");
  const itemsCountEl = document.getElementById("amount");
  const clearCompletedBtn = document.getElementById("clear-completed");

  /* State */
  let todoListArray = [
    {
      description: "Hello",
      isCompleted: false,
      id: "0",
    },
    {
      description: "Hello World",
      isCompleted: true,
      id: "1",
    },
  ];

  /* FUNCTIONS */

  /* Toggle Dark/Light mode */
  function toggleMode() {
    if (!document.documentElement.hasAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleModeBtn
        .querySelector(".header__icon")
        .setAttribute("src", "./images/icon-sun.svg");
    } else {
      document.documentElement.removeAttribute("data-theme");
      toggleModeBtn
        .querySelector(".header__icon")
        .setAttribute("src", "./images/icon-moon.svg");
    }
  }

  /* Toggle completed Class*/
  function toggleCompletedClass(el) {
    if (el.classList.contains("completed")) {
      el.classList.remove("completed");
      el.classList.remove("checked");
    } else {
      el.classList.add("completed");
      el.classList.add("checked");
    }
  }

  /* Create list item element */
  function createItem(el) {
    let item = initialItem.cloneNode(true);
    item.querySelector(".todo-list__text").textContent = el.description;
    item.setAttribute("data-id", `${el.id}`);
    if (el.isCompleted) {
      toggleCompletedClass(item);
    }
    return item;
  }

  /* Create list items */
  function createListItems(itemsArray) {
    const fragment = new DocumentFragment();
    itemsArray.forEach((el) => {
      fragment.appendChild(createItem(el));
    });
    return fragment;
  }

  /* Add Todo functionality */
  function addTodo(e) {
    e.preventDefault();
    if (e.target.children[1].value === "") return;
    const item = {
      description: e.target[1].value,
      isCompleted: false,
      id: new Date().toString(),
    };
    todoListArray.push(item); /* updating state */
    todoList.appendChild(createItem(item));
    updateCount();
    e.target.children[1].value = "";
  }

  /* Toggle completed */
  function toggleCompleted(e) {
    const current = e.target.closest(".todo-list__item");
    const allTodos = document.querySelectorAll(".todo-list__item");
    Array.from(allTodos).forEach((el) => {
      if (el === current) {
        toggleCompletedClass(current);
        let itemIndex = todoListArray.findIndex((todo) => {
          return todo.id === current.dataset.id;
        });
        todoListArray[itemIndex].isCompleted = !todoListArray[itemIndex]
          .isCompleted;
      }
    });
    updateCount();
  }

  /* Handle Click on item Complete btn and remove btn */
  function handleItemClick(e) {
    if (e.target.closest(".todo-list__btn-check")) {
      /* toggle Completed btn */
      toggleCompleted(e);
    } else if (e.target.closest(".todo-list__btn-remove")) {
      /* remove item */
      const allTodos = document.querySelectorAll(".todo-list__item");
      const current = e.target.closest(".todo-list__item");
      Array.from(allTodos).forEach((el) => {
        if (el === current) {
          e.target.closest(".todo-list__item").remove();
          todoListArray = todoListArray.filter(
            (todo) => todo.id !== current.dataset.id
          );
        }
      });
      updateCount();
    }
  }

  /* Update items left count */
  function updateCount() {
    const countItems = todoListArray.reduce((count, current) => {
      return count + (current.isCompleted ? 0 : 1);
    }, 0);
    itemsCountEl.textContent = countItems;
  }

  /* Clear completed functionality */
  function handleClearCompleted() {
    Array.from(
      document.querySelectorAll(".todo-list__item.completed")
    ).forEach((el) => el.remove());
    todoListArray = todoListArray.filter((todo) => !todo.isCompleted);
  }

  /* Initialization */
  window.onload = function () {
    todoList.replaceChild(
      createListItems(todoListArray),
      initialItem
    ); /* replace initial item with state items */
    updateCount();
  };

  /* EVENT LISTENERS */
  /* Toggle Dark/Light mode */
  toggleModeBtn.addEventListener("click", toggleMode);
  /* Add a todo */
  todoForm.addEventListener("submit", addTodo);
  /* Switch todo completed */
  todoList.addEventListener("click", handleItemClick);
  /* Clear Completed Todos */
  clearCompletedBtn.addEventListener("click", handleClearCompleted);
})();
