import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { bankPlayer, unBankPlayer, deletePlayer, movePerson, toggleEditPlayerBox, editThisPlayer } from '../actions'

import { useDrag, useDrop } from 'react-dnd';

import '../App.css';

// const initialState = {
//     name: "",
//     points: "",
//     isBanked: false,
// }

const PlayerCard = (props) => {

    const { id, name, points, isBanked, currentPot, index, movePerson, status } = props;

    const [showEdit, setShowEdit ] = useState(false)

    const ref = useRef(null);

    // check which item is being dragged
    const [, drag] = useDrag(() => ({
        type: "div",
        item: {
            id: id,
            created: "NOW"
        },
        // collect: (monitor) => ({
        //     isDragging: !!monitor.isDragging(),
        // })
        
    }))

    // Rearrange names in list

    const [, drop] = useDrop({
        accept: "div",
        hover(item, monitor) {

            if (item.id === id) {
                return
            }

            movePerson(item.id, id)
            

        }

    })

    drag(ref)
    drop(ref)


    const handleClick = () => {
        if(isBanked === false) {

            if(props.currentRoll > 3) {

            props.bankPlayer(id, currentPot)
            document.getElementById("diceRoll").focus();
            }

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

    const handleClickEdit = () => {
        let playerToEdit = props.players.filter(player => player.id === id)[0]
        props.editThisPlayer(playerToEdit)
        props.toggleEditPlayerBox()
    }

    return (

        <div 
            ref={ref}
            className={`border text-center h-px114 w-1/12 box-border`}>
            <div className='border-b cursor-move'>
                
            </div>


            <div 
                className={`cursor-pointer group p-2 ${isBanked ? "bg-red-800 hover:bg-red-600" : ""} hover:bg-gray-800`}
                onMouseEnter={handleShowEdit}
                onMouseLeave={handleHideEdit}
                >
                <div
                    onClick={handleClick}
                >

                <h2 className="font-bold text-xl">
                    {points}
                </h2>
                <h3 className="font-bold text-xl">
                    {name}
                </h3>
                </div>
                <div
                    className={showEdit ? "block" : "hidden group-hover:block"}
                    onClick={handleClickEdit}
                >Edit</div>
                <div
                    className={`${showEdit ? "block" : "hidden group-hover:block"}`}
                    onClick={handleDelete}
                >Delete</div>
                <div
                    className={`text-gray-900 ${showEdit ? "hidden group-hover:block" : ""} ${isBanked ? "text-red-800" : ""}`}
                >_</div>
                <div
                    className={`text-gray-900 ${showEdit ? "hidden group-hover:block" : ""} ${isBanked ? "text-red-800" : ""}`}
                >_</div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        currentPot: state.currentPot,
        players: state.players,
        currentRoll: state.currentRoll
    })
}

export default connect(mapStateToProps, {bankPlayer, unBankPlayer, deletePlayer, movePerson, toggleEditPlayerBox, editThisPlayer})(PlayerCard);