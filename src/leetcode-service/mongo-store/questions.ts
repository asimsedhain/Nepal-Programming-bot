import mongoose, { Schema } from "mongoose";

const Question = {
	Id: { type: Number, required: true, unique: true },
	Title: { type: String, required: true },
	Url: { type: String, required: true },
	Difficulty: { type: String, required: true },
	Topic: { type: String, required: true },
};

export interface Question extends mongoose.Document {
	Id: number;
	Title: string;
	Url: string;
	Difficulty: string;
	Topic: string;
}

const QuestionSchema: Schema = new Schema(Question);

export default mongoose.model<Question>("LeetcodeQuestions", QuestionSchema);
