import { Todo } from "./todo";

export interface TodoStoreInterface {
	AddTodo(description: string, server: string): Promise<void>;
	RemoveTodo(id: number, server: string): Promise<void>;
	ToggleCompletion(id: number, server: string): Promise<void>;
	ModifyTodo(id: number, description: string, server: string): Promise<void>;
	AssignTodo(id: number, user: string, server: string): Promise<void>;
	UnassignTodo(id: number, user: string, server: string): Promise<void>;
	GetTodo(id: number, server: string): Promise<Todo>;
	GetAllTodo(server: string): Promise<Todo[]>;
	GetTodosLength(server: string): Promise<number>;
	RemoveAllTodo(server: string): Promise<void>;
}
