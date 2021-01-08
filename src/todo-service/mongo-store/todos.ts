import mongoose, { Schema } from "mongoose";

const Todo = {
	Description: String,
	AssignedUsers: { type: [String], required: false },
	IsComplete: { type: Number, default: 0 },
};

interface Todos extends mongoose.Document {
	Server: string;
	Todos:
		| {
				Description: string;
				AssignedUsers?: string[];
				IsComplete: number;
		  }[]
		| null;
}

const TodosSchema: Schema = new Schema({
	Server: { type: String, required: true, unique: true },
	Todos: [Todo],
});

export default mongoose.model<Todos>("ServerTodos", TodosSchema);
