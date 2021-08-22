import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToPot, nextRound, newGame } from '../actions';

const Controls = (props) => {

    const [ diceRoll, setDiceRoll ] = useState()
    const [ diceRoll2, setDiceRoll2 ] = useState()

    const handleChange= (e) => {
        setDiceRoll(e.target.value)
    }

    const handleChange2= (e) => {
        setDiceRoll2(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.currentRoll <= 3){
            if(Number(diceRoll) === Number(diceRoll2)){
                props.addToPot(50)
            } else if(Number(diceRoll) + Number(diceRoll2) === 7){
                props.addToPot(70)
            } else {
                props.addToPot(Number(diceRoll) + Number(diceRoll2))
            }
        } else if(Number(diceRoll) + Number(diceRoll2) === 7){
            props.nextRound();
        } else if(Number(diceRoll) === Number(diceRoll2)){
            props.addToPot(props.currentPot)
        } else {
            props.addToPot(Number(diceRoll) + Number(diceRoll2))
        }

        setDiceRoll("")
        setDiceRoll2("")

        document.getElementById("diceRoll").focus();

    }

    return (
        <div className="controls-header">

            <div className="controls-title">
                <h4>Controls</h4>
                <button 
                    type="button" 
                    className="newGameBtn"
                    onClick={() => props.newGame()}
                >New Game</button>
            </div>
            
            <div className="controls">

                <div>
                    <h4>{props.currentRoll}</h4>
                    <h5>Current Roll</h5>
                </div>

                <div className="control-btns">
                    <div>
                        <h4>{props.currentPot}</h4>
                        <h5>Current Pot</h5>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <input autoFocus
                            type="text"
                            name="diceRoll"
                            id="diceRoll"
                            value={diceRoll || ""}
                            size="3"
                            placeholder="Enter Dice Roll Here"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="diceRoll2"
                            id="diceRoll2"
                            value={diceRoll2 || ""}
                            size="3"
                            placeholder="Enter Dice Roll Here"
                            onChange={handleChange2}
                        />
                        
                        <button type="submit">Submit</button>
                    </form>

                </div>
                <div>

                    <h4>{props.currentRound}</h4>
                    <h5>Current Round</h5>
                    <button type="button" onClick={props.nextRound}>Next Round</button>
                </div>
            </div>

        </div>
    )
    
}

const mapStateToProps = (state) => {
    return({
        currentPot: state.currentPot,
        currentRound: state.currentRound,
        currentRoll: state.currentRoll,
    })
}

export default connect(mapStateToProps, {addToPot, nextRound, newGame})(Controls);