import React from 'react';

const ScoreCard = (props) => {

    return(
        <div className={`border p-1 flex justify-between`}>
            <h4 className="w-1/4">{props.name}</h4>
            <h4 className="w-1/4 text-center">{props.points}</h4>
            <h4 className="w-1/4 text-center">{props.isBanked ? "-" : props.ifBank}</h4>
            <h4 className="w-1/4 text-center">{props.topScore === props.points ? "-" : props.behind1st}</h4>

        </div>
    )
}

export default ScoreCard;