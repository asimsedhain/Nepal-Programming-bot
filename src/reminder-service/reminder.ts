export interface Reminder {
	Id: number;
	Description: number;
	Time: any;
	AssignedUsers: Set<string>;
}
