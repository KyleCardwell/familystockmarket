import React, { useState } from 'react';
import { connect } from 'react-redux';

import { bankPlayer, unBankPlayer, deletePlayer } from '../actions'

import '../App.css';

// const initialState = {
//     name: "",
//     points: "",
//     isBanked: false,
// }

const PlayerCard = (props) => {

    const { id, name, points, isBanked, currentPot } = props;

    const [showEdit, setShowEdit ] = useState(false)

    const handleClick = () => {
        if(isBanked === false) {

            props.bankPlayer(id, currentPot)
            document.getElementById("diceRoll").focus();

        } else {
            
            props.unBankPlayer(id)
            document.getElementById("diceRoll").focus();
        }
    }

    const handleShowEdit = () => {
        setShowEdit(true)
        
    }

    const handleHideEdit = () => {
        setShowEdit(false)
        document.getElementById("diceRoll").focus();
    }

    const handleDelete = () => {
        props.deletePlayer(id)
        document.getElementById("diceRoll").focus();
    }

    return (
        <div 
            className={isBanked ? "player-card banked" : "player-card"}
            onClick={handleClick}
            onMouseEnter={handleShowEdit}
            onMouseLeave={handleHideEdit}
        >
            <h2>
                {points}
            </h2>
            <h3>
                {name}
            </h3>
            <div className={showEdit ? "player-edit-btn" : "player-edit-btn-hide"}>Edit</div>
            <div
                className={showEdit ? "player-edit-btn" : "player-edit-btn-hide"}
                onClick={handleDelete}
            >Delete</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        currentPot: state.currentPot,
    })
}

export default connect(mapStateToProps, {bankPlayer, unBankPlayer, deletePlayer})(PlayerCard);