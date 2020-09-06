const fs = require("fs");
const OrderedQuestionStoreRaw = fs.readFileSync("./assets/ordered_question_list.json");
const OrderedQuestionStore = JSON.parse(OrderedQuestionStoreRaw);

module.exports = OrderedQuestionStore
