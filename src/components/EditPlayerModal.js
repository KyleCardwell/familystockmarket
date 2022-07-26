import React, {useState} from 'react';
import { connect } from 'react-redux';
import { toggleEditPlayerBox } from '../actions'

const EditPlayerCard = (props) => {

    const [ playerName, setPlayerName ] = useState()

    const handleChange = (e) => {
        setPlayerName(e.target.value)
    }
    
    return props.showEditPlayerBox ? ( 
        <div className="border p-2 h-32 w-64"> 

            <div className='flex justify-between'>
                <p>Edit Player</p>
                <p 
                    className='cursor-pointer'
                    onClick={props.toggleEditPlayerBox}
                >Close</p>
            </div>
            <form>
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
    ) : null
}

const mapStateToProps = state => {
    return({
        showEditPlayerBox: state.showEditPlayerBox
    })
}


export default connect(mapStateToProps, { toggleEditPlayerBox })(EditPlayerCard);