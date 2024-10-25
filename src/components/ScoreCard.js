import React from "react";

const ScoreCard = (props) => {
  const { handleClick, showCalc } = props;

  return (
    <div className={`border p-1 flex justify-between hover:bg-gray-800`}>
      <h4 className="w-1/5">{props.rank}</h4>
      <h4 className="w-1/5">{props.name}</h4>
      <h4
        className={`w-1/5 text-center ${showCalc ? "cursor-pointer border bg-blue-800" : ""}`}
        onClick={() => handleClick(props.points)}
      >
        {props.points}
      </h4>
      <h4 className="w-1/5 text-center">
        {props.isBanked ? "-" : props.ifBank}
      </h4>
      <h4 className="w-1/5 text-center">
        {props.topScore === props.points ? "-" : props.behind1st}
      </h4>
    </div>
  );
};

export default ScoreCard;
