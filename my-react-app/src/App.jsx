import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AddChildData from './components/AddChildData';
import TestPage1 from './components/TestPage1';
import Game1 from './components/game1';
import Game2 from './components/game2';
import Game3 from './components/game3';
import Improve from './components/Improve';
import GameHistory from './components/GameHistory';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to /login if the user is not authenticated */}
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userdashboard" element={currentUser ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/addchilddata" element={currentUser ? <AddChildData /> : <Navigate to="/login" />} />
          <Route path="/testpage1" element={currentUser ? <TestPage1 /> : <Navigate to="/login" />} />
          <Route path="/game1" element={currentUser ? <Game1 /> : <Navigate to="/login" />} />
          <Route path="/game2" element={currentUser ? <Game2 /> : <Navigate to="/login" />} />
          <Route path="/game3" element={currentUser ? <Game3 /> : <Navigate to="/login" />} />
          <Route path="/improve" element={currentUser ? <Improve /> : <Navigate to="/login" />} />
          <Route path="/gamehistory" element={currentUser ? <GameHistory /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
