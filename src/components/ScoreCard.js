import React from 'react';

const ScoreCard = (props) => {

    return(
        <div className="score-card">
            <h4>{props.name}</h4>
            <h4>{props.points}</h4>
        </div>
    )
}

export default ScoreCard;