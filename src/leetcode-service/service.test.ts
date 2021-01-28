import { assert } from "chai";
import { LeetcodeService } from "./service";
import { MongoStore } from "./mongo-store";
import { verify, mock, instance, when, anything } from "ts-mockito";

describe("Leetcode Service with mock store", () => {
	it("should get error when getting a random question", async () => {
		//TODO
		//
		const mockStore = mock(MongoStore);
		when(mockStore.GetAllQuestionTopics()).thenResolve(["array", "bit_manipulation"])
		
		const store = instance(mockStore);
		const service = new LeetcodeService(store);

		try {
			await service.GetRandomQuestion("crazy");
		} catch (error) {
			console.log("error", error)
			assert.equal(error, "Unsupported Param");
			verify(mockStore.GetRandomQuestion(anything())).never();

		}
		try {
			await service.GetRandomQuestion("crazy", "crazy");
		} catch (error) {
			console.log("error", error)
			assert.equal(error, "Unsupported Param");
			verify(mockStore.GetRandomQuestion(anything())).never();
		}
		await service.GetRandomQuestion();
		verify(mockStore.GetRandomQuestion(anything())).once();
	});

	it("should get error when getting question by id", async () => {
		const mockStore = mock(MongoStore);
		const store = instance(mockStore);
		const service = new LeetcodeService(store);

		try {
			await service.GetQuestion(-1);
		} catch (error) {
			assert.equal(error, "Id should be greater than zero");
			verify(mockStore.GetQuestionById(anything())).never();
		}
		await service.GetQuestion(1);
		verify(mockStore.GetQuestionById(1)).once();
	});

	it("should throw error when searching with an empty string", async () => {
		const mockStore = mock(MongoStore);
		const store = instance(mockStore);
		const service = new LeetcodeService(store);

		try {
			await service.SearchQuestion("");
		} catch (error) {
			assert.equal(error, "Search key is empty");
			verify(mockStore.SearchQuestionByTitle(anything())).never();
		}

		await service.SearchQuestion("merge")
		verify(mockStore.SearchQuestionByTitle("merge")).once()
	});

	it("should get error when adding a subscriber", async () => {
		const mockStore = mock(MongoStore);
		const store = instance(mockStore);
		const service = new LeetcodeService(store);

		try {
			await service.AddSubscriber("", "");
		} catch (error) {
			assert.equal(error, "Server and channel should be provided");
			verify(mockStore.AddSubscriber(anything())).never();
		}

	});
	it("should get error when removing a subscriber", async () => {
		const mockStore = mock(MongoStore);
		const store = instance(mockStore);
		const service = new LeetcodeService(store);

		try {
			await service.RemoveSubscriber("", "");
		} catch (error) {
			assert.equal(error, "Server and channel should be provided");
			verify(mockStore.RemoveSubscriber(anything())).never();
		}
	});

});
