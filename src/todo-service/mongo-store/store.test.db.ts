import { assert } from "chai";
import { MongoStore } from "./store";
import { Todo } from "../todo";
import model from "./todos";

describe("Todos MongoStore", () => {
	beforeEach(async () => {
		await model.deleteMany({}, undefined);
	});
	after(async () => {
		await model.deleteMany({}, undefined);
	});
	it("should add todo", async () => {
		const service = new MongoStore();

		const todo = "todo";
		const server = "server";
		await service.AddTodo(todo, server);
		let preCoersionTodos = await service.GetAllTodo(server);

		assert.isNotNull(preCoersionTodos);

		let todos: Todo[] = <Todo[]>preCoersionTodos;

		assert.lengthOf(todos, 1);
		assert.equal(todos[0].Id, 0);
		assert.equal(todos[0].Description, todo);
		assert.equal(todos[0].Server, server);
		await service.AddTodo(todo, server);

		preCoersionTodos = await service.GetAllTodo(server);

		assert.isNotNull(preCoersionTodos);

		todos = <Todo[]>preCoersionTodos;

		assert.lengthOf(todos, 2);
		for (const t of todos) {
			assert.equal(t.Description, todo);
			assert.equal(t.Server, server);
		}
	});

	it("should remove todo", async () => {
		const service = new MongoStore();

		const todo = "todo";
		const server = "server";
		await service.AddTodo(todo, server);
		await service.RemoveTodo(0, server);
		let preCoersionTodos = await service.GetAllTodo(server);

		assert.isNotNull(preCoersionTodos);

		let todos: Todo[] = <Todo[]>preCoersionTodos;

		assert.lengthOf(todos, 0);
	});
	it("should mark and unmake todo as complete", async () => {
		const service = new MongoStore();

		const todo = "todo";
		const server = "server";
		await service.AddTodo(todo, server);
		let preCoersionTodos = await service.GetAllTodo(server);

		assert.isNotNull(preCoersionTodos);

		let todos: Todo[] = <Todo[]>preCoersionTodos;
		assert.isFalse(todos[0].IsComplete);
		await service.ToggleCompletion(0, server);
		todos = <Todo[]>await service.GetAllTodo(server);
		assert.isTrue(todos[0].IsComplete);
		await service.ToggleCompletion(0, server);
		todos = <Todo[]>await service.GetAllTodo(server);
		assert.isFalse(todos[0].IsComplete);
	});
	it("should remove todos one at a time", async () => {
		const service = new MongoStore();

		const todo = "todo";
		const server = "server";
		await service.AddTodo(todo, server);
		await service.AddTodo(todo, server);
		await service.RemoveTodo(0, server);
		await service.RemoveTodo(0, server);
		let preCoersionTodos = await service.GetAllTodo(server);

		assert.isNotNull(preCoersionTodos);

		let todos: Todo[] = <Todo[]>preCoersionTodos;

		assert.lengthOf(todos, 0);
	});
	it("should remove all todos at once", async () => {
		const service = new MongoStore();

		const todo = "todo";
		const server = "server";
		await service.AddTodo(todo, server);
		await service.AddTodo(todo, server);
		await service.RemoveAllTodo(server);
		let preCoersionTodos = await service.GetAllTodo(server);

		assert.isNotNull(preCoersionTodos);

		let todos: Todo[] = <Todo[]>preCoersionTodos;

		assert.lengthOf(todos, 0);
	});
	it("should modify todo", async () => {
		const service = new MongoStore();

		const todo = "todo";
		const server = "server";
		const modifiedTodo = "modifiedTodo";
		await service.AddTodo(todo, server);
		await service.AddTodo(modifiedTodo, server);
		await service.ModifyTodo(0, modifiedTodo, server);
		await service.ModifyTodo(1, todo, server);
		let preCoersionTodos = await service.GetAllTodo(server);
		assert.isNotNull(preCoersionTodos);

		let todos: Todo[] = <Todo[]>preCoersionTodos;

		assert.lengthOf(todos, 2);
		assert.equal(todos[0].Id, 0);
		assert.equal(todos[0].Server, server);
		assert.equal(todos[0].Description, modifiedTodo);
		assert.equal(todos[1].Id, 1);
		assert.equal(todos[1].Server, server);
		assert.equal(todos[1].Description, todo);
	});
	it("should assign and unassign users", async () => {
		const service = new MongoStore();

		const todo = "todo";
		const server = "server";
		const user1 = "user1";
		const user2 = "user2";

		await service.AddTodo(todo, server);
		await service.AssignTodo(0, user1, server);

		let preCoersionTodos = await service.GetAllTodo(server);
		assert.isNotNull(preCoersionTodos);

		let todos: Todo[] = <Todo[]>preCoersionTodos;

		assert.isTrue(todos[0].AssignedUsers.has(user1), "should have user1");

		await service.AssignTodo(0, user2, server);

		todos = <Todo[]>await service.GetAllTodo(server);

		assert.isTrue(todos[0].AssignedUsers.has(user2), "should have user2");

		await service.UnassignTodo(0, user2, server);

		todos = <Todo[]>await service.GetAllTodo(server);

		assert.isTrue(todos[0].AssignedUsers.has(user1), "should have user1");
		assert.isFalse(
			todos[0].AssignedUsers.has(user2),
			"should not have user2"
		);
		await service.UnassignTodo(0, user1, server);
		todos = <Todo[]>await service.GetAllTodo(server);
		assert.isFalse(
			todos[0].AssignedUsers.has(user1),
			"should not have user1"
		);
	});
});
