import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToPot } from '../actions';

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
        <div className="controls">

            <h4>Controls</h4>
            
            <div>
                <h4>{props.currentPot}</h4>
            </div>

            <div className="control-btns">
                <form onSubmit={handleSubmit}>

                    <input
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

        </div>
    )
    
}

const mapStateToProps = (state) => {
    return({
        currentPot: state.currentPot,
    })
}

export default connect(mapStateToProps, {addToPot})(Controls);