import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AddChildData from './components/AddChildData';
import TestPage1 from './components/TestPage1';
import Game1 from './components/game1'; // Import the Game1 component
import Game2 from './components/game2'; // Import the Game2 component
import Game3 from './components/game3'; // Import the Game3 component
import Improve from './components/Improve'; // Import the Improve component

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
          <Route path="/game1" element={<Game1 />} /> {/* Add the route for Game1 */}
          <Route path="/game2" element={<Game2 />} /> {/* Add the route for Game2 */}
          <Route path="/game3" element={<Game3 />} /> {/* Add the route for Game3 */}
          <Route path="/improve" element={<Improve />} /> {/* Add the route for Improve */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
