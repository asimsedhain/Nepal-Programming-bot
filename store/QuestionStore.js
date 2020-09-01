const fs = require("fs");
const QuestionStoreRaw = fs.readFileSync("./assets/grouped_data.json");
const QuestionStore = JSON.parse(QuestionStoreRaw);

module.exports = QuestionStore
