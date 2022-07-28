export const ADD_PLAYER = "ADD_PLAYER"
export const TOGGLE_BANKED = "TOGGLE_BANKED"
export const ADD_TO_POT = "ADD_TO_POT"
export const BANK_DICE_ROLL = "BANK_DICE_ROLL"
export const BANK_PLAYER = "BANK_PLAYER"
export const UNBANK_PLAYER = "UNBANK_PLAYER"
export const NEXT_ROUND = "NEXT_ROUND"
export const PREV_ROUND = "PREV_ROUND"
export const DELETE_PLAYER = "DELETE_PLAYER"
export const NEW_GAME = "NEW_GAME"
export const TOP_SCORE = "TOP_SCORE"
export const RESTART_ROUND = "RESTART_ROUND"
export const MOVE_PERSON = "MOVE_PERSON"
export const TOGGLE_EDIT_PLAYER_BOX = "TOGGLE_EDIT_PLAYER_BOX"
export const EDIT_THIS_PLAYER = "EDIT_THIS_PLAYER"
export const SAVE_EDITED_PLAYER = "SAVE_EDITED_PLAYER"

export const addPlayer= (player) => {
    return({type: ADD_PLAYER, payload: player})
}

export const addToPot = (num) => {
    return({type: ADD_TO_POT, payload: num})
}

export const bankPlayer = (id, num) => {
    return({type: BANK_PLAYER, payload: {id: Number(id), num: Number(num)}})
}

export const unBankPlayer = (id) => {
    return({type: UNBANK_PLAYER, payload: id})
}

export const nextRound = () => {
    return({type: NEXT_ROUND})
}

export const prevRound = () => {
    return({type: PREV_ROUND})
}

export const restartRound = () => {
    return({type: RESTART_ROUND})
}

export const deletePlayer = (id) => {
    return({type: DELETE_PLAYER, payload: id})
}

export const newGame = () => {
    return({type: NEW_GAME})
}

export const setTopScore = (num) => {
    return({type: TOP_SCORE, payload: num})
}

export const movePerson = (personId, hoveredId) => {

    return({type: MOVE_PERSON, payload: {personId: personId, hoveredId: hoveredId}})
}

export const toggleEditPlayerBox = () => {
    return({type: TOGGLE_EDIT_PLAYER_BOX})
}

export const editThisPlayer = (player) => {
    return({type: EDIT_THIS_PLAYER, payload: player})
}

export const saveEditedPlayer = (player) => {
    return({type: SAVE_EDITED_PLAYER, payload: player})
}