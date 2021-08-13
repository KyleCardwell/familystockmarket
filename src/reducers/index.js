import { ADD_PLAYER } from "../actions";
import { fakePlayers } from '../components/fakePlayers'

export const initialState = {
    
    players: fakePlayers,
    currentPot: 0,
    currentRound: 1,
    

}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(ADD_PLAYER):
            return ({
                ...state,
                players: [...state.players, action.payload]
            })
        default:
            return state;
    }
}