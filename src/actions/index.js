export const ADD_PLAYER = "ADD_PLAYER"
export const TOGGLE_BANKED = "TOGGLE_BANKED"
export const ADD_TO_POT = "ADD_TO_POT"
export const BANK_DICE_ROLL = "BANK_DICE_ROLL"
export const BANK_PLAYER = "BANK_PLAYER"
export const UNBANK_PLAYER = "UNBANK_PLAYER"

export const addPlayer= (player) => {
    return({type: ADD_PLAYER, payload: player})
}

export const addToPot = (num) => {
    return({type: ADD_TO_POT, payload: num})
}

export const toggleBanked = (id, num) => {
    return({type: TOGGLE_BANKED, payload: {id: Number(id), num: Number(num)}})
}

export const bankPlayer = (id, num) => {
    return({type: BANK_PLAYER, payload: {id: Number(id), num: Number(num)}})
}

export const unBankPlayer = (id) => {
    return({type: UNBANK_PLAYER, payload: id})
}
