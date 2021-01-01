import { assert } from "chai";
import { TodoService } from "./service";

describe("Todo Service", () => {
	describe("Add Todo", () => {
		it("should add todo", () => {
			const service = new TodoService();

			const todo = "todo";
			const server = "server";
			service.AddTodo(todo, server);
			let todos = service.GetAllTodo(server);

			assert.lengthOf(todos, 1);
			assert.equal(todos[0].Id, 0);
			assert.equal(todos[0].Description, todo);
			assert.equal(todos[0].Server, server);
			service.AddTodo(todo, server);
			todos = service.GetAllTodo(server);

			assert.lengthOf(todos, 2);
			for (const t of todos) {
				assert.equal(t.Id, 0);
				assert.equal(t.Description, todo);
				assert.equal(t.Server, server);
			}
		});

		it("should remove todo", () => {
			const service = new TodoService();

			const todo = "todo";
			const server = "server";
			service.AddTodo(todo, server);
			service.RemoveTodo(0, server);
			const todos = service.GetAllTodo(server);
			assert.lengthOf(todos, 0);
		});
		it("should remove todos one at a time", () => {
			const service = new TodoService();

			const todo = "todo";
			const server = "server";
			service.AddTodo(todo, server);
			service.AddTodo(todo, server);
			service.RemoveTodo(0, server);
			service.RemoveTodo(0, server);
			const todos = service.GetAllTodo(server);
			assert.lengthOf(todos, 0);
		});
		it("should modify todo", () => {
			const service = new TodoService();

			const todo = "todo";
			const server = "server";
			const modifiedTodo = "modifiedTodo";
			service.AddTodo(todo, server);
			service.AddTodo(modifiedTodo, server);
			service.ModifyTodo(0, modifiedTodo, server);
			service.ModifyTodo(1, todo, server);
			const todos = service.GetAllTodo(server);
			assert.lengthOf(todos, 2);
			assert.equal(todos[0].Id, 0);
			assert.equal(todos[0].Server, server);
			assert.equal(todos[0].Description, modifiedTodo);
			assert.equal(todos[1].Id, 1);
			assert.equal(todos[1].Server, server);
			assert.equal(todos[1].Description, todo);
		});
		it("should assign and unassign users", () => {
			const service = new TodoService();

			const todo = "todo";
			const server = "server";
			const user1 = "user1";
			const user2 = "user2";

			service.AddTodo(todo, server);
			service.AssignTodo(0, user1, server);

			let todos = service.GetAllTodo(server);
			assert.isTrue(todos[0].AssignedUsers.has(user1));

			service.AssignTodo(0, user2, server);

			todos = service.GetAllTodo(server);
			assert.isTrue(todos[0].AssignedUsers.has(user2));

			service.UnassignTodo(0, user2, server);

			todos = service.GetAllTodo(server);
			assert.isTrue(todos[0].AssignedUsers.has(user1));
			assert.isFalse(todos[0].AssignedUsers.has(user2));
		});
	});
});
