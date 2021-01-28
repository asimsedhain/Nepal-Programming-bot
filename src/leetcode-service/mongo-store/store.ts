import { Question } from "../question";
import { QuestionFilter } from "../questionFilter";
import { QuestionStoreInterface } from "../store";
import { Subscriber } from "../subscriber";
import questionModel from "./questions";
import subscriberModel from "./subscribers"

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
		return [];
	}
	async AddSubscriber(subscriber: Subscriber): Promise<void> {
		const sub = {_id: `${subscriber.Server}_${subscriber.Channel}`, Server: subscriber.Server, Channel: subscriber.Channel}
		await subscriberModel.insertMany([sub])
		return;
	}
	async RemoveSubscriber(subscriber: Subscriber): Promise<void> {
		const filter = {_id: `${subscriber.Server}_${subscriber.Channel}`}
		await subscriberModel.remove(filter)
		return;
	}

	async GetAllSubscribers(): Promise<Subscriber[]> {
		const subs = await subscriberModel.find({})
		return subs
	}

	async GetAllQuestionTopics(): Promise<string[]> {
		const topics = await questionModel.distinct("Topic")
		return topics
	}
}
