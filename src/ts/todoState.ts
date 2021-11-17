import { Todo, Listener } from "./types";

class TodosState {
  private static instance: TodosState;
  private listeners: Listener[] = [];
  private todos: Todo[] = [];

  private constructor() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) this.todos = todos;
  }

  private runListeners() {
    for (let listener of this.listeners) {
      listener(this.todos);
    }
  }

  private syncLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  public static getInstance(): TodosState {
    if (!TodosState.instance) {
      TodosState.instance = new TodosState();
    }
    return TodosState.instance;
  }

  public getTodos() {
    return [...this.todos];
  }

  public subscibeListener(listener: Listener) {
    this.listeners.push(listener);
  }

  public addTodo(todo: Todo) {
    this.todos.push(todo);
    this.syncLocalStorage();
    this.runListeners();
  }

  public updateCompleted(id: string) {
    this.todos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    this.syncLocalStorage();
    this.runListeners();
  }

  public removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.syncLocalStorage();
    this.runListeners();
  }

  public clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.syncLocalStorage();
    this.runListeners();
  }

  public changePosition(oldIdx, newIdx) {
    const dragged = this.todos.splice(oldIdx, 1)[0];
    this.todos.splice(newIdx, 0, dragged);
    this.syncLocalStorage();
  }
}

const state = TodosState.getInstance();
export default state;
