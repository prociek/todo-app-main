import { Todo } from "./types";
import state from "./todoState";

export default class TodoItem {
  private template: HTMLTemplateElement;
  private hostEl: HTMLUListElement;
  private element: HTMLLIElement;
  private completedButton: HTMLButtonElement;
  private removeButton: HTMLButtonElement;
  private todo: Todo;

  constructor(hostId: string, todo: Todo) {
    this.hostEl = document.getElementById(hostId)! as HTMLUListElement;
    this.template = document.getElementById(
      "todo-item"
    )! as HTMLTemplateElement;
    const node = document.importNode(this.template, true);
    this.element = node.content.firstElementChild as HTMLLIElement;
    this.completedButton = this.element.querySelector(
      ".todo-list__btn-check"
    )! as HTMLButtonElement;
    this.removeButton = this.element.querySelector(".todo-list__btn-remove");
    this.todo = todo;

    this.configure();
    this.render();
  }

  private configure() {
    this.element.querySelector(".todo-list__text").textContent = this.todo.text;
    if (this.todo.completed) {
      this.element.classList.add("completed", "checked");
    }

    this.completedButton.addEventListener("click", this.toggleCompleted);
    this.removeButton.addEventListener("click", this.removeTodo);
  }

  private render() {
    this.hostEl.appendChild(this.element);
  }

  private toggleCompleted = () => {
    state.updateCompleted(this.todo.id);
  };

  private removeTodo = () => {
    state.removeTodo(this.todo.id);
  };
}
