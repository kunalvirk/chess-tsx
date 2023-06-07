import {useState, useRef, useEffect, useContext} from 'react'
import { Chess } from 'chess.js'
import { createBoard } from '../../utils/create-board';
import Board from '../../components/Board/Board';

// Setup a FEN string
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const Game = () => {

  // const { dispatch } = useContext(GameContext);
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));

  // Valid moves
  const [validMoves, setValidMoves] = useState(['']);

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);

  const fromPos = useRef();

  console.log("From POS", fromPos)

  const makeMove = (pos) => {
    console.log("[making a move]")
    const from = fromPos.current;
    const to = pos;
    chess.move({from, to});

    setFen(chess.fen());
  }

  const setFromPos = (pos) => {
    fromPos.current = pos;
    console.log("[setting a pos]")
    return (fromPos.current = pos)
  };

  const suggestMoves = (name, pos) => {
    console.log("[suggest move for piece]", name, pos)
    const suggestions = chess.moves({
      piece: name,
      square: pos
    })

    setValidMoves(suggestions);

    console.log("possible moves", suggestions)
  }

  return (
    <div className="game">
        <Board cells={board} makeMove={makeMove} setFromPos={setFromPos} suggestMoves={suggestMoves} suggestions={validMoves} />
    </div>
);
}

export default Game