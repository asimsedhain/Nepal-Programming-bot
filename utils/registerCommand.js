const CommandStore = require("../store/CommandStore");

const registerCommand = (command, handler) => {
	CommandStore[command] = handler;
	return;
};

module.exports = registerCommand;
