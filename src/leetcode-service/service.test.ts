//import { assert } from "chai";
//import { LeetcodeService } from "./service";

//describe("Leetcode Service with mongo store", () => {
	//it("should get a random question", async () => {
		//const service = new LeetcodeService();
		//let question = await service.GetRandomQuestion();
		//assert.isTrue(question, "checking if we get a question");
		//question = await service.GetRandomQuestion("hard");
		//assert.equal(question.Difficulty, "hard");
		//question = await service.GetRandomQuestion("easy");
		//assert.equal(question.Difficulty, "easy");
		//question = await service.GetRandomQuestion("Medium");
		//assert.equal(question.Difficulty, "medium");

		//question = await service.GetRandomQuestion("", "search");
		//assert.equal(question.Topic, "search");
		//question = await service.GetRandomQuestion("easy", "tree");
		//assert.equal(question.Topic, "tree");
		//assert.equal(question.Difficulty, "easy");


	//});
	//it("should get a question based on the Id", async () => {
		//const service = new LeetcodeService();
		//let question = await service.GetQuestion(1137);
		//assert.isTrue(question, "checking if we get a question");

		//assert.equal(question.Id, 1337);
		//assert.equal(question.Title, "The K Weakest Rows in a Matrix");
		//assert.equal(question.Difficulty, "Easy");
		//assert.equal(question.Topic, "search");
	//});

	//it("should search for questions based on the title", async () => {
		//const service = new LeetcodeService();
		//let questions = await service.SearchQuestion(
			//"Weakest Rows in a Matrix"
		//);

		//assert(questions.length >= 0, "should get a result");
		//let contains = false;
		//for (const question of questions) {
			//if (question.Topic === "The K Weakest Rows in a Matrix") {
				//contains = true;
			//}
		//}
		//assert(contains);
	//});
	//it("should get all the topics of the questions", async () => {
		//const service = new LeetcodeService();
		//let topics = await service.GetAllTopics();
		//assert(topics.length>0)

	//});
	////TODO
	////Complete Tests for Subscribers
//});
