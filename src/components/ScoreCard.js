import React from 'react';

const ScoreCard = (props) => {

    return(
        <div className={`border p-1 flex justify-evenly`}>
            <h4>{props.name}</h4>
            <h4>{props.points}</h4>
        </div>
    )
}

export default ScoreCard;