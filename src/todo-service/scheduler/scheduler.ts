//import { TodoStoreInterface } from "../store";

export interface SchedulerInterface {
	Start(): Promise<void>;
	Stop(): Promise<void>;
	Trigger(): Promise<void>;
}
export interface Notifer {
	Notify(): Promise<void>;
}

export class Scheduler {
	//protected notifier: Notifer;
	//protected store: TodoStoreInterface;
	private running: boolean;
	private timer: ReturnType<typeof setInterval> | null;

	//constructor(notifier: Notifer, store: TodoStoreInterface) {
	constructor() {
		//this.notifier = notifier;
		//this.store = store;
		this.running = false;
		this.timer = null;
	}
	async Start() {
		if (this.running) {
			return;
		}
		this.running = true;
		this.timer = setInterval(this.Trigger, 1000);
	}
	async Stop() {
		if (!this.running) {
			return;
		}
		this.running = false;
		let t = <ReturnType<typeof setInterval>>this.timer;
		clearInterval(t);
	}
	async Trigger() {
		console.log("Fire!");
	}
}
