import React, { useEffect, useState } from 'react';
import { FaUsers, FaMobileAlt, FaChild } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import childrenImage from '../assets/children.jpg';

const Home = () => {
  const navigate = useNavigate();
  const userID = Cookies.get('userID') || 'Guest';
  const childID = Cookies.get('childID');
  
  const [childData, setChildData] = useState(null);
  const [intelligenceScore, setIntelligenceScore] = useState(null);

  useEffect(() => {
    const fetchChildData = async () => {
      if (childID) {
        try {
          const childRef = doc(db, 'childrenData', childID);
          const childSnap = await getDoc(childRef);
          
          if (childSnap.exists()) {
            setChildData(childSnap.data());
            setIntelligenceScore(childSnap.data().score);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching child data:", error);
        }
      } else {
        console.error("No childID found, navigating to add child data");
        navigate('/addchilddata');
      }
    };

    fetchChildData();
  }, [childID, navigate]);

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
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/login">Login</a>
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/userdashboard">Progress</a>
      </div>

      <div className="content flex-grow text-center p-5 w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-black">Make Your Dream</h1>
          <div className="text-xl text-gray-700">Hello, {userID}</div>
        </div>

        <div className="relative w-full h-64 mb-8 rounded-lg shadow-lg overflow-hidden">
          <img
            src={childrenImage}
            alt="Children"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {childData ? (
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
          ) : (
            <div className="bg-white p-6 rounded-md shadow-md flex items-center justify-between">
              <FaUsers size="2em" className="text-blue-500" />
              <div className="text-right">
                <h2 className="text-xl font-semibold text-gray-700">Add Child</h2>
                <Link to="/addchilddata">
                  <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200">
                    Add Child Data
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Children's Development</h2>
            <div className="flex flex-col items-center">
              {intelligenceScore !== null ? (
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
                </>
              ) : (
                <div className="text-gray-500">Loading...</div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md flex justify-around mb-8 text-center">
          <div className="flex flex-col items-center">
            <FaMobileAlt size="2em" className="text-blue-500 mb-2" />
            <p className="text-gray-700">Children who use mobile phones</p>
          </div>
          <div className="flex flex-col items-center">
            <FaChild size="2em" className="text-blue-500 mb-2" />
            <p className="text-gray-700">Children who do not use mobile phones</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200"
            onClick={() => handleNavigateToGame('/game1')}
          >
            3 Years
          </button>
          <button 
            className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 transition duration-200"
            onClick={() => handleNavigateToGame('/game2')}
          >
            4 Years
          </button>
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600 transition duration-200"
            onClick={() => handleNavigateToGame('/game3')}
          >
            5 Years
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
