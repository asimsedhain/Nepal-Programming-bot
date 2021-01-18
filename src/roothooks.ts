import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;
export const mochaHooks = {
	async beforeAll() {
		mongod = new MongoMemoryServer();
		const uri = await mongod.getUri();
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	},
	async afterAll() {
		await mongoose.connection.close(true);
		await mongod.stop();
	},
};
