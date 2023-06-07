import React, { useState } from 'react'
import './Cell.css';
import { ICell } from '../../types';
import { isLightSquare } from '../../utils/cell-color';
import Piece from '../Piece/Piece';

interface CellProps {
    cell: ICell;
    index: number;
}

const Cell: React.FC<React.PropsWithChildren<CellProps>> = ({ cell, index, ...props }) => {

    const isLightBlock = isLightSquare(cell.pos, index);
    
    const handleDrop = () => {
        console.log(`[moved to ${cell.pos}]`)
        props.makeMove(cell.pos);
    };

    return (
        <div
            className={`cell ${isLightBlock ? 'light' : 'dark'}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Piece name={cell.piece} pos={cell.pos} setFromPos={props.setFromPos} suggestMoves={props.suggestMoves}/>
            {cell.pos}
        </div>
    );
}

export default Cell