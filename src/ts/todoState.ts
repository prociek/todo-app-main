import { Todo, Listener } from "./types";

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
    this.runListeners();
  }

  public updateCompleted(id: string) {
    this.todos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    this.runListeners();
  }

  public removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.runListeners();
  }

  private runListeners() {
    for (let listener of this.listeners) {
      listener(this.todos);
    }
  }
}

const state = TodosState.getInstance();
export default state;
