import './App.css'
import { GameProvider } from './context/GameContext'
import Game from './pages/Game/Game'

const App: React.FC = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
}

export default App
