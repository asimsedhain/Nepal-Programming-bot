import { Todo } from "./todo";
import { TodoStoreInterface } from "./store";

export interface TodoServiceInterface {
	AddTodo(description: string, server: string): Promise<void>;
	RemoveTodo(id: number, server: string): Promise<void>;
	ModifyTodo(id: number, description: string, server: string): Promise<void>;
	ToggleCompletion(id: number, server: string): Promise<void>;
	AssignTodo(id: number, user: string, server: string): Promise<void>;
	UnassignTodo(id: number, user: string, server: string): Promise<void>;
	GetAllTodo(server: string): Promise<Todo[]>;
}

export class TodoService implements TodoServiceInterface {
	protected store: TodoStoreInterface;
	constructor(store: TodoStoreInterface) {
		this.store = store;
	}
	async AddTodo(description: string, server: string): Promise<void> {
		return this.store.AddTodo(description, server);
	}
	async RemoveTodo(id: number, server: string): Promise<void> {
		return this.store.RemoveTodo(id, server);
	}
	async ModifyTodo(
		id: number,
		description: string,
		server: string
	): Promise<void> {
		return this.store.ModifyTodo(id, description, server);
	}
	async AssignTodo(id: number, user: string, server: string): Promise<void> {
		return this.store.AssignTodo(id, user, server);
	}
	async ToggleCompletion(id: number, server: string): Promise<void> {
		return this.store.ToggleCompletion(id, server);
	}
	async UnassignTodo(
		id: number,
		user: string,
		server: string
	): Promise<void> {
		return this.store.UnassignTodo(id, user, server);
	}
	async GetAllTodo(server: string): Promise<Todo[]> {
		return this.store.GetAllTodo(server);
	}
}
