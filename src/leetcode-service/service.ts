import { Question } from "./question";
import { QuestionStoreInterface } from "./store";

export interface LeetcodeServiceInterface {
	GetRandomQuestion(difficulty: string, topic: string): Promise<Question>;
	GetQuestion(id: number): Promise<Question>;
	SearchQuestion(key: string): Promise<Question[]>;
	AddSubscriber(server: string, channel: string): Promise<void>;
	RemoveSubscriber(server: string, channel: string): Promise<void>;
	GetAllSubscriber(): Promise<string[]>;
	GetAllTopics(): Promise<string[]>;
}

export class LeetcodeService implements LeetcodeServiceInterface {
	protected store: QuestionStoreInterface;
	constructor(store: QuestionStoreInterface) {
		this.store = store;
	}

	async GetRandomQuestion(difficulty = "", topic = ""): Promise<Question> {}
	async GetQuestion(id: number): Promise<Question> {}
	async SearchQuestion(key: string): Promise<Question[]> {}

	async AddSubscriber(server: string, channel: string): Promise<void> {}
	async RemoveSubscriber(server: string, channel: string): Promise<void> {}
	async GetAllSubscriber(): Promise<string[]> {}
	async GetAllTopics(): Promise<string[]> {}
}
