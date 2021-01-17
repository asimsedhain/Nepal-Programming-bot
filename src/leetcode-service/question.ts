export interface Question {
	Id: number;
	Title: string;
	Url: string;
	Difficulty: "easy" | "medium" | "hard";
	Topic: string;
}
