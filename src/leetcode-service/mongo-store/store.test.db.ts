import { assert } from "chai";
import { MongoStore } from "./store";
import { QuestionFilter } from "../questionFilter";
import model from "./questions";
import * as data from "./leetcode-transformed-question-list.json";

describe("Questions MongoStore", () => {
	before(async () => {
		const dataArray = [];

		for (let i = 0; i < 100; i++) {
			const q = data[i];

			const tempQuestion = {
				Id: q.Id,
				Title: q.Title,
				Url: q.Url,
				Difficulty: q.Difficulty,
				Topic: q.Topic,
			};
			dataArray.push(tempQuestion);
		}

		await model.insertMany(dataArray);
	});

	it("Should get question by id", async () => {
		const store = new MongoStore();
		const id = 1337;
		const question = await store.GetQuestionById(1337);
		assert.equal(question.Id, id);
		assert.equal(question.Title, "The K Weakest Rows in a Matrix");
		assert.equal(question.Url, "/problems/the-k-weakest-rows-in-a-matrix");
		assert.equal(question.Topic, "search");
		assert.equal(question.Difficulty, "easy");
	});
	it("Should get random question", async () => {
		const store = new MongoStore();
		let filter: QuestionFilter = { Difficulty: "hard" };
		let question = await store.GetRandomQuestion(filter);
		assert.isNotNull(question, "checking if we get a question");
		filter = { Difficulty: "hard" };
		question = await store.GetRandomQuestion(filter);
		assert.equal(question.Difficulty, "hard");
		filter = { Difficulty: "easy" };
		question = await store.GetRandomQuestion(filter);
		assert.equal(question.Difficulty, "easy");
		filter = { Difficulty: "medium" };
		question = await store.GetRandomQuestion(filter);
		assert.equal(question.Difficulty, "medium");
		filter = { Topic: "search" };
		question = await store.GetRandomQuestion(filter);
		assert.equal(question.Topic, "search");
		filter = { Topic: "tree", Difficulty: "easy" };
		question = await store.GetRandomQuestion(filter);
		assert.equal(question.Topic, "tree");
		assert.equal(question.Difficulty, "easy");
	});

	it("Should add and remove subscriber", async () => {
		const store = new MongoStore();
		const server = "server";
		const channel = "channel";
		const subscriber = { Server: server, Channel: channel };
		await store.AddSubscriber(subscriber);
		const subs = await store.GetAllSubscribers();
		assert(subs.length != 0);
		assert.equal(
			subs[0].Server,
			subscriber.Server,
			"assert the subs are equal"
		);
		assert.equal(
			subs[0].Channel,
			subscriber.Channel,
			"assert the subs are equal"
		);

		await store.RemoveSubscriber(subscriber);
		const emptySubs = await store.GetAllSubscribers();
		assert(emptySubs.length === 0);
	});

	it("Should get all topics", async () => {
		const store = new MongoStore();
		let topics = await store.GetAllQuestionTopics();
		assert(topics.length != 0);
	});
});
