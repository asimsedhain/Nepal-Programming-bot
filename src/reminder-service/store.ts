import { Reminder } from "./reminder";

export interface ReminderStoreInterface {
	AddReminder(time: any, description: string, server: string): void;
	RemoveReminder(id: number, server: string): void;
	ModifyReminder(
		id: number,
		time: any,
		description: string,
		server: string
	): void;
	AssignReminder(id: number, user: string, server: string): void;
	UnassignReminder(id: number, user: string, server: string): void;
	GetReminder(id: number, server: string): Reminder;
	GetAllReminder(): Reminder[];
	SubscribeToReminder(channel: string, server: string): void;
	UnsubscribeToReminder(channel: string, server: string): void;
}
