import { useDispatch } from 'react-redux';
import './App.css';
import Game from './pages/Game/Game';
import { createRoom } from './store';

const App: React.FC = () => {

  // Get room id using query param
  const urlSearchParams = new URLSearchParams(window.location.search);
  const name: string = urlSearchParams.get('name');

  const dispatch = useDispatch();

  dispatch(createRoom(name));

  return <Game />;
};

export default App;
