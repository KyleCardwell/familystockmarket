import React from "react";
import PlayerCard from "./PlayerCard";
import AddPlayerCard from "./AddPlayerCard";
import { connect } from "react-redux";

const PlayersBox = (props) => {

    const playersList = props.players;

    return (
        <section className="players-box">

            <h4>Players</h4>

            <div className="player-cards">

                {playersList.map((person) => {

                    return (
                        <PlayerCard
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            points={person.points}
                            isBanked={person.isBanked}
                        />
                    );
                })}

                <AddPlayerCard />

            </div>

        </section>
    );
};

const mapStateToProps = state => {
    return ({
      players: state.players,
    })
  }

export default connect(mapStateToProps)(PlayersBox);
