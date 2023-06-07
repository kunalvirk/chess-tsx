
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

    //Save individual pieces for each of the 64 cells
    pieces.forEach((item, index) => {
        if (!isNaN(Number(item)) && isFinite(Number(item))) {
            pieces.splice(index, 1, range(Number(item)).fill(''));
        }
    });
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
    const board: Cell[] = [];
    for (let i = 0; i < cells.length; i++) {
        //'cells', and 'pieces' have the same length of 64
        const cell = cells[i];
        const piece = pieces[i];
        board.push(new Cell(cell, piece));
    }

    return board;
};

console.log(
    createBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
);