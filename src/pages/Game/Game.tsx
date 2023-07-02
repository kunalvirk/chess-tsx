import Board from '../../components/Board/Board';
import GameOver from '../../components/GameOver/GameOver';
import { socket } from '../../socket';
import { makeMove, useAppSelector } from '../../store';
import './Game.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const Game = () => {

  const gameState = useAppSelector(state => state.game);
  const dispatch = useDispatch();

  // Perform socket io establishments
  useEffect(() => {

    // Initiate `socket` connection
    socket.connect();

    socket.emit('join', {
      name: 'Narendra Modi',
      gameID: gameState.room
    }, (err, color) => {
      console.log("color assigned after `join` event", color);
    });

    socket.on('opponentMove', ({ from, to }) => {
        console.log(`[opponent moved] :: from ${from}, to ${to}`);
        dispatch(makeMove({from, to}));
        
    });
    
  });

  if (gameState.isGameOver) {
    return <GameOver />;
  }


  return (
    <div className="game-wrapper">
      <div className="statusBar">
        <div className={`turnIndicator ${gameState.turn === 'w' ? 't-white' : 't-black'}`}>
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
    </div>
);
};

export default Game;