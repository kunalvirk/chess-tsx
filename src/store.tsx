import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./utils/create-board";
import { Chess } from "chess.js";
import { ICell } from "./types";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Default FEN string
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Instantiate `chess.js`
export const chess = new Chess(FEN);

export interface IGameState {
    board: ICell[];
    possibleMoves?: [];
    isCheck: boolean;
    isCheckMate: boolean;
    turn: string;
    selectedCell: string | null;
}


// Define an initial state
const initialState: IGameState = {
    board: createBoard(chess.fen()),
    isCheck: false,
    isCheckMate: false,
    turn: chess.turn(),
    possibleMoves: [],
    selectedCell: null,
};


// Function to remove the extra character returned by chess.js for suggested moves, eg 'na3'
const getPositions: [] = (moves: string[]) => {
    return moves.map(move => {
        const n = move.length;
        return move.substring(n - 2);
    });
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setSelectedCell: (state, action: PayloadAction<string>) => {
            state.selectedCell = action.payload;
            state.possibleMoves = getPositions(chess.moves({
                square: action.payload
            }));
        },
        makeMove: (state, action: PayloadAction<string>) => { 

            console.log("action payload", action);

            const from = state.selectedCell as string;
            const to = action.payload;
            
            chess.move({from, to});

            // Set the updated FEN string
            state.board = createBoard(chess.fen());
            state.possibleMoves = [];
            state.turn = chess.turn();
        }
    }
});


// Export actions
export const { makeMove, setSelectedCell } = gameSlice.actions;

// Create the store
const store = configureStore({
    reducer: {
        game: gameSlice.reducer
    }
});

// Define root store type
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;


