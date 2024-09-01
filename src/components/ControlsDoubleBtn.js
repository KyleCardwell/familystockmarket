import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addToPot,
  nextRound,
  prevRound,
  newGame,
  restartRound,
  updateMarketCrashNums,
  setMarketCrashNums,
  applyMarketCrash,
  updateMarketCrashValue,
  applyMarketSurge,
  updateMarketSurgeValue,
} from "../actions";
import { generateRandomNumber } from "../helpers";

const initialDice = {
  dice1: "",
};

const ControlsDoubleBtn = (props) => {
  const dispatch = useDispatch();
  const [diceRoll, setDiceRoll] = useState(initialDice);
  const [marketCrashLive, setMarketCrashLive] = useState(true);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [randomDice, setRandomDice] = useState([0, 0]);

  const marketShiftValue = useSelector((state) => state.marketShiftValue);
  const marketCrashSingle = useSelector((state) => state.crashAndSurge[0]);
  const marketSurgeSingle = useSelector((state) => state.crashAndSurge[1]);

  // const currentRound = useSelector(state => state.currentRound);

  // const marketHasCrashed = () => {
  //   if (
  //     marketCrashNums[0].checked === true &&
  //     parseInt(diceRoll.dice1.slice(1), 10) === marketCrashNums[1].value
  //   ) {
  //     return true;
  //   } else if (
  //     marketCrashNums[1].checked === true &&
  //     parseInt(diceRoll.dice1.slice(1), 10) === marketCrashNums[0].value
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  const marketHasCrashed = () => {
    return marketCrashSingle === parseInt(diceRoll.dice1.slice(1));
  };

  const marketHasSurged = () => {
    return marketSurgeSingle === parseInt(diceRoll.dice1.slice(1));
  };

  const getRankedPlayerNames = (players, targetRank) => {
    // Filter players with the target rank and map to get their names
    const rankedPlayerNames = players
      .filter((player) => player.rank === targetRank)
      .map((player) => player.name);

    let result;

    // Check the number of players with the target rank and format the string accordingly
    if (rankedPlayerNames.length === 1) {
      result = rankedPlayerNames[0];
    } else if (rankedPlayerNames.length === 2) {
      result = rankedPlayerNames.join(" & ");
    } else if (rankedPlayerNames.length > 2) {
      result =
        rankedPlayerNames.slice(0, -1).join(", ") +
        " & " +
        rankedPlayerNames.slice(-1);
    }

    return result;
  };

  const handleChange = (e) => {
    if (
      // (e.target.value > -1 && e.target.value < 13) ||
      // e.target.value === "d" ||
      // e.target.value === "D"
      /^[1-9]$|^1[0-2]$/.test(e.target.value) ||
      e.target.value === "d" ||
      e.target.value === "D" ||
      /^[dD][1-6]$/.test(e.target.value) ||
      e.target.value === ""
    ) {
      setDiceRoll({
        ...diceRoll,
        [e.target.name]: e.target.value,
      });

      // if (e.target.name === "dice1" && e.target.value !== "") {
      //     document.getElementById("diceRoll2").focus()
      // } else if (e.target.name === "dice2" & e.target.value !== "") {
      //     document.getElementById("diceRoll").focus()
      // }

      document.getElementById("diceRoll").focus();
    }
  };

  const handleDiceRoll = () => {
    const num1 = generateRandomNumber();
    const num2 = generateRandomNumber();

    setRandomDice([num1, num2]);
    document.getElementById("diceRoll").focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(
    //   updateMarketCrashValue(
    //     marketShiftValue +
    //       Math.floor(((props.currentRound + 5) / 100) * props.currentPot)
    //   )
    // );

    if (
      (diceRoll.dice1 === "D" || diceRoll.dice1 === "d") &&
      props.currentRoll > 3 &&
      marketCrashLive
    ) {
      alert("Please include a number for the double, ex: d3");
    } else if (diceRoll.dice1 !== "") {
      if (
        Number(diceRoll.dice1) === 7 &&
        props.currentRound === 20 &&
        props.currentRoll > 3
      ) {
        alert(
          `Oh no! Not another 7! Game Over! ${getRankedPlayerNames(
            props.players,
            1
          )} Won!`
        );
      } else if (
        marketHasCrashed() &&
        props.currentRound === 20 &&
        props.currentRoll > 3
      ) {
        setFormIsSubmitted(true);
        dispatch(applyMarketCrash(marketShiftValue));
        // alert(
        //   `Oh no! Huge Maket Crash...Game Over! ${getRankedPlayerNames(
        //     props.players,
        //     1
        //   )} Won!`
        // );
      } else if (props.currentRoll <= 3) {
        if (
          diceRoll.dice1 === "d" ||
          diceRoll.dice1 === "D" ||
          /^[dD][1-6]$/.test(diceRoll.dice1)
        ) {
          props.addToPot(50);
        } else if (Number(diceRoll.dice1) === 7) {
          props.addToPot(70);
        } else {
          props.addToPot(Number(diceRoll.dice1));
        }
      } else if (Number(diceRoll.dice1) === 7) {
        alert("Whoops! Someone Rolled a 7...starting next round!");
        props.nextRound();
        props.setMarketCrashNums();
        document.getElementById("diceRoll").focus();
      } else if (
        diceRoll.dice1.slice(0, 1) === "d" ||
        diceRoll.dice1.slice(0, 1) === "D"
      ) {
        if (marketCrashLive) {
          if (marketHasCrashed()) {
            dispatch(applyMarketCrash(marketShiftValue));
            props.nextRound();
            props.setMarketCrashNums();
            dispatch(updateMarketCrashValue());
            dispatch(updateMarketSurgeValue());
            alert(
              `Aw snap! The market took a bad turn... If you haven't banked yet, you lose ${marketShiftValue}%. Better luck next time!`
            );
            document.getElementById("diceRoll").focus();
          } else if (marketHasSurged()) {
            dispatch(applyMarketSurge(marketShiftValue));
            props.nextRound();
            props.setMarketCrashNums();
            dispatch(updateMarketCrashValue());
            dispatch(updateMarketSurgeValue());
            alert(
              `Hot dog! The market took jump... If you haven't banked yet, you gain ${marketShiftValue}%. Must be nice!`
            );
            document.getElementById("diceRoll").focus();
          } else {
            // dispatch(updateMarketCrashNums(diceRoll.dice1));
            props.addToPot(props.currentPot);
            // dispatch(updateMarketCrashValue(marketShiftValue + props.currentPot))
          }
        } else {
          props.addToPot(props.currentPot);
        }
      } else {
        props.addToPot(Number(diceRoll.dice1));
      }

      setDiceRoll(initialDice);
    }

    document.getElementById("diceRoll").focus();
  };

  // useEffect(() => {
  //   dispatch(updateMarketCrashValue(
  //     Math.floor(((props.currentRoll * 8) / 100) * props.currentPot)
  //   ))
  // }, [props.currentPot, props.currentRoll]);

  useEffect(() => {
    if (
      formIsSubmitted &&
      // marketHasCrashed() &&
      props.currentRound === 20 &&
      props.currentRoll > 3
    ) {
      alert(
        `Oh no! Huge Maket Crash...Game Over! ${getRankedPlayerNames(
          props.players,
          1
        )} Won!`
      );
      setFormIsSubmitted(false);
    }
  }, [formIsSubmitted, props.currentRoll, props.currentRound, props.players]);
  return (
    <div className="bg-gray-900 max-w-full rounded overflow-hidden shadow-lg p-5">
      <div className="flex-row-reverse justify-between mb-4">
        <h4 className="font-bold text-center">Controls</h4>
        <div className="flex-grow flex justify-between">
          <button
            type="button"
            className="border p-2 bg-white text-gray-900"
            onClick={() => {
              props.newGame();
              props.setMarketCrashNums();
              document.getElementById("diceRoll").focus();
            }}
          >
            New Game
          </button>
          {/* <div className="flex flex-row justify-between">
            <h2 className="mr-4">{randomDice[0]}</h2>
            <h2 className="mr-4">{randomDice[1]}</h2>
            <button onClick={handleDiceRoll}>Roll Dice</button>
          </div> */}
          <button
            type="button"
            className="p-2 bg-indigo-900 text-gray-400"
            onClick={() => {
              setMarketCrashLive((prev) => !prev);
            }}
          >
            {`Turn ${marketCrashLive ? "off" : "on"} Market Shift`}
          </button>
        </div>
      </div>

      <div className="flex justify-evenly text-center">
        <div className="border w-1/3">
          <div className="border p-2">
            <h4 className="text-2xl">{props.currentRoll}</h4>
            <h5>Current Roll</h5>
          </div>
          {props.currentRoll <= 3 ? (
            <div className="p-2">
              <p>No one can bank until after roll 3</p>
              <p className="mt-2">Doubles are worth 50</p>
              <p className="mt-2">7 is worth 70</p>
            </div>
          ) : (
            ""
          )}
          {props.currentRoll > 3 ? (
            <div className="p-2">
              <p>Doubles will double the current pot</p>
              <p className="mt-2">7 will end the round</p>
              {marketCrashLive && <p className="mt-2">Maket surge or crash will end the round</p>}
              {!marketCrashLive && <p className="mt-2">_</p>}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="border w-1/5">
          <div className="border p-2">
            <h4 className="text-2xl">{props.currentPot}</h4>
            <h5>Current Pot</h5>
          </div>
          <form onSubmit={handleSubmit} className="p-2 flex justify-evenly">
            <input
              autoFocus
              type="text"
              name="dice1"
              id="diceRoll"
              value={diceRoll.dice1 || ""}
              size="6"
              placeholder="score"
              onChange={handleChange}
              onFocus={(e) => e.target.select()}
              className="border text-black h-14 text-center"
            />

            <button type="submit" className="p-2 bg-white text-gray-900">
              Submit
            </button>
          </form>
          <p>Type sum of 2 dice</p>
          <p>{`or "d${marketCrashLive ? "#" : ""}" for doubles`}</p>
        </div>
        <div className="flex-col border">
          <div className="border p-2">
            <h4 className="text-2xl">{props.currentRound}</h4>
            <h5>Current Round</h5>
          </div>
          <div className="content-evenly p-2">
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  props.prevRound();
                  props.setMarketCrashNums();
                  document.getElementById("diceRoll").focus();
                }}
                className="flex-1 border-gray-900 p-1 bg-white text-gray-900 cursor-pointer"
              >
                Prev
              </div>

              <div
                onClick={() => {
                  props.nextRound();
                  props.setMarketCrashNums();
                  document.getElementById("diceRoll").focus();
                }}
                className="flex-1 border-gray-900 p-1 bg-white text-gray-900 cursor-pointer"
              >
                Next
              </div>
            </div>
            <div
              onClick={() => {
                props.restartRound();
                document.getElementById("diceRoll").focus();
              }}
              className="mt-2 border-gray-900 p-1 bg-white text-gray-900 cursor-pointer"
            >
              Restart Round
            </div>
          </div>
        </div>

        {marketCrashLive && (
          <div className="flex w-1/4">
            <div className="border">
              <div className="border p-2">
                <h4>Market Surge</h4>
                <p>if a double of this number is rolled:</p>
              </div>
              <div className="flex content-evenly border">
                <div
                  className={`flex-1 border font-bold text-center ${
                    marketSurgeSingle.checked && "bg-red-800"
                  }`}
                >
                  <h5 className="text-2xl">{marketSurgeSingle}</h5>
                </div>
              </div>
              <div className="inline-block align-middle flex flex-col">
                <p>You will earn:</p>
                <h5 className="flex-grow text-2xl">{marketShiftValue}%</h5>
              </div>
            </div>
            <div className="border">
              <div className="border p-2">
                <h4>Market Crash</h4>
                <p>if a double of this number is rolled:</p>
              </div>
              <div className="flex content-evenly border">
                <div
                  className={`flex-1 border font-bold text-center ${
                    marketCrashSingle.checked && "bg-red-800"
                  }`}
                >
                  <h5 className="text-2xl">{marketCrashSingle}</h5>
                </div>
                {/* <div
                className={`flex-1 border font-bold text-center ${
                  marketCrashNums[1].checked && "bg-red-800"
                }`}
              >
                <h5 className="text-2xl">{marketCrashNums[1].value}</h5>
              </div> */}
              </div>
              <div className="inline-block align-middle flex flex-col">
                <p>You will lose:</p>
                <h5 className="flex-grow text-2xl">{marketShiftValue}%</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPot: state.currentPot,
    currentRound: state.currentRound,
    currentRoll: state.currentRoll,
    players: state.players,
  };
};

export default connect(mapStateToProps, {
  addToPot,
  nextRound,
  prevRound,
  newGame,
  restartRound,
  setMarketCrashNums,
})(ControlsDoubleBtn);
