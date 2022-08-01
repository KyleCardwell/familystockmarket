import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

const EditPlayerScoreCard = (props) => {

    const { round, roundPoints } = props
    
    const [ roundScore, setRoundScore ] = useState(roundPoints)

    const [ disabled, setDisabled ] = useState(false)

    useEffect(() => {
        if (round === props.currentRound && props.currentRoll < 4) {
            setDisabled(true)
        }
        if( round === props.currentRound && props.currentRoll > 3) {
            setDisabled(false)
        }
    }, [props.currentRoll])

    const handleChange = (e) => {
        setRoundScore(e.target.value)
    }
    
    return ( 
        <div className="border"> 
                <p className='text-center'>{`R${round}`}</p>
            <div
            >
                <input autoFocus
                        id={`Round${round}Score`}
                        type="text"
                        name="editRoundScore"
                        className="text-center text-black mx-2"
                        value={roundScore}
                        onChange={handleChange}
                        size="6"
                        disabled={disabled}
                >
                </input>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return({
        currentRoll: state.currentRoll,
        currentRound: state.currentRound
        
    })
}


export default connect(mapStateToProps, {  })(EditPlayerScoreCard);