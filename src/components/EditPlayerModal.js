import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { toggleEditPlayerBox } from '../actions'
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
                </form>

            </div>
            <div className='flex flex-wrap'>
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
                        onClick={props.toggleEditPlayerBox}
                    >Save</p>
                </div>

        </div>
    ) : null
}

const mapStateToProps = state => {
    return({
        showEditPlayerBox: state.showEditPlayerBox,
        editPlayer: state.editPlayer
    })
}


export default connect(mapStateToProps, { toggleEditPlayerBox })(EditPlayerCard);