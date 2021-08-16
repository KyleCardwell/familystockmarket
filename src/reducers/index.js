import { ADD_PLAYER, ADD_TO_POT, TOGGLE_BANKED } from "../actions";
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
        case(TOGGLE_BANKED):
            console.log(action.payload)
            const modPlayers = state.players.map(player => {
                if(Number(player.id) === Number(action.payload.id)) {
                    
                    if(player.isBanked === false) {

                        player.isBanked = true
                        player.points = player.points + Number(action.payload.num)

                    } else {
                        player.isBanked = false
                    }
                    
                }
                return player;
            })
            return ({
                ...state,
                players: modPlayers
            })
        case(ADD_TO_POT):
            return ({
                ...state,
                currentPot: Number(state.currentPot) + Number(action.payload)
            })
        default:
            return state;
    }
}