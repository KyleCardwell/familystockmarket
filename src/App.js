import './App.css';
import PlayersBox from './components/PlayersBox';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';

const App = (props) => {

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="container-left">
            
            <Controls />
            
            <PlayersBox />

          </div>
          <div className="scoreboard">
            <Scoreboard />
          </div>

        </div>
      </header>
    </div>
  );
}


export default App;
