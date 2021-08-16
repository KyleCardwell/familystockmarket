export const ADD_PLAYER = "ADD_PLAYER"
export const TOGGLE_BANKED = "TOGGLE_BANKED"
export const ADD_TO_POT = "ADD_TO_POT"
export const BANK_DICE_ROLL = "BANK_DICE_ROLL"

export const addPlayer= (player) => {
    return({type: ADD_PLAYER, payload: player})
}

export const toggleBanked = (id, num) => {
    return({type: TOGGLE_BANKED, payload: {id: Number(id), num: Number(num)}})
}

export const addToPot = (num) => {
    return({type: ADD_TO_POT, payload: num})
}
