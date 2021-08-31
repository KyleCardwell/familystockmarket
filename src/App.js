// import './App.css';
import PlayersBox from './components/PlayersBox';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';

const App = (props) => {

  return (
    <div className="bg-gray-800 p-10 text-white h-screen">
      <header className="p-5 h-full">
        <div className="flex justify-evenly">
          <div className="w-3/4">
            
            <Controls />
            
            <PlayersBox />

          </div>
          <div className="w-1/4">
            <Scoreboard />
          </div>

        </div>
      </header>
    </div>
  );
}


export default App;
