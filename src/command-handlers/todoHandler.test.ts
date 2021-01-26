import { TodoHandler } from "./todoHandler";
import { mock, when, verify, instance, anything, anyOfClass } from "ts-mockito";
import { TodoService } from "../todo-service";
import { Message, Guild, TextChannel, MessageEmbed } from "discord.js";

describe("TodoHandler", () => {
	it("Should show all the todos", async () => {
		const serverId = "serverId";

		const mockedService = mock(TodoService);
		when(mockedService.GetAllTodo(serverId)).thenResolve([]);

		const service = instance(mockedService);

		const mockGuild = mock(Guild);
		when(mockGuild.id).thenReturn(serverId);

		const mockChannel = mock(TextChannel);

		const mockMessage = mock(Message);
		when(mockMessage.guild).thenReturn(instance(mockGuild));
		when(mockMessage.channel).thenReturn(instance(mockChannel));

		const message = instance(mockMessage);

		const handler = new TodoHandler(service);
		await handler.Handle(message, ["!todo"]);

		verify(mockedService.GetAllTodo(serverId)).once();
		verify(mockGuild.id).once();
		verify(mockChannel.send(anything())).once();
	});

	it("Should add todo", async () => {
		const serverId = "serverId";

		const mockedService = mock(TodoService);

		const service = instance(mockedService);

		const mockGuild = mock(Guild);
		when(mockGuild.id).thenReturn(serverId);

		const mockChannel = mock(TextChannel);

		const mockMessage = mock(Message);
		when(mockMessage.guild).thenReturn(instance(mockGuild));
		when(mockMessage.channel).thenReturn(instance(mockChannel));

		const message = instance(mockMessage);

		const handler = new TodoHandler(service);
		await handler.Handle(message, ["!todo", "add", "todo", "is", "added"]);

		verify(mockedService.AddTodo("todo is added", serverId)).once();
		verify(mockGuild.id).once();
		verify(mockChannel.send(anyOfClass(MessageEmbed))).once();
	});

	it("Should remove todo", async () => {
		const serverId = "serverId";

		const mockedService = mock(TodoService);

		const service = instance(mockedService);

		const mockGuild = mock(Guild);
		when(mockGuild.id).thenReturn(serverId);

		const mockChannel = mock(TextChannel);

		const mockMessage = mock(Message);
		when(mockMessage.guild).thenReturn(instance(mockGuild));
		when(mockMessage.channel).thenReturn(instance(mockChannel));

		const message = instance(mockMessage);

		const handler = new TodoHandler(service);
		await handler.Handle(message, ["!todo", "remove", "1"]);

		verify(mockedService.RemoveTodo(1, serverId)).once();
		verify(mockGuild.id).once();
		verify(mockChannel.send(anyOfClass(MessageEmbed))).once();
	});
	it("Should modify todo", async () => {
		const serverId = "serverId";

		const mockedService = mock(TodoService);

		const service = instance(mockedService);

		const mockGuild = mock(Guild);
		when(mockGuild.id).thenReturn(serverId);

		const mockChannel = mock(TextChannel);

		const mockMessage = mock(Message);
		when(mockMessage.guild).thenReturn(instance(mockGuild));
		when(mockMessage.channel).thenReturn(instance(mockChannel));

		const message = instance(mockMessage);

		const handler = new TodoHandler(service);
		await handler.Handle(message, [
			"!todo",
			"modify",
			"1",
			"todo",
			"is",
			"modified",
		]);

		verify(
			mockedService.ModifyTodo(1, "todo is modified", serverId)
		).once();
		verify(mockGuild.id).once();
		verify(mockChannel.send(anyOfClass(MessageEmbed))).once();
	});

	it("Should assign todo", async () => {
		const serverId = "serverId";

		const mockedService = mock(TodoService);

		const service = instance(mockedService);

		const mockGuild = mock(Guild);
		when(mockGuild.id).thenReturn(serverId);

		const mockChannel = mock(TextChannel);

		const mockMessage = mock(Message);
		when(mockMessage.guild).thenReturn(instance(mockGuild));
		when(mockMessage.channel).thenReturn(instance(mockChannel));

		const message = instance(mockMessage);

		const handler = new TodoHandler(service);
		await handler.Handle(message, ["!todo", "assign", "1", "user1"]);

		verify(mockedService.AssignTodo(1, "user1", serverId)).once();
		verify(mockGuild.id).once();
		verify(mockChannel.send(anyOfClass(MessageEmbed))).once();
	});
	it("Should mark todo", async () => {
		const serverId = "serverId";

		const mockedService = mock(TodoService);

		const service = instance(mockedService);

		const mockGuild = mock(Guild);
		when(mockGuild.id).thenReturn(serverId);

		const mockChannel = mock(TextChannel);

		const mockMessage = mock(Message);
		when(mockMessage.guild).thenReturn(instance(mockGuild));
		when(mockMessage.channel).thenReturn(instance(mockChannel));

		const message = instance(mockMessage);

		const handler = new TodoHandler(service);
		await handler.Handle(message, ["!todo", "mark", "1"]);

		verify(mockedService.ToggleCompletion(1, serverId)).once();
		verify(mockGuild.id).once();
		verify(mockChannel.send(anyOfClass(MessageEmbed))).once();
	});

	it("Should unassign todo", async () => {
		const serverId = "serverId";

		const mockedService = mock(TodoService);

		const service = instance(mockedService);

		const mockGuild = mock(Guild);
		when(mockGuild.id).thenReturn(serverId);

		const mockChannel = mock(TextChannel);

		const mockMessage = mock(Message);
		when(mockMessage.guild).thenReturn(instance(mockGuild));
		when(mockMessage.channel).thenReturn(instance(mockChannel));

		const message = instance(mockMessage);

		const handler = new TodoHandler(service);
		await handler.Handle(message, ["!todo", "unassign", "1", "user1"]);

		verify(mockedService.UnassignTodo(1, "user1", serverId)).once();
		verify(mockGuild.id).once();
		verify(mockChannel.send(anyOfClass(MessageEmbed))).once();
	});
});
