import React from 'react';

import './Board.css';
import { ICell } from '../../types';
import Cell from '../Cell/Cell';
import { useAppSelector } from '../../store';

interface BoardProps {
    cells: ICell[]
}

const Board: React.FC<React.PropsWithChildren<BoardProps>> = ( { cells } ) => {
    const { isGameOver } = useAppSelector(state => state.game);
    return (
        <div className={`board ${isGameOver ? 'game-over' : ''}`}>
            {cells.map((cell, index) => (
                <Cell cell={cell} index={index} key={cell.pos} />
            ))}
        </div>
    );
};

export default Board;