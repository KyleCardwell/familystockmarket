import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { toggleEditPlayerBox, saveEditedPlayer, bankPlayer, unBankPlayer } from '../actions'
import EditPlayerScoreCard from './EditPlayerScoreCard';

const EditPlayerCard = (props) => {
    
    const [ playerName, setPlayerName ] = useState(props.editPlayer.name)

    useEffect(() => {
        setPlayerName(props.editPlayer.name)
    }, [props])

    const handleChange = (e) => {
        setPlayerName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleSave = (e) => {
        e.preventDefault()

        const newScores = document.getElementsByName("editRoundScore")
        const newPointHistory = []

        for(let i = 1; i < newScores.length + 1; i++) {
            newPointHistory.push(Number(document.getElementById(`Round${i}Score`).value))
        }
      
        const editedPlayer = {
            ...props.editPlayer,
            name: playerName,
            pointHistory: newPointHistory
        }

        props.saveEditedPlayer(editedPlayer)

        if(editedPlayer.pointHistory[editedPlayer.pointHistory.length - 1] > 0) {
            props.bankPlayer(editedPlayer.id, newPointHistory[newPointHistory.length - 1])
        } else {
            props.unBankPlayer(editedPlayer.id)
        }

        props.toggleEditPlayerBox()
    }
    
    return props.showEditPlayerBox ? ( 
        <div className="flex flex-col border p-2"> 
            <div>

                <div className='flex justify-between'>
                    <p>Edit Player</p>
                    <p 
                        className='cursor-pointer'
                        onClick={props.toggleEditPlayerBox}
                    >Close</p>
                </div>
                <form
                    className='m-2'
                    onSubmit={handleSubmit}
                >
                    <input autoFocus
                            type="text"
                            name="editPlayerName"
                            className="text-center text-black mx-2"
                            value={playerName}
                            onChange={handleChange}
                            size="15"
                    >
                    </input>
                    <div id="playerPoints" className='flex flex-wrap'>
                        {props.editPlayer.pointHistory.map((score, index) => {
                            return (
                                <EditPlayerScoreCard
                                    key={index}
                                    round={index + 1}
                                    roundPoints={score}                    
                                />
                            )
                        })}
                    </div>
                    <div className='flex justify-end'>
                        <p 
                            className='cursor-pointer'
                            onClick={handleSave}
                        >Save</p>
                    </div>
                </form>

            </div>

        </div>
    ) : null
}

const mapStateToProps = state => {
    return({
        showEditPlayerBox: state.showEditPlayerBox,
        editPlayer: state.editPlayer,
        currentRoll: state.currentRoll,
        players: state.players
    })
}


export default connect(mapStateToProps, { toggleEditPlayerBox, saveEditedPlayer, bankPlayer, unBankPlayer })(EditPlayerCard);