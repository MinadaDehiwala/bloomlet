import React from 'react';
import { FaUser, FaTasks, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-white w-64 p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-blue-600">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <a className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200" href="#">
                  <FaUser className="mr-2" />
                  User Profile
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200" href="#">
                  <FaTasks className="mr-2" />
                  Activities
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200" href="#">
                  <FaInfoCircle className="mr-2" />
                  Children Information
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto">
          <a className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200" href="/login">
            <FaSignOutAlt className="mr-2" />
            Log Out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Your Child Development Results</h1>
          <h2 className="text-xl mb-2">Amor Floriana</h2>
          <p className="text-gray-700 mb-4">3 years old</p>
          <div className="space-y-4">
            {[
              'Brain',
              'Language',
              'Speaking',
              'Color Identification',
              'Physical Activity',
              'Sports',
            ].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-gray-700">{item}</span>
                <div className="w-full bg-gray-200 rounded-full h-4 mx-4">
                  <div className="bg-orange-400 h-4 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-gray-700">45%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-blue-600 p-4 shadow-lg flex justify-between items-center">
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">LOGO</a>
        <nav className="space-x-4">
          <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">Home</a>
          <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/userdashboard">Progress</a>
        </nav>
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="User Icon" className="w-10 h-10 rounded-full mr-2" />
          <span className="text-white">Amor Floriana</span>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
