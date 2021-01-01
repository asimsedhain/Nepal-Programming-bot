import { Todo } from "./todo";

export interface TodoStoreInterface {
	AddTodo(todo: Todo): void;
	RemoveTodo(id: string): void;
	ModifyTodo(todo: Todo): void;
	AssignTodo(id: string, user: string): void;
	UnassignTodo(id: string, user: string): void;
	GetTodo(id: string): Todo;
	GetAllTodo(): [Todo];
	[key: string]: any;
}
