import { Question } from "./question";
import { Subscriber } from "./subscriber";
import { QuestionFilter } from "./questionFilter";
export interface QuestionStoreInterface {
	GetQuestionById(id: number): Promise<Question>;
	GetRandomQuestion(filter: QuestionFilter): Promise<Question>;
	SearchQuestionByTitle(title: string): Promise<Question[]>;
	AddSubscriber(subscriber: Subscriber): Promise<void>;
	RemoveSubscriber(subscriber: Subscriber): Promise<void>;
}
