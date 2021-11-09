import { Todo } from "./types";
import state from "./todoState";
import TodoItem from "./todoItem";

export default class TodoList {
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
