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
            className={`cursor-pointer text-center h-px114 w-1/12 border group p-2 ${isBanked ? "bg-red-800" : ""}`}
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
            <div
                className={showEdit ? "block" : "hidden group-hover:block"}
            >Edit</div>
            <div
                className={`${showEdit ? "block" : "hidden group-hover:block"}`}
                onClick={handleDelete}
            >Delete</div>
            <div
                className={`text-gray-900 ${showEdit ? "hidden group-hover:block" : ""}`}
            >_</div>
            <div
                className={`text-gray-900 ${showEdit ? "hidden group-hover:block" : ""}`}
            >_</div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        currentPot: state.currentPot,
    })
}

export default connect(mapStateToProps, {bankPlayer, unBankPlayer, deletePlayer})(PlayerCard);