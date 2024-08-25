import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Stats from './components/Stats';
import UpdateChildData from './components/UpdateChildData'; // Import the UpdateChildData component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/addchilddata" element={<AddChildData />} />
          <Route path="/testpage1" element={<TestPage1 />} />
          <Route path="/game1" element={<Game1 />} />
          <Route path="/game2" element={<Game2 />} />
          <Route path="/game3" element={<Game3 />} />
          <Route path="/improve" element={<Improve />} />
          <Route path="/gamehistory" element={<GameHistory />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/updatechilddata" element={<UpdateChildData />} /> {/* Add the route for UpdateChildData */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
