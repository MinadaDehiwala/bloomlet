import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AddChildData from './components/AddChildData';
import UpdateChildData from './components/UpdateChildData';
import Profile from './components/Profile';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';
import Improve from './components/Improve';
import GameHistory from './components/GameHistory';
import Stats from './components/Stats';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/userdashboard" element={currentUser ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/addchilddata" element={currentUser ? <AddChildData /> : <Navigate to="/login" />} />
          <Route path="/updatechilddata" element={currentUser ? <UpdateChildData /> : <Navigate to="/login" />} />
          <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/game1" element={currentUser ? <Game1 /> : <Navigate to="/login" />} />
          <Route path="/game2" element={currentUser ? <Game2 /> : <Navigate to="/login" />} />
          <Route path="/game3" element={currentUser ? <Game3 /> : <Navigate to="/login" />} />
          <Route path="/improve" element={currentUser ? <Improve /> : <Navigate to="/login" />} />
          <Route path="/gamehistory" element={currentUser ? <GameHistory /> : <Navigate to="/login" />} />
          <Route path="/stats" element={currentUser ? <Stats /> : <Navigate to="/login" />} />

          {/* Redirect any unknown paths to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
