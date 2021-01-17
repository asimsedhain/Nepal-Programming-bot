import { Question } from "../question";
import { QuestionFilter } from "../questionFilter";
import { QuestionStoreInterface } from "../store";
import { Subscriber } from "../subscriber";
import questionModel from "./questions"

export class MongoStore implements QuestionStoreInterface {
	constructor() {}

	async GetQuestionById(id: number): Promise<Question> {
		const filter = {Id: id}
		const question = await questionModel.findOne(filter)
		return question
	}
	async GetRandomQuestion(filter: QuestionFilter): Promise<Question> {}
	async SearchQuestionByTitle(title: string): Promise<Question[]> {}
	async AddSubscriber(subscriber: Subscriber): Promise<void> {}
	async RemoveSubscriber(subscriber: Subscriber): Promise<void> {}
}
