export interface Question {
	Id: number;
	Title: string;
	Url: string;
	Difficulty: "Easy" | "Medium" | "Hard";
	Topic: string;
}
