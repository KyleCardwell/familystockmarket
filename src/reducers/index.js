import { ADD_PLAYER, ADD_TO_POT, BANK_PLAYER, NEXT_ROUND, TOGGLE_BANKED, UNBANK_PLAYER } from "../actions";
import { fakePlayers } from '../components/fakePlayers'

export const initialState = {
    
    players: fakePlayers,
    currentPot: 0,
    currentRoll: 1,
    currentRound: 1,    

}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(ADD_PLAYER):
            return ({
                ...state,
                players: [...state.players, action.payload]
            })
        // case(TOGGLE_BANKED):
        //     console.log(action.payload)
        //     const modPlayers = state.players.map(player => {
        //         if(Number(player.id) === Number(action.payload.id)) {
                    
        //             if(player.isBanked === false) {

        //                 player.isBanked = true
        //                 player.points = player.points + Number(action.payload.num)

        //             } else {
        //                 player.isBanked = false
        //             }
                    
        //         }
        //         return player;
        //     })
        //     return ({
        //         ...state,
        //         players: modPlayers
        //     })
        case(BANK_PLAYER):
            const bankPlayers = state.players.map(player => {
                if(Number(player.id) === Number(action.payload.id)) {
                    
                    if(player.isBanked === false) {

                        player.isBanked = true;
                        player.pointHistory.push(action.payload.num)
                        player.points = player.pointHistory.reduce((sum, value) => {return sum + value}, 0)
                    }
                    console.log(player)
                }
            

                return player;
            })
            return({
                ...state,
                players: bankPlayers
            })
        case(UNBANK_PLAYER):
            const unbankPlayers = state.players.map(player => {

                if(Number(player.id) === Number(action.payload)) {

                    if(player.isBanked === true) {

                        player.isBanked = false;
                        player.pointHistory.pop()
                        player.points = player.pointHistory.reduce((sum, value) => {return sum + value}, 0)
                    }
                    console.log(player)
                }

                return player
            })
            return ({
                ...state,
                players: unbankPlayers
            })
        case(ADD_TO_POT):
            return ({
                ...state,
                currentPot: Number(state.currentPot) + Number(action.payload),
                currentRoll: state.currentRoll + 1
            })
        case(NEXT_ROUND):

            const unbankedPlayers = state.players.map(player => {
                if(player.isBanked === false) {
                    player.pointHistory.push(0)
                }
                return player
            })
            console.log(unbankedPlayers)
            return ({
                ...state,
                currentPot: 0,
                currentRound: state.currentRound + 1,
                currentRoll: 1,
                players: unbankedPlayers.map(player => {
                    return ({
                        ...player,
                        isBanked: false,
                    })
                })
            })
        default:
            return state;
    }
}