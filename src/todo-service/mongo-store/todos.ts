import mongoose, { Schema } from "mongoose";


const Todo = {
	Description: String,
	AssignedUsers: {type: [String], required: false},
};

interface Todos extends mongoose.Document {
	Server: string;
	Todos: { Description: string; AssignedUsers?: string[] }[]|null;
}

const TodosSchema: Schema = new Schema({
	Server: { type: String, required: true, unique: true },
	Todos: [Todo],
});

export default mongoose.model<Todos>("ServerTodos", TodosSchema);
