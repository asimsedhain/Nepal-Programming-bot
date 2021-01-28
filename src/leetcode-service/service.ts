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
	protected topicCache: Set<string>;
	constructor(store: QuestionStoreInterface) {
		this.store = store;
		this.topicCache = new Set<string>();
	}

	async GetRandomQuestion(difficulty = "", topic = ""): Promise<Question> {
		await this.initializesTopicCache();
		const difficultyLowercase = difficulty.toLowerCase();
		let filter = {};
		if (topic.trim() !== "") {
			if (!this.topicCache.has(topic)) {
				throw "Unsupported Param";
			}
			filter = { Topic: topic };
		}
		if (difficultyLowercase.trim() !== "") {
			if (
				difficultyLowercase !== "easy" &&
				difficultyLowercase !== "medium" &&
				difficultyLowercase !== "hard"
			) {
				throw "Unsupported Param";
			}
			filter = { ...filter, Difficulty: difficultyLowercase };
		}

		return await this.store.GetRandomQuestion(filter);
	}
	async GetQuestion(id: number): Promise<Question> {
		if (id <= 0) {
			throw "Id should be greater than zero";
		}

		return await this.store.GetQuestionById(id);
	}
	async SearchQuestion(key: string): Promise<Question[]> {
		return [];
	}

	async AddSubscriber(server: string, channel: string): Promise<void> {
		if (server.trim() === "" || channel.trim() === "") {
			throw "Server and channel should be provided";
		}
		await this.store.AddSubscriber({ Server: server, Channel: channel });
		return;
	}
	async RemoveSubscriber(server: string, channel: string): Promise<void> {
		if (server.trim() === "" || channel.trim() === "") {
			throw "Server and channel should be provided";
		}
		await this.store.RemoveSubscriber({ Server: server, Channel: channel });
		return;
	}
	async GetAllSubscriber(): Promise<string[]> {
		return await this.GetAllSubscriber();
	}
	async GetAllTopics(): Promise<string[]> {
		await this.initializesTopicCache();
		return Array.from(this.topicCache);
	}
	async initializesTopicCache(): Promise<void> {
		if (this.topicCache.size !== 0) {
			return;
		}
		const topics = await this.store.GetAllQuestionTopics();
		this.topicCache = new Set<string>(topics);
		return;
	}
}
