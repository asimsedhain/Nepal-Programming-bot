const CommandStore = require("../store/CommandStore");

const executeCommand = (command, message, args) => {
		return CommandStore[command](message, args)
};

module.exports = executeCommand;
