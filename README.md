
# Chess TSX
This is a simple React chess application that can be used to play chess with others online. It is built using React.js, TypeScript, Node.js, Express.js, and Socket.io.

![demo](./demo.png?raw=true)

## Concepts
- It uses chess.js to manage the core logic of chess
- The chess board is being built using custom utility function that can be found in 'src/utils/create-board.ts'
- This will use redux to manage state such as 'IS_CHECK, IS_CHECKMATE, CURRENT_TURN' etc. (currently the state is being managed by context API)


## Features
- Multiplayer capabilities
- Valid move highlighting
- Room creation and sharing

## Todo
- Integrate Redux to manage state
- Integrate react-router
- Make a better UI
- Setup backend using express.js
- Integrate room creation and enabling users to play in a multiplayer mode using socket.io

## Setup
1. Install the dependencies:
`npm install`

2. Start the development server:
`npm run dev`

The application will be available at http://localhost:5173/.

## Usage
To play chess, simply create a room and share the room code with another user. The other user can then join the room and you can start playing.

## License
This project is licensed under the MIT License.