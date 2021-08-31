import React from 'react';
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard';

const Scoreboard = (props) => {

    const { players } = props;

    const sorted = [...players]
    
    sorted.sort(function(a,b){return b.points - a.points})

    return (
        <section className="bg-gray-900 max-w-full rounded overflow-hidden shadow-lg p-5 h-full">

            <h4 className="font-bold text-center border">Scoreboard</h4>

            <div className={`flex-row `}>

                {sorted.map((person) => {

                    return (
                        <ScoreCard
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            points={person.points}
                            isBanked={person.isBanked}
                        />
                    );
                })}


            </div>

        </section>
    );
};

const mapStateToProps = (state) => {
    return({
        players: state.players
    })
}

export default connect(mapStateToProps)(Scoreboard);