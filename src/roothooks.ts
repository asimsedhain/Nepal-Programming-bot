import mongoose from "mongoose";

export const mochaHooks = {
	async beforeAll() {
		console.log("Make sure you have Mongo Running in the background!!")
		await mongoose.connect("mongodb://localhost:27017", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	},
	async afterAll() {
		await mongoose.connection.close(true);
	},
};
