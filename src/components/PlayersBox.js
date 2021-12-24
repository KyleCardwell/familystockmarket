import React from "react";
import PlayerCard from "./PlayerCard";
import AddPlayerCard from "./AddPlayerCard";
import { connect } from "react-redux";

const PlayersBox = (props) => {

    const playersList = props.players;

    return (
        <div className="bg-gray-900 rounded shadow-lg p-5 grow flex flex-col flex-grow">

            <h4 className="font-bold text-center mb-3">Players - Click on a player's name to bank (or unbank) their score</h4>

            <div className={`flex flex-wrap justify-evenly`}>

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

        </div>
    );
};

const mapStateToProps = state => {
    return ({
      players: state.players,
    })
  }

export default connect(mapStateToProps)(PlayersBox);
