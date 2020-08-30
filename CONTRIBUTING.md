# Code Contribution Guidelines

Thank you for your interest in contributing! Please follow the guide below which describes the process for making code contribution for the Nepal Programming Bot repo.

1. Select a ticket

Find a [help ticket on GitHub](https://github.com/asimsedhain/Nepal-Programming-bot/issues). Comment to let everyone know you’re working on it. If you want to suggest a new feature, create a new issue.

2. Set up your developer machine

You will need NodeJS and your own discord server and bot to run and test the bot. After that, you will need to fork the repo and clone it to your machine. Then run `npm install`. You will also need to create a `.env` file which will store all the environment variables. The follow shows all the environment variables in the `.env` file and here is a link to a [template](assets/template.env) `.env` file. Don't forget to rename the template `.env` file to `.env`.
`TOKEN`: This is the token used to connect to the bot. You will need to create it for your test bot. [Here is more info on that.](https://discordpy.readthedocs.io/en/latest/discord.html)
`PREFIX`: This is the prefix for the command used to call pomodoro command.
`HEADER`: This is the header shown when the pomo command is called.
`WINNER_HEADER`: This is the header shown when the daily winder is announced.
`CHANNEL_ID` This is the channel ID where the bot will announce the daily winner. You can get it by right clicking the channel and selecting the `Copy ID` option.
`ADDED_HEADER`: This is the header shown when a new pomodoro is added.

3. Running the bot

You should now be able to run the bot with the `npm start`. You can check by going to your test server where you should have already invited the bot and type `!pomo`.

4. Start developing

At this step, you make the necessary changes to the code. You can always ask questions on the GitHub issue or on the discord server itself.

5. Create a Pull Request

After you are done with developing, create a pull request againts the master branch of this repo. Someone will review your code and let you know if any changes needs to made. If everything is fine, your code will be merged and deployed. Congratulations!!
