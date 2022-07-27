import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

const EditPlayerScoreCard = (props) => {

    const { round, roundPoints } = props
    
    const [ roundScore, setRoundScore ] = useState(roundPoints)

    const handleChange = (e) => {
        setRoundScore(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    return ( 
        <div className="border"> 
                <p className='text-center'>{`R${round}`}</p>
            <form
                onSubmit={handleSubmit}
            >
                <input autoFocus
                        type="text"
                        name="editRoundScore"
                        className="text-center text-black mx-2"
                        value={roundScore}
                        onChange={handleChange}
                        size="6"
                >
                </input>
            </form>

        </div>
    )
}

const mapStateToProps = state => {
    return({
        
    })
}


export default connect(mapStateToProps, {  })(EditPlayerScoreCard);