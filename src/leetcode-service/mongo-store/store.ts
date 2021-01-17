import { Question } from "../question";
import { QuestionFilter } from "../questionFilter";
import { QuestionStoreInterface } from "../store";
import { Subscriber } from "../subscriber";
import questionModel from "./questions";

export class MongoStore implements QuestionStoreInterface {
	constructor() {}

	async GetQuestionById(id: number): Promise<Question> {
		const filter = { Id: id };
		const question = await questionModel.findOne(filter);
		return question;
	}
	async GetRandomQuestion(filter: QuestionFilter): Promise<Question> {
		const samples = await questionModel.aggregate([
			{ $match: filter },
			{ $sample: { size: 1 } },
		]);
		const question = <Question>samples[0];
		return question;
	}
	async SearchQuestionByTitle(title: string): Promise<Question[]> {
		console.log(title, "Not Implemented");
		return []
	}
	async AddSubscriber(subscriber: Subscriber): Promise<void> {
		console.log(subscriber, "Not Implemented");
		return;
	}
	async RemoveSubscriber(subscriber: Subscriber): Promise<void> {
		console.log(subscriber, "Not Implemented");
		return;
	}
}
