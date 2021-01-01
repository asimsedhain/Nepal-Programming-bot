import { Todo } from "./todo";
import { TodoStoreInterface } from "./store";

export interface TodoServiceInterface {
	AddTodo(description: string, server: string): void;
	RemoveTodo(id: number, server: string): void;
	ModifyTodo(id: number, description: string, server: string): void;
	AssignTodo(id: number, user: string, server: string): void;
	UnassignTodo(id: number, user: string, server: string): void;
	GetAllTodo(server: string): Todo[];
}

export class TodoService implements TodoServiceInterface {
	protected store: TodoStoreInterface;
	constructor(store: TodoStoreInterface) {
		this.store = store;
	}

	AddTodo(description: string, server: string): void {}
	RemoveTodo(id: number, server: string): void {}
	ModifyTodo(id: number, description: string, server: string): void {}
	AssignTodo(id: number, user: string, server: string): void {}
	UnassignTodo(id: number, user: string, server: string): void {}
	GetAllTodo(server: string): Todo[] {
		return [];
	}
}
