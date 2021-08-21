import React from 'react';
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard';

const Scoreboard = (props) => {

    const { players } = props;

    const sorted = players.sort(function(a,b){return b.points - a.points})

    return (
        <section>

            <h4>Scoreboard</h4>

            <div>

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