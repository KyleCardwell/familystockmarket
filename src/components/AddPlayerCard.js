import React, {useState} from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions';

let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(10)
            .substring(1);
    }

    return s4() + s4() + s4();
}



const AddPlayerCard = (props) => {

    const { addPlayer } = props;

    const [ newPlayer, setNewPlayer ] = useState("")

    const [ visible, setVisible ] = useState(false)
    
    const handleChange = (e) => {
        setNewPlayer(e.target.value)
    }

    const toggleForm = () => {
        setVisible(!visible)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const playerToAdd = {
            id: guid(),
            name: newPlayer,
            points: 0,
            pointHistory: [],
            isBanked: false,
        }
        addPlayer(playerToAdd);
        setNewPlayer("");
        toggleForm();

        document.getElementById("diceRoll").focus();

    }

    return (
        <div className="player-card">
            <div onClick={toggleForm}>
                Add Player            
            </div>
            {visible ?
                <form 
                    className="addPlayerForm"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="newPlayer">Name:</label>
                    <input autoFocus
                        type="text"
                        name="newPlayer"
                        className="newPlayer"
                        value={newPlayer}
                        onChange={handleChange}
                        size="15"
                    />
                    <button 
                        type="submit"
                    >Add</button>
                </form> : "" }
        </div>
    )
}



export default connect(null, { addPlayer })(AddPlayerCard);