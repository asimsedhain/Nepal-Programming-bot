import { assert } from "chai";
import { TodoService } from "./service";
import { MongoStore, TodoModel } from "./mongo-store";

describe("Todo Service with mongo store", () => {
	after(async () => {
		await TodoModel.deleteMany({}, undefined);
	});
	beforeEach(async () => {
		await TodoModel.deleteMany({}, undefined);
	});
	it("should throw error when trying to add todo", async () => {
		const service = new TodoService(new MongoStore());

		const server = "server";
		const description = "description";
		try {
			await service.AddTodo("", server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Description");
		}

		try {
			await service.AddTodo(description, "");
		} catch (error) {
			assert.equal(error, "Invalid Todo Server");
		}
	});
	it("should throw error when trying to remove todo that does not exist", async () => {
		const service = new TodoService(new MongoStore());

		const server = "server";
		try {
			await service.RemoveTodo(0, server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Id");
		}
		try {
			await service.RemoveTodo(4, server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Id");
		}
		try {
			await service.RemoveTodo(-1, server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Id");
		}
	});
	it("should throw error passing invalid parameters to modify", async () => {
		const service = new TodoService(new MongoStore());

		const todo = "todo";
		const server = "server";
		await service.AddTodo(todo, server);

		try {
			await service.ModifyTodo(-1, "ModifyTodo", server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Id");
		}
		try {
			await service.ModifyTodo(3, "ModifyTodo", server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Id");
		}
		try {
			await service.ModifyTodo(0, "", server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Description");
		}
	});
	it("should throw error when invalid assign and unassign", async () => {
		const service = new TodoService(new MongoStore());

		const todo = "todo";
		const server = "server";
		const user1 = "user1";
		const user2 = "user2";

		service.AddTodo(todo, server);
		service.AssignTodo(0, user1, server);

		try {
			await service.AssignTodo(-1, user2, server);
		} catch (error) {
			assert.equal(error, "Invalid Todo Id");
		}
		try {
			await service.AssignTodo(0, "", server);
		} catch (error) {
			assert.equal(error, "Invalid Todo User");
		}
		try {
			await service.AssignTodo(0, "user3", server);
		} catch (error) {
			assert.equal(error, "Invalid Todo User");
		}
	});
});
