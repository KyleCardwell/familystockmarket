import React, { useState } from 'react';
import '../App.css';

// const initialState = {
//     name: "",
//     points: "",
//     isBanked: false,
// }

const PlayerCard = (props) => {

    const { id, name, points, isBanked } = props;

    return (
        <div className="player-card">
            <h2>
                {points}
            </h2>
            <h3>
                {name}
            </h3>
        </div>
    )
}


export default PlayerCard;