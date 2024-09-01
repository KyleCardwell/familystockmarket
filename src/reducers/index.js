import {
  ADD_PLAYER,
  ADD_TO_POT,
  APPLY_MARKET_CRASH,
  APPLY_MARKET_SURGE,
  BANK_PLAYER,
  DELETE_PLAYER,
  EDIT_THIS_PLAYER,
  MOVE_PERSON,
  NEW_GAME,
  NEXT_ROUND,
  PREV_ROUND,
  RESTART_ROUND,
  SAVE_EDITED_PLAYER,
  SET_MARKET_CRASH_NUMS,
  TOGGLE_EDIT_PLAYER_BOX,
  TOP_SCORE,
  UNBANK_PLAYER,
  UPDATE_MARKET_CRASH_NUMS,
  UPDATE_MARKET_CRASH_VALUE,
  UPDATE_MARKET_SURGE_VALUE,
} from "../actions";
import { fakePlayers } from "../components/fakePlayers";
import {
  generateRandomNumber,
  generateTwoDistinctRandomNumbers,
} from "../helpers";

// const generateRandomNumbers = () => {
//   return [
//     { value: Math.floor(Math.random() * 6) + 1, checked: false },
//     { value: Math.floor(Math.random() * 6) + 1, checked: false },
//   ];
// };

export const initialState = {
  players: [],
  currentPot: 0,
  currentRoll: 1,
  currentRound: 1,
  topScore: 0,
  showEditPlayerBox: false,
  editPlayer: { name: "" },
  marketCrashSingle: generateRandomNumber(),
  marketShiftValue: generateRandomNumber() * 10,
  marketSurgeSingle: generateRandomNumber(),
  crashAndSurge: generateTwoDistinctRandomNumbers(),
  // marketSurgeValue: generateRandomNumber() * 10,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case DELETE_PLAYER:
      const filtered = state.players.filter(
        (player) => Number(player.id) !== Number(action.payload)
      );
      return {
        ...state,
        players: filtered,
      };
    // case(BANK_PLAYER):

    //     const bankPlayers = state.players.map(player => {

    //         if(state.currentRoll > 3) {

    //             if(Number(player.id) === Number(action.payload.id)) {

    //                 if(player.isBanked === false) {

    //                     player.isBanked = true;
    //                     player.pointHistory[player.pointHistory.length - 1] = action.payload.num
    //                     player.points = player.pointHistory.reduce((sum, value) => {return sum + value}, 0)
    //                 }
    //             }
    //         }

    //         return player
    //     })

    case BANK_PLAYER:
      const bankPlayers = state.players.map((player) => {
        if (Number(player.id) === Number(action.payload.id)) {
          player.isBanked = true;
          player.pointHistory[player.pointHistory.length - 1] =
            action.payload.num;
          player.points = player.pointHistory.reduce((sum, value) => {
            return sum + value;
          }, 0);
        }

        return player;
      });
      return {
        ...state,
        players: bankPlayers,
      };
    case UNBANK_PLAYER:
      const unbankPlayers = state.players.map((player) => {
        if (Number(player.id) === Number(action.payload)) {
          player.isBanked = false;
          player.pointHistory[player.pointHistory.length - 1] = 0;
          player.points = player.pointHistory.reduce((sum, value) => {
            return sum + value;
          }, 0);
        }

        return player;
      });

      return {
        ...state,
        players: unbankPlayers,
      };
    case ADD_TO_POT:
      return {
        ...state,
        currentPot: Number(state.currentPot) + Number(action.payload),
        currentRoll: state.currentRoll + 1,
      };
    case NEXT_ROUND:
      return {
        ...state,
        currentPot: 0,
        currentRound:
          state.currentRound < 20 ? state.currentRound + 1 : state.currentRound,
        currentRoll: 1,
        players: state.players.map((player) => {
          return {
            ...player,
            isBanked: false,
            pointHistory:
              player.pointHistory.length <= state.currentRound
                ? [...player.pointHistory, 0]
                : [...player.pointHistory],
          };
        }),
        marketShiftValue: generateRandomNumber() * 10,
        crashAndSurge: generateTwoDistinctRandomNumbers(),
        // marketSurgeValue: generateRandomNumber() * 10,
      };
    case PREV_ROUND:
      return {
        ...state,
        currentPot: 0,
        currentRound:
          state.currentRound > 1 ? state.currentRound - 1 : state.currentRound,
        currentRoll: 1,
        players: state.players.map((player) => {
          return {
            ...player,
            isBanked: false,
            // pointHistory: [...player.pointHistory, 0]
          };
        }),
        marketShiftValue: generateRandomNumber() * 10,
        crashAndSurge: generateTwoDistinctRandomNumbers(),
        // marketSurgeValue: generateRandomNumber() * 10,
      };
    case RESTART_ROUND:
      return {
        ...state,
        currentPot: 0,
        currentRoll: 1,
        currentRound: state.currentRound,
        players: state.players.map((player) => {
          if (player.isBanked === true) {
            player.isBanked = false;
            player.pointHistory[player.pointHistory.length - 1] = 0;
            player.points = player.pointHistory.reduce((sum, value) => {
              return sum + value;
            }, 0);
          }

          return player;
        }),
        marketShiftValue: generateRandomNumber() * 10,
        crashAndSurge: generateTwoDistinctRandomNumbers(),
        // marketSurgeValue: generateRandomNumber() * 10,
        // marketCrashSingle: state.marketCrashSingle.map(number => {
        //   number.checked = false
        //   return number;
        // })
      };
    case NEW_GAME:
      return {
        ...state,
        currentPot: 0,
        currentRoll: 1,
        currentRound: 1,
        players: state.players.map((player) => {
          return {
            ...player,
            isBanked: false,
            pointHistory: [0],
            points: 0,
          };
        }),
        marketShiftValue: generateRandomNumber() * 10,
        // marketSurgeValue: generateRandomNumber() * 10,
        crashAndSurge: generateTwoDistinctRandomNumbers(),
      };
    case TOP_SCORE:
      return {
        ...state,
        topScore: action.payload,
      };
    case MOVE_PERSON:
      const moving = state.players.find(
        (person) => person.id === action.payload.personId
      );
      const moveToIndex = state.players.findIndex(
        (person) => person.id === action.payload.hoveredId
      );

      const playerTakenOut = state.players.filter(
        (player) => player.id !== action.payload.personId
      );

      playerTakenOut.splice(moveToIndex, 0, moving);

      console.log("player taken out ", playerTakenOut);

      return {
        ...state,
        players: playerTakenOut,
      };
    case TOGGLE_EDIT_PLAYER_BOX:
      return {
        ...state,
        showEditPlayerBox: !state.showEditPlayerBox,
      };

    case EDIT_THIS_PLAYER:
      return {
        ...state,
        editPlayer: action.payload,
      };

    case SAVE_EDITED_PLAYER:
      let playerIndex = state.players.findIndex((player) => {
        return player.id === action.payload.id;
      });

      state.players.splice(playerIndex, 1, action.payload);

      return {
        ...state,
      };

    case SET_MARKET_CRASH_NUMS:
      return {
        ...state,
        marketCrashSingle: generateRandomNumber(),
        marketSurgeSingle: generateRandomNumber(),
      };

    case UPDATE_MARKET_CRASH_NUMS:
      const input = action.payload;
      const numberToCheck = parseInt(input.slice(1), 10);

      const numbersCopy = [...state.marketCrashSingle];

      for (let obj of numbersCopy) {
        if (obj.value === numberToCheck && obj.checked === false) {
          obj.checked = true;
          break;
        }
      }

      return {
        ...state,
        marketCrashSingle: numbersCopy,
        marketSurgeSingle: numbersCopy,
      };

    case APPLY_MARKET_CRASH:
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.isBanked === false) {
            player.pointHistory[player.pointHistory.length - 1] = -Math.ceil(
              player.points * (action.payload / 100)
            );
            player.points = player.pointHistory.reduce((sum, value) => {
              return sum + value;
            }, 0);
          }
          return player;
        }),
      };

    case UPDATE_MARKET_CRASH_VALUE:
      return {
        ...state,
        marketShiftValue: generateRandomNumber() * 10,
        crashAndSurge: generateTwoDistinctRandomNumbers(),
      };

    case APPLY_MARKET_SURGE:
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.isBanked === false) {
            player.pointHistory[player.pointHistory.length - 1] = Math.ceil(
              player.points * (action.payload / 100)
            );
            player.points = player.pointHistory.reduce((sum, value) => {
              return sum + value;
            }, 0);
          }
          return player;
        }),
      };

    case UPDATE_MARKET_SURGE_VALUE:
      return {
        ...state,
        marketSurgeValue: generateRandomNumber() * 10,
        crashAndSurge: generateTwoDistinctRandomNumbers(),
      };

    default:
      return state;
  }
};
