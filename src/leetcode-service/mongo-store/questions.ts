import mongoose, { Schema } from "mongoose";

const Question = {
	Id: Number,
	Title: String,
	Url: String,
	Difficulty: String,
	Topic: String,
};

interface Question extends mongoose.Document {
	Id: number;
	Title: string;
	Url: string;
	Difficulty: "easy" | "medium" | "hard";
	Topic: string;
}

const QuestionSchema: Schema = new Schema(Question);

export default mongoose.model<Question>("LeetcodeQuestions", QuestionSchema);
