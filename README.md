# ![Nepal Programming Bot](assets/nepal_programming_banner.png)

This repo holds the sources code for NP Discord Bot.

## Motivation
Nepal Programming Bot (formerly called the pomodoro bot) was initially made to track pomodoro count in the Nepal Programming Discord server.
After the Nepal Programming Discord server was dissolved, NP Bot was moved to "The Grind" server where it is currently being used by to practice leetcode questions and prepare for interviews. It also now supports organizational features for colaboration.

## [Click on this link to add the bot to your server](https://discord.com/api/oauth2/authorize?client_id=748766788569006220&permissions=88064&scope=bot)

## Commands
The features of the bot are listed below.

|	Command	|	Description	|
|-----------|---------------|
|	!lc		|Shows help description for !lc|
|	!lc <easy|med|hard> <category>| Shows a random leetcode with the given difficulty and category. If no difficulty or category is selected, then a random question will be picked|
|	!lc subscribe	| Subscribes channel and server to daily leetcode question|
|	!lc unsubscribe | Unsubscribes channel and server to daily leetcode question|
|	!todo	|	Shows a list of todos with their TASK_ID|
|	!todo help	|	Shows todo help dialog|
|	!todo add TASK|	Adds TASK to the todo list and assigns the task a TASK_ID|
|	!todo remove TASK_ID| Removes TASK with TASK_ID|
|	!todo modify TASK_ID NEW_TASK | Modifies the task with the new task|
|	!todo assign TASK_ID USER_ID | Assigns TASK_ID task to user with USER_ID. Can add multiple users to task|
|	!todo unassign TASK_ID USER_ID| Unassign user with USER_ID from TASK with TASK_ID |
|	!todo clearall | Removes all the task from the list|
|	!todo reminder TASK_ID TIME | Adds a reminder for the task. The reminder will be posted on the channel and server it was added in. It would also ping the users who have been assigned the task|
|	!todo reminderRemove TASK_ID | Removes any reminder from the task|
|	!todo reminderRemoveAll | Removes all the reminders from the tasks in the server|


## Contributions
To contribute to this project, please look at the [contribution guide](./CONTRIBUTING.md).
