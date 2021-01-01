import { Reminder } from "./reminder";
import { ReminderStoreInterface } from "./store";

export interface ReminderServiceInterface {
	AddReminder(time: any, description: string, server: string): void;
	RemoveReminder(id: number, server: string): void;
	ModifyReminder(
		id: number,
		time: any | null,
		description: string | null,
		server: string
	): void;
	AssignReminder(id: number, user: string, server: string): void;
	UnassignReminder(id: number, user: string, server: string): void;
	GetAllReminder(): Reminder[];
	SubscribeToReminder(channel: string, server: string): void;
	UnsubscribeToReminder(channel: string, server: string): void;
}

class ReminderService implements ReminderServiceInterface {
	protected store: ReminderStoreInterface;
	constructor(store: ReminderStoreInterface) {
		this.store = store;
	}
	AddReminder(time: any, description: string, server: string): void {}
	RemoveReminder(id: number, server: string): void {}
	ModifyReminder(
		id: number,
		time: any | null,
		description: string | null,
		server: string
	): void {}
	AssignReminder(id: number, user: string, server: string): void {}
	UnassignReminder(id: number, user: string, server: string): void {}
	GetAllReminder(): Reminder[] {
		return [];
	}
	SubscribeToReminder(channel: string, server: string): void {}
	UnsubscribeToReminder(channel: string, server: string): void {}
}
