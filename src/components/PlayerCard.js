import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toggleBanked, bankPlayer, unBankPlayer } from '../actions'

import '../App.css';

// const initialState = {
//     name: "",
//     points: "",
//     isBanked: false,
// }

const PlayerCard = (props) => {

    const { id, name, points, isBanked, currentPot } = props;

    const handleClick = () => {
        if(isBanked === false) {

            props.bankPlayer(id, currentPot)

        } else {
            
            props.unBankPlayer(id)
        }
    }

    return (
        <div 
            className={isBanked ? "player-card banked" : "player-card"}
            onClick={handleClick}
        >
            <h2>
                {points}
            </h2>
            <h3>
                {name}
            </h3>
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        currentPot: state.currentPot,
    })
}

export default connect(mapStateToProps, {toggleBanked, bankPlayer, unBankPlayer})(PlayerCard);