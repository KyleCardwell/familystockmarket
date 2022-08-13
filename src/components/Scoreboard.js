import React from 'react';
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard';
import { setTopScore, nextRound } from '../actions';

const Scoreboard = (props) => {

    const { players } = props;

    const sorted = [...players]
    
    sorted.sort(function(a,b){return b.points - a.points})

    let playerRank = 1

    for (let i = 0; i < sorted.length; i++) {

        if (i === 0) {
            sorted[i].rank = playerRank
            continue
        }

        if (sorted[i].points === sorted[i - 1].points) {
            sorted[i].rank = playerRank
        } else {
            playerRank++
            sorted[i].rank = playerRank
        }

    }
  

    if(sorted.length > 0){
    
        props.setTopScore(sorted[0].points)
        
    }

    if (sorted.length > 0 && sorted.every(player => player.isBanked === true)) {
        alert("Looks like everyone has banked...Moving on to next round!")
        props.nextRound()
    }
    

    return (
        <section className="bg-gray-900 rounded overflow-y-scroll shadow-lg p-5 h-full">

            <h4 className="font-bold text-center border">Scoreboard</h4>
            <div className="flex justify-between font-bold border">

                <h4 className="w-1/5 text-center align-bottom">Rank</h4>
                <h4 className="w-1/5 text-center align-bottom">Name</h4>
                <h4 className="w-1/5 text-center align-bottom">Score</h4>
                <h4 className="w-1/5 text-center align-bottom">+Bank</h4>
                <h4 className="w-1/5 text-center align-bottom">Behind 1st</h4>

            </div>

            <div className={`flex-row`}>

                {sorted.map((person) => {

                    return (
                        <ScoreCard
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            rank={person.rank}
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
        currentPot: state.currentPot,
        currentRound: state.currentRound
    })
}

export default connect(mapStateToProps, {setTopScore, nextRound})(Scoreboard);