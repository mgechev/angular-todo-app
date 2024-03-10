import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Todo } from "../models/todo";
import { TodoFilter } from "./todos.pipe";

const fib = (n: number) => {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

@Component({
  templateUrl: "todos.component.html",
  selector: "app-todos",
})
export class TodosComponent implements OnInit, OnDestroy {
  name: string = "What needs to be done?";
  todos: Todo[] = [
    {
      label: "Buy milk",
      completed: false,
      id: "42",
    },
  ];

  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() add = new EventEmitter();

  private hashListener: EventListenerOrEventListenerObject;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "hashchange",
        (this.hashListener = () => this.cdRef.markForCheck())
      );
    }
  }

  ngOnDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("hashchange", this.hashListener);
    }
  }

  get slowBinding() {
    return fib(30);
  }

  get filterValue(): TodoFilter {
    if (typeof window !== "undefined") {
      return (
        (window.location.hash.replace(/^#\//, "") as TodoFilter) ||
        TodoFilter.All
      );
    }
    return TodoFilter.All;
  }

  get itemsLeft() {
    return (this.todos || []).filter((t) => !t.completed).length;
  }

  clearCompleted() {
    (this.todos || [])
      .filter((t) => t.completed)
      .forEach((t) => this.delete.emit(t));

    this.todos.splice(0, this.todos.length);
  }

  placeHolderMessageText() {
    return (this.name = "What needs to be done?");
  }

  addTodo(input: HTMLInputElement) {
    if (input.value == "" || input.value == null || input.value == undefined) {
      this.name = "Please Write Something!";
    } else {
      this.name = this.placeHolderMessageText();
      const todo = {
        completed: false,
        label: input.value,
      };
      const result: Todo = { ...todo, id: Math.random().toString() };
      this.todos.push(result);
      input.value = "";
    }
  }

  onChange(todo: Todo) {
    if (!todo.id) {
      return;
    }
  }

  onDelete(todo: Todo) {
    if (!todo.id) {
      return;
    }
    const idx = this.todos.findIndex((t) => t.id === todo.id);
    if (idx < 0) {
      return;
    }
    console.log("Deleting", idx);
    this.todos.splice(idx, 1);
  }
}
