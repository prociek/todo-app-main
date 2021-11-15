import { Todo } from "./types";
import state from "./todoState";
import TodoItem from "./todoItem";

export default class TodoList {
  private list: HTMLUListElement;
  private amount: HTMLSpanElement;
  private filterButtons: NodeListOf<HTMLButtonElement>;
  private clearCompletedBtn: HTMLButtonElement;

  private todos: Todo[];
  private filter: "all" | "active" | "completed";

  constructor() {
    this.list = document.getElementById("todo-list")! as HTMLUListElement;
    this.amount = document.getElementById("amount")! as HTMLSpanElement;
    this.filterButtons = document.querySelectorAll(
      ".btn-select"
    )! as NodeListOf<HTMLButtonElement>;
    this.clearCompletedBtn = document.getElementById(
      "clear-completed"
    )! as HTMLButtonElement;

    this.filter = "all";
    this.todos = state.getTodos();

    this.config();
    this.renderTodos();
  }

  config() {
    state.subscibeListener(this.renderTodosListener);
    this.updateCount();
    this.filterButtons.forEach((button) =>
      button.addEventListener("click", this.handleFilterTodos)
    );
    this.clearCompletedBtn.addEventListener("click", this.clearCompleted);
  }

  renderTodosListener = (todos: Todo[]) => {
    this.todos = todos;
    this.renderTodos();
  };

  renderTodos() {
    this.updateCount();
    this.list.innerHTML = "";
    let todos = this.filterTodos();
    todos.forEach((todo) => {
      new TodoItem("todo-list", todo);
    });
  }

  updateCount() {
    this.amount.textContent = `${this.todos.length} item${
      this.todos.length === 1 ? "" : "s"
    }`;
  }

  handleFilterTodos = (e: Event) => {
    const target = e.target as HTMLElement;
    this.filter = target.dataset.filter as "all" | "active" | "completed";
    this.filterButtons.forEach((button) => {
      if (button.dataset.filter === this.filter) button.classList.add("active");
      else button.classList.remove("active");
    });
    this.renderTodos();
  };

  filterTodos(): Todo[] {
    let todos = [];
    switch (this.filter) {
      case "all":
        todos = this.todos;
        break;
      case "active":
        todos = this.todos.filter((todo) => !todo.completed);
        break;
      case "completed":
        todos = this.todos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }
    return todos;
  }

  clearCompleted = (e: Event) => {
    state.clearCompleted();
  };
}
