import { createContext, useReducer } from 'react'
import gameReducer from './GameReducer';

// Define an initial state
const initialState = {
    possibleMoves: []
}

// Create a game context
export const GameContext = createContext(initialState);

// Define a provider
export const GameProvider = ({ children }) => {

    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{...state, dispatch}}>
            {children}
        </GameContext.Provider>
    )

}