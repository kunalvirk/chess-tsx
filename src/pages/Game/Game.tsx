import {useState, useRef, useEffect, useContext} from 'react'
import { Chess } from 'chess.js'
import { createBoard } from '../../utils/create-board';
import Board from '../../components/Board/Board';
import { types } from '../../context/GameActions';
import { GameContext } from '../../context/GameContext';
import './Game.css';
// Setup a FEN string
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const Game = () => {

  const { dispatch } = useContext(GameContext);
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));

  // Valid moves
  const [validMoves, setValidMoves] = useState(['']);

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);


  // `fromPos` will hold the ref to the piece user is moving along with its `name` and `position`
  const fromPos = useRef();

  // This is to place the piece on the board on user desired location
  const makeMove = (pos) => {
    // User made a move
    const from = fromPos.current;
    const to = pos;
    chess.move({from, to});
    dispatch({type: types.CLEAR_POSSIBLE_MOVES});
    setFen(chess.fen());
  }

  // This will set the `fromPos` from the `piece` component
  const setFromPos = (pos) => {
    fromPos.current = pos;
    dispatch({type: types.SHOW_POSSIBLE_MOVES, moves: chess.moves({square: pos})})
    
  };

  // This is to highlight the cells where a user can move
  const suggestMoves = (name, pos) => {
    const suggestions = chess.moves({
      piece: name,
      square: pos
    })

    setValidMoves(suggestions);
  }

  return (
    <div className="game">
        <ul className="board-info board-left">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
        </ul>
        <ul className="board-info board-bottom">
          <li>a</li>
          <li>b</li>
          <li>c</li>
          <li>d</li>
          <li>e</li>
          <li>f</li>
          <li>g</li>
          <li>h</li>
        </ul>
        <Board cells={board} makeMove={makeMove} setFromPos={setFromPos} suggestMoves={suggestMoves} suggestions={validMoves} />
    </div>
);
}

export default Game