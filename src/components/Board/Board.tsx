import React from 'react'

import './Board.css'
import { ICell } from '../../types';
import Cell from '../Cell/Cell';

interface BoardProps {
    cells: ICell[]
}

const Board : React.FC<React.PropsWithChildren<BoardProps>> = ( { cells, ...props } ) => {
    return (
        <div className="board">
            {cells.map((cell, index) => (
                <Cell cell={cell} index={index} key={cell.pos} {...props}/>
            ))}
        </div>
    );
}

export default Board