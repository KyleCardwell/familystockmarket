import React from "react";
import { connect } from "react-redux";
import PlayerCardDragDrop from "./PlayerCardDragDrop";
import AddPlayerCardDragDrop from "./AddPlayerCardDragDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import EditPlayerModal from "./EditPlayerModal";

const PlayersBox = (props) => {

    const playersList = props.players;

    return (

        <DndProvider backend={HTML5Backend}>


            <div className="bg-gray-900 rounded shadow-lg p-5 grow flex flex-col flex-grow">

                <div className="flex justify-between">
                    <div className="font-bold text-center mb-3 flex-grow">
                        <h4>Players - Click on a player's name to bank (or unbank) their score</h4>
                        <h4>Click and drag a player to rearrange order</h4>

                    </div>
                    <AddPlayerCardDragDrop />

                </div>


                <div className={`flex flex-wrap justify-evenly`}>

                    {playersList.map((person) => {

                        return (
                            <PlayerCardDragDrop
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                points={person.points}
                                isBanked={person.isBanked}
                            />
                        );
                    })}


                    {/* <AddPlayerCardDragDrop /> */}

                </div>
                    <EditPlayerModal />

            </div>
        </DndProvider>
    );
};

const mapStateToProps = state => {
    return ({
      players: state.players,
    })
  }

export default connect(mapStateToProps)(PlayersBox);
