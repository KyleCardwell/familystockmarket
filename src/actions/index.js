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
export const SET_MARKET_CRASH_NUMS = "SET_MARKET_CRASH_NUMS"
export const UPDATE_MARKET_CRASH_NUMS = "UPDATE_MARKET_CRASH_NUMS"
export const APPLY_MARKET_CRASH = "APPLY_MARKET_CRASH"
export const UPDATE_MARKET_CRASH_VALUE = "UPDATE_MARKET_CRASH_VALUE"
export const APPLY_MARKET_SURGE = "APPLY_MARKET_SURGE"
export const UPDATE_MARKET_SURGE_VALUE = "UPDATE_MARKET_SURGE_VALUE"
export const UPDATE_MARKET_SHIFT_VALUE = "UPDATE_MARKET_SHIFT_VALUE"

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

export const setMarketCrashNums = () => {
    return({type: SET_MARKET_CRASH_NUMS})
}

export const updateMarketCrashNums = (number) => {
    return({type: UPDATE_MARKET_CRASH_NUMS, payload: number})
}

export const applyMarketCrash = (pointsLost) => {
    return ({type: APPLY_MARKET_CRASH, payload: pointsLost})
}

export const updateMarketCrashValue = (points) => {
    return ({type: UPDATE_MARKET_CRASH_VALUE, payload: points})
}

export const applyMarketSurge = (pointsWon) => {
    return ({type: APPLY_MARKET_SURGE, payload: pointsWon})
}

export const updateMarketSurgeValue = (points) => {
    return ({type: UPDATE_MARKET_SURGE_VALUE, payload: points})
}

export const updateMarketShiftValue = () => {
    return ({type: UPDATE_MARKET_SHIFT_VALUE})
}