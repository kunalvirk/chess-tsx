import { Provider } from 'react-redux';
import './App.css';
// import { GameProvider } from './context/GameContext';
import Game from './pages/Game/Game';
import store from './store';

const App: React.FC = () => {
  return (    
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

export default App;
