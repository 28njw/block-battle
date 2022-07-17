# Data interations:

* User changing their name to display on the scoreboard
* User being given a score upon completing a game
* A leaderboard of top 10 scores being fetched from the database and shown to the user upon completing a game or them clicking the "leaderboard" button
* User's local high score being saved in the browser
* State of the animation type of the background being stored in the browser

# First screen HTML

* Play button makes game board visible and removes the title and play/leaderboard buttons from the DOM to make room for it
* Animation button is a toggle to toggle between 2 background animation types, and the type is saved in local storage in the browser so it is consistent on reload
* Below the animation button the user can type their username which their score will be saved under

# Game screen HTML

* The actual game is displayed in the middle of the screen with the score shown above, a restart button is unhidden below it when the game is lost to reset the game and a leaderboard is also unhidden.

# Video Link

https://youtu.be/V-Wlz9tRfrQ