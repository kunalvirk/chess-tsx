import React, { useRef } from 'react';

interface PieceProps {
  name: string;
  pos: string;
  setFromPos: (pos: string) => void;
  suggestMoves: (name: string, pos: string) => void;
}

const Piece: React.FC<React.PropsWithChildren<PieceProps>> = ({
  name,
  pos,
  setFromPos,
  suggestMoves,
  ...props
}) => {
  const piece = useRef<HTMLImageElement>(null);

  const color = name === name.toUpperCase() ? 'w' : 'b';
  const imageName = color + name.toUpperCase();

  const fallback = () => `/assets/images/empty.png`;

  const handleDragStart = async (e: React.DragEvent<HTMLImageElement>) => {
    try {
      await setFromPos(pos);
      await suggestMoves(name, pos);
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
