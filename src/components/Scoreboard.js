import React, { useState } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import { setTopScore, nextRound } from "../actions";

const Scoreboard = (props) => {
  const { players } = props;

  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [difference, setDifference] = useState(null);
  const [showCalc, setShowCalc] = useState(false);

  const handleClick = (number) => {
    if (firstNumber === null) {
      setFirstNumber(number);
    } else if (secondNumber === null) {
      setSecondNumber(number);
      const diff = Math.abs(number - firstNumber);
      setDifference(diff);
    } else {
      // Reset the selection to start over
      setFirstNumber(number);
      setSecondNumber(null);
      setDifference(null);
    }
  };

  const sorted = [...players];

  sorted.sort(function (a, b) {
    return b.points - a.points;
  });

  let playerRank = 1;

  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      sorted[i].rank = playerRank;
      continue;
    }

    if (sorted[i].points === sorted[i - 1].points) {
      sorted[i].rank = playerRank;
    } else {
      playerRank++;
      sorted[i].rank = playerRank;
    }
  }

  if (sorted.length > 0) {
    props.setTopScore(sorted[0].points);
  }

  if (sorted.length > 0 && sorted.every((player) => player.isBanked === true)) {
    alert("Looks like everyone has banked...Moving on to next round!");
    props.nextRound();
  }

  return (
    <section className="bg-gray-900 rounded overflow-y-scroll shadow-lg p-5 h-full">
      {showCalc &&
        (!firstNumber ? (
          <div className="flex flex-row border justify-around difference">
            <p className="text-gray-400">Choose 2 numbers to see their difference</p>
          </div>
        ) : (
          <div className="flex flex-row border justify-around difference">
            <p>{firstNumber}</p>
            <p>{secondNumber}</p>
            <p>=</p>
            <p>{difference}</p>
          </div>
        ))}

      <div className="relative border">
        <div
          className="absolute top-0 left-0 font-bold bg-blue-800 px-3 cursor-pointer"
          onClick={() =>
            setShowCalc((prev) => {
              if (prev === false) {
                setFirstNumber(null);
                setSecondNumber(null);
                setDifference(null);
              }
              return !showCalc;
            })
          }
        >
          =
        </div>
        <div className="flex justify-center items-center">
          <h4 className="font-bold text-center">Scoreboard</h4>
        </div>
      </div>

      <div className="flex justify-between font-bold border">
        <h4 className="w-1/5 text-center flex items-end">Rank</h4>
        <h4 className="w-1/5 text-center flex items-end">Name</h4>
        <h4 className="w-1/5 text-center flex items-end">Score</h4>
        <h4 className="w-1/5 text-center flex items-end">+Bank</h4>
        <h4 className="w-1/5 text-center flex items-end">Behind 1st</h4>
      </div>

      <div className={`flex-row`}>
        {sorted.map((person) => {
          return (
            <ScoreCard
              key={person.id}
              id={person.id}
              name={person.name}
              rank={person.rank}
              points={person.points}
              isBanked={person.isBanked}
              behind1st={props.topScore - person.points}
              ifBank={person.points + props.currentPot}
              topScore={props.topScore}
              handleClick={handleClick}
              showCalc={showCalc}
            />
          );
        })}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
    topScore: state.topScore,
    currentPot: state.currentPot,
    currentRound: state.currentRound,
  };
};

export default connect(mapStateToProps, { setTopScore, nextRound })(Scoreboard);
