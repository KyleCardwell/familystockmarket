import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToPot, nextRound, newGame } from '../actions';

const initialDice = {
    dice1: "",
    dice2: "",
}

const Controls = (props) => {

    const [ diceRoll, setDiceRoll ] = useState(initialDice)

    const handleChange= (e) => {
        setDiceRoll({
            ...diceRoll,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        if(diceRoll.dice1 !== "" && diceRoll.dice2 !== "") {
            
            if(props.currentRoll <= 3){

                if(Number(diceRoll.dice1) === Number(diceRoll.dice2)){

                    props.addToPot(50)

                } else if(Number(diceRoll.dice1) + Number(diceRoll.dice2) === 7){

                    props.addToPot(70)

                } else {

                    props.addToPot(Number(diceRoll.dice1) + Number(diceRoll.dice2))

                }

            } else if(Number(diceRoll.dice1) + Number(diceRoll.dice2) === 7){

                alert("Whoops! Someone Rolled a 7...starting next round!")
                props.nextRound();
                document.getElementById("diceRoll").focus();

            } else if(Number(diceRoll.dice1) === Number(diceRoll.dice2)){

                props.addToPot(props.currentPot)

            } else {

                props.addToPot(Number(diceRoll.dice1) + Number(diceRoll.dice2))
            }

            setDiceRoll(initialDice)
            
        }
        
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

                <div className="control-display">
                    <h4>{props.currentRoll}</h4>
                    <h5>Current Roll</h5>
                    {props.currentRoll <= 3 ? <div><p>No one can bank until after roll 3</p><p>Doubles are worth 50</p><p>7 is worth 70</p></div> : ""}
                    {props.currentRoll > 3 ? <div><p>Doubles will double the current pot</p><p>7 will end the round</p></div> : ""}
                </div>

                <div className="control-btns control-display">
                    <div>
                        <h4>{props.currentPot}</h4>
                        <h5>Current Pot</h5>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <input autoFocus
                            type="text"
                            name="dice1"
                            id="diceRoll"
                            value={diceRoll.dice1 || ""}
                            size="3"
                            placeholder="dice 1"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="dice2"
                            id="diceRoll2"
                            value={diceRoll.dice2 || ""}
                            size="3"
                            placeholder="dice 2"
                            onChange={handleChange}
                        />
                        
                        <button type="submit">Submit</button>
                    </form>

                </div>
                <div className="control-display">

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