import mongoose, { Schema } from "mongoose";

const SubscriberSchema = new Schema({
	_id: {type: String},
	Server: {type: String, required: true},
	Channel: {type: String, required: true}
})

export interface Subscriber extends mongoose.Document{
	Server: string;
	Channel: string;
}

export default mongoose.model<Subscriber>("LeetcodeSubscriber", SubscriberSchema)




