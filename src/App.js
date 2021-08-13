import './App.css';
import PlayerCard from './components/PlayerCard';
import AddPlayerCard from './components/AddPlayerCard';
import { connect } from 'react-redux';

const App = (props) => {

  const { players } = props;

  console.log("Players: ", players)

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="container-left">
            
            <section className="controls">

            </section>
            
            <section className="players-box">
              <header>Players</header>
                <div className="player-cards">
                  {players.map(person => {
                    return (
                      <PlayerCard 
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        points={person.points}
                        isBanked={person.isBanked}
                      />
                    )
                  })}
                  <AddPlayerCard />
                </div>
            </section>

          </div>
          <div className="scoreboard">

          </div>

        </div>
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return ({
    players: state.players,
  })
}

export default connect(mapStateToProps)(App);
