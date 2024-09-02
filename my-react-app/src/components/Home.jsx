import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import childrenImage from '../assets/children.jpg';
import { Button, Modal, Box, Typography } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const [childData, setChildData] = useState(null);
  const [intelligenceScore, setIntelligenceScore] = useState(null);
  const [userName, setUserName] = useState('');
  const [profilePicURL, setProfilePicURL] = useState('https://via.placeholder.com/40');
  const [open, setOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(`${userData.firstName} ${userData.lastName}`);
            if (userData.profilePicURL) {
              setProfilePicURL(userData.profilePicURL);
            }
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
      console.log('Retrieved childID from cookies:', childID);

      if (!childID) {
        navigate('/addchilddata');
        return;
      }

      try {
        const childRef = doc(db, 'childrenData', childID);
        const childSnap = await getDoc(childRef);

        if (childSnap.exists()) {
          const data = childSnap.data();
          console.log('Child data retrieved:', data);
          setChildData(data);
          setIntelligenceScore(data.score);
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
    setOpen(true); // Open the modal when clicking "Improve"
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 bg-blue-600 p-4 shadow-lg flex justify-between items-center">
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">Bloomlet</a>
        <nav className="space-x-4">
          <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">Home</a>
          <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/userdashboard">Progress</a>
        </nav>
        <Link to="/profile" className="flex items-center">
          <img src={profilePicURL} alt="User Icon" className="w-10 h-10 rounded-full mr-2" />
          <span className="text-white">{userName || 'Guest'}</span>
        </Link>
      </div>

      <div className="content flex-grow text-center p-5 w-full max-w-6xl mx-auto mt-20">
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

      {/* Improve Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
            Personalized Improvement Plan
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography variant="body1" component="p" sx={{ color: 'black' }}>
              Health & Nutrition: Your child's weight is considered {getWeightStatus(childData?.weight, childData?.age)}.
              It's important to monitor their diet and ensure they receive proper nutrition.
              Your child's height is considered {getHeightStatus(childData?.height, childData?.age)}.
              Ensure a balanced diet and regular physical activity to support healthy growth.
            </Typography>
            <Typography variant="body1" component="p" sx={{ mt: 2, color: 'black' }}>
              Screen Time: Your child's screen time is {childData?.avgDailyScreenTime} hours per day,
              which is within the recommended limit of {getRecommendedScreenTime(childData?.age)} hours.
            </Typography>
            <Typography variant="body1" component="p" sx={{ mt: 2, color: 'black' }}>
              Cognitive Development: Your child's intelligence score is {intelligenceScore}.
            </Typography>
          </Box>
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

// Helper functions
const getWeightStatus = (weight, age) => {
  if (age === 5) {
    if (weight < 15) return 'underweight';
    if (weight > 25) return 'overweight';
    return 'within the normal range';
  }
  return 'unknown';
};

const getHeightStatus = (height, age) => {
  if (age === 5) {
    if (height < 100) return 'below average';
    if (height > 120) return 'above average';
    return 'within the normal range';
  }
  return 'unknown';
};

const getRecommendedScreenTime = (age) => {
  if (age === 5) return 1;
  return 0;
};

export default Home;
