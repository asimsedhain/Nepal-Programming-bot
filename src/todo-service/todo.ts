export interface Todo{
	Id: number;
	Description: string;
	Server: string;
	AssignedUsers: Set<string>;
}
