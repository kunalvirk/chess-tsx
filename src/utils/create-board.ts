
import { ICell } from "../types";

class Cell implements ICell {

    pos: string;
    piece: string;

    constructor(pos: string, piece: string) {
        this.pos = pos;
        this.piece = piece;
    }
}
//  returns an array of range 1, n
const range = (n: number): number[] => {
    return Array.from({ length: n }, (_, i) => i + 1);
};

/**
 *
 * @param {String} fenString rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
 * @returns {Cell[]}
 */
export const createBoard = (fenString: string): Cell[] => {
    
    const fen = fenString.split(' ')[0]; //Get the first portion

    const fenPieces = fen.split('/').join(''); //remove the row delimiters '/'
    //rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR

    let pieces: string[] = Array.from(fenPieces);

    /**
     * Convert all the `number` occurences to an array
     * for example, after building the `pieces` array from FEN string
     * it will look something like this
     * 
     * ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', '8', '8', '8', '8', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
     * 
     * Now to build the chessboard perfectly, we want to loop over these cells
     * so instead of keeping it `8` or any number (the above array will change after every move)
     * to an array of the same length as the number
     * 
     * For ex: if the number is 4, we will fill that space with an array of 4 empty string ''
     * 
     */
    pieces.forEach((item, index) => {
        if (!isNaN(Number(item)) && isFinite(Number(item))) {
            console.log("item", item);
            pieces.splice(index, 1, range(Number(item)).fill(''));
        }
    });

    // Flatten out the above built array to loop over and generate cells
    pieces = pieces.flat();

    const rows = range(8)
        .map((n) => n.toString())
        .reverse(); //["8", "7", "6", "5", "4", "3", "2", "1"]

    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const cells: string[] = []; //[a1, b1, c1..., h8]
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (let j = 0; j < columns.length; j++) {
            const col = columns[j];
            cells.push(col + row); //e.g a1, b1, c1...
        }
    }

    // Build the board
    const board: Cell[] = [];
    for (let i = 0; i < cells.length; i++) {
        //'cells', and 'pieces' have the same length of 64
        const cell = cells[i];
        const piece = pieces[i];
        board.push(new Cell(cell, piece));
    }

    return board;
};

// console.log(
//     createBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
// );