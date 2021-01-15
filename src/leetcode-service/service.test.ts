import { assert } from "chai";
import { LeetcodeService } from "./service";

describe("Leetcode Service with mongo store", ()=>{
	it("should get a random question", async ()=>{
		const service = new LeetcodeService()	
		let question = await service.GetRandomQuestion()
		assert.isTrue(question, "checking if we get a question")
		question = await service.GetRandomQuestion("hard")
		assert.equal(question.Difficulty, "Hard")
		question = await service.GetRandomQuestion("easy")
		assert.equal(question.Difficulty, "Easy")
		question = await service.GetRandomQuestion("Medium")
		assert.equal(question.Difficulty, "Medium")

		
		question = await service.GetRandomQuestion("", "search")
		assert.equal(question.Topic, "Search")

		//TODO
		//complete tests

	})

})
