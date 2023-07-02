import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./utils/create-board";
import { Chess } from "chess.js";
import { ICell } from "./types";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import toast from "react-simple-toasts";
import { gameOver } from "./utils/game-over";
import { socket } from "./socket";

// Default FEN string
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
// const FEN = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3'; // Checkmate
// const FEN = '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78'; // Stalemate

// Instantiate `chess.js`
export const chess = new Chess(FEN);


export interface IGameState {
    room: string;
    board: ICell[];
    possibleMoves?: [];
    isCheck: boolean;
    isCheckMate: boolean;
    turn: string;
    selectedCell: string | null;
    isGameOver: boolean;
    status: string | boolean;
}

export interface IChessMove {
    from?: string;
    to: string;
    promotion?: string;
}


// Define an initial state
const initialState: IGameState = {
    room: '',
    board: createBoard(chess.fen()),
    isCheck: chess.inCheck(),
    isCheckMate: chess.isCheckmate(),
    turn: chess.turn(),
    possibleMoves: [],
    selectedCell: null,
    isGameOver: chess.isGameOver(),
    status: gameOver(chess)[1]
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
            console.log("[setSelectedCell]");
            state.selectedCell = action.payload;
            state.possibleMoves = getPositions(chess.moves({
                square: action.payload
            }));

            console.log("[]selectedCell", state.selectedCell);
        },
        makeMove: (state, action: PayloadAction<IChessMove>) => { 

            const from = action.payload.from || state.selectedCell as string;
            const to = action.payload.to;

            console.log("[makeMove] ::", from, to, action);

            try {
                chess.move({from, to, promotion: 'q'});

                // Check if game over
                const [ifOver, status] = gameOver(chess);

                if (ifOver) {
                    state.status = status;
                }

                state.isCheck = chess.inCheck();
                state.isCheckMate = chess.isCheckmate();
                state.isGameOver = chess.isGameOver();

                socket.emit('move', { gameID: state.room, from, to });

            } catch(e) {
                console.log("Error", e);
                // console.log("in check", chess.isCheck());
                // console.log("is check mate", chess.isCheckmate());
                // toast('Invalid move!', { className: 'theme-toast' });
            }


            // Set the updated FEN string
            state.board = createBoard(chess.fen());
            state.possibleMoves = [];
            state.turn = chess.turn();
        },
        createRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        }
    }
});


// Export actions
export const { makeMove, setSelectedCell, createRoom } = gameSlice.actions;

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


