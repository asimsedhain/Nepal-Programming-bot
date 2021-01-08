import { assert } from "chai";
import { TodoService } from "./service";
import mongoose from "mongoose";
import { MongoStore, TodoModel } from "./mongo-store";

describe("Todo Service with mongo store", () => {
	before((done) => {
		mongoose.connect(
			"mongodb://localhost:27017",
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(err) => {
				done(err);
			}
		);
	});
	after(async () => {
		await TodoModel.deleteMany({}, undefined);

		await mongoose.connection.close(true);
	});
	beforeEach(async () => {
		await TodoModel.deleteMany({}, undefined);
	});
	it("should throw error when trying to remove todo that does not exist", async () => {
		const service = new TodoService(new MongoStore());

		const server = "server";
		assert.throws(async () => {
			await service.RemoveTodo(0, server);
		}, "Invalid Todo Id");
		assert.throws(async () => {
			await service.RemoveTodo(4, server);
		}, "Invalid Todo Id");
		assert.throws(async () => {
			await service.RemoveTodo(-1, server);
		}, "Invalid Todo Id");
	});
	it("should throw error passing invalid parameters to modify", async () => {
		const service = new TodoService(new MongoStore());

		const todo = "todo";
		const server = "server";
		await service.AddTodo(todo, server);

		assert.throws(async () => {
			await service.ModifyTodo(-1, "ModifyTodo", server),
				"Invalid Todo Id";
		});
		assert.throws(async () => {
			await service.ModifyTodo(3, "ModifyTodo", server),
				"Invalid Todo Id";
		});
		assert.throws(async () => {
			await service.ModifyTodo(0, "", server), "Invalid Description";
		});
	});
	it("should assign and unassign users", () => {
		const service = new TodoService(new MongoStore());

		const todo = "todo";
		const server = "server";
		const user1 = "user1";
		const user2 = "user2";

		service.AddTodo(todo, server);
		service.AssignTodo(0, user1, server);

		assert.throws(async () => {
			await service.AssignTodo(-1, user2, server);
		}, "Invalid Todo Id");
		assert.throws(async () => {
			await service.AssignTodo(0, "", server);
		}, "Invalid User");
		assert.throws(async () => {
			await service.AssignTodo(0, "user3", server);
		}, "Invalid User");
	});
});
