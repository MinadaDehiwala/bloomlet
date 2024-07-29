import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AddChildData from './components/AddChildData';
import TestPage1 from './components/TestPage1'; // Import the new TestPage1 component

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
          <Route path="/testpage1" element={<TestPage1 />} /> {/* Add the route for TestPage1 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
