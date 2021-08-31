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
        <div className="w-1/12 flex-row border p-2 justify-evenly">
            <div onClick={toggleForm} className="text-center align-middle">
                {visible ? "Cancel" : "Add Player" }            
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
                        className="w-full text-center text-black"
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