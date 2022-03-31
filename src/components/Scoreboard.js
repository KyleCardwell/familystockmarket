import React from 'react';
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard';
import { setTopScore, nextRound } from '../actions';

const Scoreboard = (props) => {

    const { players } = props;

    const sorted = [...players]
    
    sorted.sort(function(a,b){return b.points - a.points})

    if(sorted.length > 0){
    
        props.setTopScore(sorted[0].points)
        
    }

    if (sorted.every(player => player.isBanked === true)) {
        alert("Looks like everyone has banked...Moving on to next round!")
        props.nextRound()
    }
    

    return (
        <section className="bg-gray-900 rounded overflow-y-scroll shadow-lg p-5 h-full">

            <h4 className="font-bold text-center border">Scoreboard</h4>
            <div className="flex justify-between font-bold border">

                <h4 className="w-1/4 text-center">Name</h4>
                <h4 className="w-1/4 text-center">Score</h4>
                <h4 className="w-1/4 text-center">+Bank</h4>
                <h4 className="w-1/4 text-center">Behind 1st</h4>

            </div>

            <div className={`flex-row`}>

                {sorted.map((person) => {

                    return (
                        <ScoreCard
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            points={person.points}
                            isBanked={person.isBanked}
                            behind1st={props.topScore - person.points}
                            ifBank={person.points + props.currentPot}
                            topScore={props.topScore}
                        />
                    );
                })}


            </div>

        </section>
    );
};

const mapStateToProps = (state) => {
    return({
        players: state.players,
        topScore: state.topScore,
        currentPot: state.currentPot
    })
}

export default connect(mapStateToProps, {setTopScore, nextRound})(Scoreboard);