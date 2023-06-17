import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./utils/create-board";
import { Chess } from "chess.js";
import { ICell } from "./types";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import toast from "react-simple-toasts";

// Default FEN string
// const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const FEN = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1';

// Instantiate `chess.js`
export const chess = new Chess(FEN);

export interface IGameState {
    board: ICell[];
    possibleMoves?: [];
    isCheck: boolean;
    isCheckMate: boolean;
    turn: string;
    selectedCell: string | null;
    isGameOver: boolean;
}


// Define an initial state
const initialState: IGameState = {
    board: createBoard(chess.fen()),
    isCheck: false,
    isCheckMate: false,
    turn: chess.turn(),
    possibleMoves: [],
    selectedCell: null,
    isGameOver: false
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
            
            try {
                chess.move({from, to, promotion: 'q'});

                state.isCheck = chess.inCheck();
                state.isCheckMate = chess.isCheckmate();
                state.isGameOver = chess.isGameOver();

            } catch(e) {
                console.log("Error", e);
                console.log("in check", chess.isCheck());
                console.log("is check mate", chess.isCheckmate());
                toast('Invalid move!', { className: 'theme-toast' });
            }


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


