## noah
# Block Battle

### Team Overview
Noah White - 28njw

### Application Idea

The main idea of the application is an online tetris player where you can play with other people simultaneously. This will be accomplished by using the socket.io Node.js library. This means the application will be working with the data of board states for each user, along with their user info such as username, password, high score, etc. Data for each running server or "room" for the game also has to be created and stored whenever a new room is created.

### Functionality

Upon first visiting, a user will need to either make a new account or sign in to an existing one. An account requires a unique username and a password, and upon registering they are added to the database with other values initialized such as "high score" at 0. On login, some user data will be stored in the browser cache such as a session key and recently joined rooms that still exist in order for there to be a panel to quickly rejoin those rooms. Players can join an existing room or create a new room where they are paired with other players, and the board states are shared between everyone so everyone's is viewable by other players. Board states are shared between players using sockets.io, and so is individual room data such as number of games played, number of times each player has won, overall high score between players, etc. When all players leave a room it is destroyed and all the data is lost, except data such as high scores that is saved to individual user accounts.