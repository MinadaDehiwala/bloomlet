import React from 'react';
import { FaUsers, FaMobileAlt, FaChild } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import childrenImage from '../assets/children.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToGame = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center">
      <div className="topnav bg-blue-600 w-full flex justify-around p-4 shadow-lg rounded-b-lg">
        <a className="text-white text-center text-lg hover:text-gray-200 transition duration-200" href="/">LOGO</a>
        <a className="text-white text-center text-lg hover:text-gray-200 transition duration-200" href="/login">Login</a>
        <a className="text-white text-center text-lg hover:text-gray-200 transition duration-200" href="/userdashboard">Progress</a>
      </div>

      <div className="content flex-grow text-center p-5 w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-black">Make Your Dream</h1>
        <div className="relative w-full h-64 mb-8 rounded-lg shadow-lg overflow-hidden">
          <img
            src={childrenImage}
            alt="Children"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-md mb-8 shadow-md flex items-center justify-between">
          <FaUsers size="2em" />
          <div className="text-right">
            <h2 className="text-xl">Add Child</h2>
            <Link to="/addchilddata">
              <button className="bg-white text-blue-500 py-2 px-4 rounded shadow-md hover:bg-gray-100">
                Add Child Data
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-md mb-8 shadow-md flex flex-col items-center">
          <h2 className="text-xl mb-4">Children's Development</h2>
          <div className="flex space-x-6">
            <div className="circle bg-pink-500 rounded-full p-8 text-white text-xl flex items-center justify-center shadow-md">
              45%
            </div>
            <div className="circle bg-pink-500 rounded-full p-8 text-white text-xl flex items-center justify-center shadow-md">
              45%
            </div>
          </div>
        </div>

        <div className="flex justify-around p-4 mx-auto max-w-lg text-black">
          <div className="flex flex-col items-center">
            <FaMobileAlt size="2em" className="text-blue-500 mb-2" />
            <p className="text-black">Children who use mobile phones</p>
          </div>
          <div className="flex flex-col items-center">
            <FaChild size="2em" className="text-blue-500 mb-2" />
            <p className="text-black">Children who do not use mobile phones</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-8">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
            onClick={() => handleNavigateToGame('/game1')}
          >
            3 Years
          </button>
          <button 
            className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600"
            onClick={() => handleNavigateToGame('/game2')}
          >
            4 Years
          </button>
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600"
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
