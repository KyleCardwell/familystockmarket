import React, { useState } from 'react';
import { connect } from 'react-redux';

import { bankPlayer, unBankPlayer, deletePlayer } from '../actions'

import { useDrag } from 'react-dnd';

import '../App.css';

// const initialState = {
//     name: "",
//     points: "",
//     isBanked: false,
// }

const PlayerCard = (props) => {

    const { id, name, points, isBanked, currentPot } = props;

    const [showEdit, setShowEdit ] = useState(false)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

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
            ref={drag}
            className={`border text-center h-px114 w-1/12`}>
            <div className='border-b cursor-move'>
                Click to Drag
                
            </div>


            <div 
                className={`cursor-pointer group p-2 ${isBanked ? "bg-red-800 hover:bg-red-600" : ""} hover:bg-gray-800`}
                onClick={handleClick}
                onMouseEnter={handleShowEdit}
                onMouseLeave={handleHideEdit}
            >
                <h2 className="font-bold text-xl">
                    {points}
                </h2>
                <h3 className="font-bold text-xl">
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        currentPot: state.currentPot,
    })
}

export default connect(mapStateToProps, {bankPlayer, unBankPlayer, deletePlayer})(PlayerCard);