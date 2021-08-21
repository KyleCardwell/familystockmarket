import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToPot, nextRound, newGame } from '../actions';

const Controls = (props) => {

    const [ diceRoll, setDiceRoll ] = useState()

    const handleChange= (e) => {
        setDiceRoll(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addToPot(diceRoll);
        setDiceRoll("")
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
                            type="number"
                            name="diceRoll"
                            id="diceRoll"
                            value={diceRoll || ""}
                            placeholder="Enter Dice Roll Here"
                            onChange={handleChange}
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