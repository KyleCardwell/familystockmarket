import { ADD_PLAYER, ADD_TO_POT, BANK_PLAYER, DELETE_PLAYER, MOVE_PERSON, NEW_GAME, NEXT_ROUND, RESTART_ROUND, TOP_SCORE, UNBANK_PLAYER } from "../actions";
import { fakePlayers } from "../components/fakePlayers";

export const initialState = {
    
    players: [...fakePlayers],
    currentPot: 0,
    currentRoll: 1,
    currentRound: 1,
    topScore: 0, 

}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(ADD_PLAYER):
            return ({
                ...state,
                players: [...state.players, action.payload]
            })
        case(DELETE_PLAYER):
        const filtered = state.players.filter(player => Number(player.id) !== Number(action.payload))
            return({
                ...state,
                players: filtered
            })
        case(BANK_PLAYER):

            const bankPlayers = state.players.map(player => {

                if(state.currentRoll > 3) {

                    if(Number(player.id) === Number(action.payload.id)) {
                        
                        if(player.isBanked === false) {
    
                            player.isBanked = true;
                            player.pointHistory[player.pointHistory.length - 1] = action.payload.num
                            player.points = player.pointHistory.reduce((sum, value) => {return sum + value}, 0)
                        }
    
                    }
                }

                return player
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
                        player.pointHistory[player.pointHistory.length - 1] = 0
                        player.points = player.pointHistory.reduce((sum, value) => {return sum + value}, 0)
                    }

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

            return ({
                ...state,
                currentPot: 0,
                currentRound: state.currentRound < 20 ? state.currentRound + 1 : state.currentRound,
                currentRoll: 1,
                players: state.players.map(player => {
                    return ({
                        ...player,
                        isBanked: false,
                        pointHistory: [...player.pointHistory, 0]
                    })
                })
            })
        case(RESTART_ROUND):
            return ({
                ...state,
                currentPot: 0,
                currentRoll: 1,
                currentRound: state.currentRound,
                players: state.players.map(player => {

                    if(player.isBanked === true) {
    
                        player.isBanked = false;
                        player.pointHistory[player.pointHistory.length - 1] = 0
                        player.points = player.pointHistory.reduce((sum, value) => {return sum + value}, 0)
                    }

                    return player
                })
            })
        case(NEW_GAME):
            return({
                ...state,
                currentPot: 0,
                currentRoll: 1,
                currentRound: 1,
                players: state.players.map(player => {
                    return({
                        ...player,
                        isBanked: false,
                        pointHistory: [0],
                        points: 0
                    })
                })
            })
        case(TOP_SCORE):
            return({
                ...state,
                topScore: action.payload
            })
        case(MOVE_PERSON):

            const moving = state.players.find(person => person.id === action.payload.personId)
            const moveToIndex = state.players.findIndex(person => person.id === action.payload.hoveredId)

            const playerTakenOut = state.players.filter(player => player.id !== action.payload.personId)

            playerTakenOut.splice(moveToIndex, 0, moving)

            console.log("player taken out ", playerTakenOut)

            return({
                ...state,
                players: playerTakenOut,
            })
        default:
            return state;
    }
}