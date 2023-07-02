import { Chess } from "chess.js";

/**
 * 
 * @param chess: An instance of chess current object
 * @returns [boolean, string]
 */

export const gameOver = (chess: Chess) => {

    if (!chess.isGameOver()) {
        return [false, ''];
    }

    if (chess.isCheckmate()) {
        return [true, 'checkmate'];
    }

    if (chess.isStalemate()) {
        return [true, 'stalemate'];
    }

    if (chess.isThreefoldRepetition()) {
        return [true, 'three fold repetition'];
    }

    if (chess.isDraw()) {
        return [true, 'draw'];
    }
};