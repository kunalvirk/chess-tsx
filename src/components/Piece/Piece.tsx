import React, {useRef} from 'react'

interface PieceProps {
    name: string;
    pos: string;
}

const Piece: React.FC<React.PropsWithChildren<PieceProps>> = ({name, pos, ...props}) => {

    const piece = useRef();

    const color = name === name.toUpperCase() ? 'w' : 'b';
    const imageName = color + name.toUpperCase();

    const fallback = () => {
        return `/assets/images/empty.png`;
    };

    const handleDragStart = (e) => {

        props.setFromPos(pos);
        props.suggestMoves(name, pos);        

        setTimeout(() => {
            piece.current.style.display = 'none';
        }, 0);
        
    };
    const handleDragEnd = () => {
        piece.current.style.display = 'block';
    };

  return <img 
        src={`/assets/images/${imageName}.png`} 
        className="piece" 
        alt="" 
        onError={fallback} 
        draggable={true}
        ref={piece}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
    />
}

export default Piece