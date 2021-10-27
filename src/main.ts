import { v4 as uuid } from "uuid";

import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";

class ToggleMode {
  button: HTMLButtonElement;
  image: HTMLImageElement;
  sunIcon: string;
  moonIcon: string;

  constructor(sunIcon: string, moonIcon: string) {
    this.button = document.querySelector(
      ".header__button"
    ) as HTMLButtonElement;
    this.image = this.button.querySelector(".header__icon") as HTMLImageElement;
    this.sunIcon = sunIcon;
    this.moonIcon = moonIcon;
    this.config();
  }

  config() {
    this.button.addEventListener("click", this.handleClick);
  }

  handleClick = () => {
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
  form: HTMLFormElement;
  input: HTMLInputElement;

  constructor() {
    this.form = document.querySelector(".todo-form") as HTMLFormElement;
    this.input = this.form.querySelector("input") as HTMLInputElement;
    this.config();
  }

  config() {
    this.form.addEventListener("submit", this.addTodo);
  }

  addTodo = (e) => {
    e.preventDefault();
    // Add todo to state
    const text = this.input.value;
    state.addTodo({ id: uuid(), text, completed: false });
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

new ToggleMode(sunIcon, moonIcon);
new TodoForm();
const state = TodosState.getInstance();
