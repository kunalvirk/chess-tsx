import React, { useContext, useState } from 'react'
import './Cell.css';
import { ICell } from '../../types';
import { isLightSquare } from '../../utils/cell-color';
import Piece from '../Piece/Piece';
import { GameContext } from '../../context/GameContext';

interface CellProps {
    cell: ICell;
    index: number;
}

const Cell: React.FC<React.PropsWithChildren<CellProps>> = ({ cell, index, ...props }) => {

    const isLightBlock = isLightSquare(cell.pos, index);

    const { possibleMoves } = useContext(GameContext);
    const isPossibleMove = possibleMoves.includes(cell.pos);
    
    const handleDrop = () => {
        props.makeMove(cell.pos);
    };

    return (
        <div
            className={`cell ${isLightBlock ? 'light' : 'dark'} ${isPossibleMove && 'highlight'}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Piece name={cell.piece} pos={cell.pos} setFromPos={props.setFromPos} suggestMoves={props.suggestMoves}/>
            
        </div>
    );
}

export default Cell