import React, { useEffect, useState } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [childData, setChildData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    const fetchChildData = async () => {
      const childID = Cookies.get('childID');
      if (childID) {
        const childDoc = doc(db, 'childrenData', childID);
        const docSnap = await getDoc(childDoc);
        if (docSnap.exists()) {
          setChildData(docSnap.data());
        } else {
          console.log("No child data found!");
        }
      }
    };

    fetchUserData();
    fetchChildData();
  }, [currentUser]);

  if (!userData || !childData) {
    return <div>Loading...</div>;
  }

  const scores = [
    { name: 'Mathematics', score: childData.mathScore },
    { name: 'Color Identification', score: childData.colorIdentificationScore },
    { name: 'Counting', score: childData.countingScore },
    { name: 'Image Recognition', score: childData.imageRecognition },
    { name: 'Overall Intelligence', score: childData.intelligence },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-white w-64 p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-blue-600">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200">
                  <FaUser className="mr-2" />
                  User Profile
                </Link>
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
          <h2 className="text-xl mb-2">{userData.firstName} {userData.lastName}</h2>
          <p className="text-gray-700 mb-4">3 years old</p>
          <div className="space-y-4">
            {scores.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-gray-700">{item.name}</span>
                <div className="w-full bg-gray-200 rounded-full h-4 mx-4">
                  <div className="bg-orange-400 h-4 rounded-full" style={{ width: `${item.score}%` }}></div>
                </div>
                <span className="text-gray-700">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-blue-600 p-4 shadow-lg flex justify-between items-center">
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">Bloomlet</a>
        <nav className="space-x-4">
          <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">Home</a>
          <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/userdashboard">Progress</a>
        </nav>
        <Link to="/profile" className="flex items-center">
          <img src={userData.profilePicURL || "https://via.placeholder.com/40"} alt="User Icon" className="w-10 h-10 rounded-full mr-2" />
          <span className="text-white">{userData.firstName} {userData.lastName}</span>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
