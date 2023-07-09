import React from 'react';
import { useAppSelector } from '../../store';
import Layout from '../Layout/Layout';
const GameOver: React.FC = () => {

    // Grab the `status` and `turn` from global state
    const { turn, status } = useAppSelector(state => state.game);
    
    // Determine winner
    let winner;

    if (status === "checkmate") {
        if (turn === 'w') {
            winner = 'black';
        } else {
            winner = 'white';
        }
    }

    let onPlayAgain: () => void = function (): void {window.location.reload();}


    const content = () => (
        <React.Fragment>
            <h1>Game over</h1>
            <p>
                The game ended in a <mark>{status}</mark>
            </p>
            {winner && (
                <p>
                    <mark>{winner}</mark> won
                </p>
            )}
            <button onClick={onPlayAgain}>Play Again</button>
        </React.Fragment>
    );

  return (
    <Layout Content={content} />
  );
};

export default GameOver;