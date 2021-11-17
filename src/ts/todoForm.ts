import { v4 as uuid } from "uuid";
import state from "./todoState";

export default class TodoForm {
  private form: HTMLFormElement;
  private input: HTMLInputElement;

  constructor() {
    this.form = document.querySelector(".todo-form")! as HTMLFormElement;
    this.input = this.form.querySelector("input")! as HTMLInputElement;
    this.config();
  }

  private config() {
    this.form.addEventListener("submit", this.addTodoHandler);
  }

  private addTodoHandler = (e) => {
    e.preventDefault();
    const text = this.input.value.trim();
    if (!text) return;
    state.addTodo({ id: uuid(), text, completed: false });
    this.input.value = "";
  };
}
