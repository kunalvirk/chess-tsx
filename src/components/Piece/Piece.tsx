import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCell } from '../../store';

interface PieceProps {
  name: string;
  pos: string;
}

const Piece: React.FC<React.PropsWithChildren<PieceProps>> = ({
  name,
  pos
}) => {
  const dispatch = useDispatch();
  const piece = useRef<HTMLImageElement>(null);

  const color = name === name.toUpperCase() ? 'w' : 'b';
  const imageName = color + name.toUpperCase();

  const fallback = () => `/assets/images/empty.png`;

  const handleDragStart = async () => {
    try {
      dispatch(setSelectedCell(pos));
      setTimeout(() => {
        if (piece.current) piece.current.style.display = 'none';
      }, 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragEnd = () => {
    if (piece.current) piece.current.style.display = 'block';
  };

  return (
    <img
      src={`/assets/images/${imageName}.png`}
      className="piece"
      alt=""
      onError={fallback}
      draggable={true}
      ref={piece}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};

export default Piece;
