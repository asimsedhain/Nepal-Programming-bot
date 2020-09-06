const CommandStore = require("../store/CommandStore");

const isRegisteredCommand = (command) => {
	return command in CommandStore
};

module.exports = isRegisteredCommand;
