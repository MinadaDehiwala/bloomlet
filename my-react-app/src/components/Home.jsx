import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Make sure Link is imported here
import Cookies from 'js-cookie';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import childrenImage from '../assets/children.jpg';
import { Button } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const [childData, setChildData] = useState(null);
  const [intelligenceScore, setIntelligenceScore] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(`${userData.firstName} ${userData.lastName}`);
          } else {
            console.error('No user data found!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    const checkForChildID = async () => {
      const childID = Cookies.get('childID');

      if (!childID) {
        navigate('/addchilddata');
        return;
      }

      try {
        const childRef = doc(db, 'childrenData', childID);
        const childSnap = await getDoc(childRef);

        if (childSnap.exists()) {
          setChildData(childSnap.data());
          setIntelligenceScore(childSnap.data().score);
        } else {
          console.error(`No such document! childID: ${childID}`);
          Cookies.remove('childID');
          navigate('/addchilddata');
        }
      } catch (error) {
        console.error("Error fetching child data:", error);
        Cookies.remove('childID');
        navigate('/addchilddata');
      }
    };

    if (currentUser) {
      checkForChildID();
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove('userID'); // Remove the userID cookie on logout
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleNavigateToGame = (path) => {
    navigate(path);
  };

  const handleNavigateToImprove = () => {
    navigate('/improve');
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center">
      <div className="topnav bg-blue-600 w-full flex justify-around p-4 shadow-lg">
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">LOGO</a>
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/userdashboard">Progress</a>
        <button
          onClick={handleLogout}
          className="text-white text-lg hover:text-gray-200 transition duration-200 ml-auto"
        >
          Logout
        </button>
      </div>

      <div className="content flex-grow text-center p-5 w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-black">Make Your Dream</h1>
          <div className="text-xl text-gray-700">Hello, {userName || 'Guest'}</div>
        </div>

        <div className="relative w-full h-64 mb-8 rounded-lg shadow-lg overflow-hidden">
          <img
            src={childrenImage}
            alt="Children"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {childData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Child Details</h2>
              <p className="text-lg text-gray-700"><strong>Name:</strong> {childData.name}</p>
              <p className="text-lg text-gray-700"><strong>Age:</strong> {childData.age} years</p>
              <p className="text-lg text-gray-700"><strong>Weight:</strong> {childData.weight} kg</p>
              <p className="text-lg text-gray-700"><strong>Height:</strong> {childData.height} cm</p>
              <p className="text-lg text-gray-700"><strong>Avg Daily Screen Time:</strong> {childData.avgDailyScreenTime} hours</p>
              <div className="mt-4">
                <Link to="/updatechilddata">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200">
                    Update Details
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Children's Development</h2>
              <div className="flex flex-col items-center">
                {typeof intelligenceScore === 'number' ? (
                  <>
                    <div className="text-gray-700 text-3xl font-bold flex items-center justify-center shadow-md mb-4">
                      {intelligenceScore.toFixed(2)}%
                    </div>
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 transition duration-200"
                      onClick={handleNavigateToImprove}
                    >
                      How to Improve
                    </button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/stats')}
                    >
                      View Stats
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/gamehistory')}
                    >
                      Game History
                    </Button>
                  </>
                ) : (
                  <div className="text-gray-500">No score available</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">No children added</h2>
            <div className="text-gray-700">You haven't added any children yet.</div>
            <div className="mt-4">
              <Link to="/addchilddata">
                <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200">
                  Add Child Data
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Game Buttons Section */}
        <h2 className="text-2xl font-semibold text-gray-700 mt-12 mb-6">Test Your Brain!</h2>
        {childData && (
          <div className="flex justify-center space-x-4">
            {childData.age >= 3 && (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200"
                onClick={() => handleNavigateToGame('/game1')}
              >
                3 Years
              </button>
            )}
            {childData.age >= 4 && (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 transition duration-200"
                onClick={() => handleNavigateToGame('/game2')}
              >
                4 Years
              </button>
            )}
            {childData.age >= 5 && (
              <button
                className="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600 transition duration-200"
                onClick={() => handleNavigateToGame('/game3')}
              >
                5 Years
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
