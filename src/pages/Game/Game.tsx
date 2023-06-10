import Board from '../../components/Board/Board';
import { useAppSelector } from '../../store';
import './Game.css';

const Game = () => {

  const gameState = useAppSelector(state => state.game);
  

  return (
    <>
      <div className="statusBar">
        <div className="turnIndicator">
          Turn: <span>{gameState.turn === 'w' ? 'White' : 'Black'}</span>
        </div>
      </div>
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
          <Board cells={gameState.board} />
      </div>
    </>
);
};

export default Game;