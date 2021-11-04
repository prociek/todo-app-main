import { v4 as uuid } from "uuid";

import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";

class ToggleMode {
  private button: HTMLButtonElement;
  private image: HTMLImageElement;
  private sunIcon: string;
  private moonIcon: string;

  constructor(sunIcon: string, moonIcon: string) {
    this.button = document.querySelector(
      ".header__button"
    ) as HTMLButtonElement;
    this.image = this.button.querySelector(
      ".header__icon"
    )! as HTMLImageElement;
    this.sunIcon = sunIcon;
    this.moonIcon = moonIcon;
    this.config();
  }

  private config() {
    this.button.addEventListener("click", this.handleClick);
  }

  private handleClick = () => {
    if (!document.documentElement.hasAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
      this.image.setAttribute("src", this.sunIcon);
    } else {
      document.documentElement.removeAttribute("data-theme");
      this.image.setAttribute("src", this.moonIcon);
    }
  };
}

class TodoForm {
  private form: HTMLFormElement;
  private input: HTMLInputElement;

  constructor() {
    this.form = document.querySelector(".todo-form")! as HTMLFormElement;
    this.input = this.form.querySelector("input")! as HTMLInputElement;
    this.config();
  }

  private config() {
    this.form.addEventListener("submit", this.addTodo);
  }

  private addTodo = (e) => {
    e.preventDefault();
    // Add todo to state
    const text = this.input.value;
    state.addTodo({ id: uuid(), text, completed: false });
    this.input.value = "";
  };
}

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Listener = (todoList: Todo[]) => void;

class TodosState {
  private static instance: TodosState;
  private listeners: Listener[] = [];
  private todos: Todo[] = [];

  private constructor() {}

  public static getInstance(): TodosState {
    if (!TodosState.instance) {
      TodosState.instance = new TodosState();
    }
    return TodosState.instance;
  }

  public subscibeListener(listener: Listener) {
    this.listeners.push(listener);
  }

  public addTodo(todo: Todo) {
    this.todos.push(todo);
    for (let listener of this.listeners) {
      listener(this.todos);
    }
  }
}

class TodoItem {
  private template: HTMLTemplateElement;
  private hostEl: HTMLUListElement;
  private element: HTMLLIElement;
  private todo: Todo;

  constructor(hostId: string, todo: Todo) {
    this.hostEl = document.getElementById(hostId)! as HTMLUListElement;
    this.template = document.getElementById(
      "todo-item"
    )! as HTMLTemplateElement;
    const node = document.importNode(this.template, true);
    this.element = node.content.firstElementChild as HTMLLIElement;
    this.todo = todo;
    this.configure();
    this.render();
  }

  configure() {
    this.element.querySelector(".todo-list__text").textContent = this.todo.text;
  }

  render() {
    this.hostEl.appendChild(this.element);
  }
}

class TodoList {
  private list: HTMLUListElement;

  constructor() {
    this.list = document.getElementById("todo-list")! as HTMLUListElement;
    this.addTodo = this.addTodo.bind(this);
    state.subscibeListener(this.addTodo);
  }

  addTodo(todos: Todo[]) {
    this.list.innerHTML = "";
    todos.forEach((todo) => {
      new TodoItem("todo-list", todo);
    });
  }
}

const state = TodosState.getInstance();
new ToggleMode(sunIcon, moonIcon);
new TodoForm();
new TodoList();
