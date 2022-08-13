// import './App.css';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';
import PlayersBoxDragDrop from './components/PlayersBoxDragDrop';
import EditPlayerModal from './components/EditPlayerModal';
import ControlsDoubleBtn from './components/ControlsDoubleBtn';

const App = (props) => {

  return (
    <div className="bg-gray-800 p-1 text-white h-screen">
      <div className="p-5 h-full">
        <div className="flex flex-row justify-evenly h-full">
          <EditPlayerModal /> 
          <div className="w-3/4 flex flex-col h-full">
            
            {/* <Controls /> */}
            <ControlsDoubleBtn />
            
            <PlayersBoxDragDrop />

          </div>
          <div className="w-1/4">
            <Scoreboard />
          </div>

        </div>
      </div>
    </div>
  );
}


export default App;
