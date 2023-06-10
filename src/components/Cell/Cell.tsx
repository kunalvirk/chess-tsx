import React from 'react';
import './Cell.css';
import { ICell } from '../../types';
import { isLightSquare } from '../../utils/cell-color';
import Piece from '../Piece/Piece';
import { useDispatch, useSelector } from 'react-redux';
import { makeMove } from '../../store';

interface CellProps {
    cell: ICell;
    index: number;
}

const Cell: React.FC<React.PropsWithChildren<CellProps>> = ({ cell, index }) => {

    const possibleMoves: [] = useSelector(state => state.game.possibleMoves);
    const dispatch = useDispatch();

    const isLightBlock = isLightSquare(cell.pos, index);

    const isPossibleMove = possibleMoves.includes(cell.pos);
    
    const handleDrop = () => {
        dispatch(makeMove(cell.pos));
    };

    return (
        <div
            className={`cell ${isLightBlock ? 'light' : 'dark'} ${isPossibleMove && 'highlight'}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Piece name={cell.piece} pos={cell.pos} />
            
        </div>
    );
};

export default Cell;