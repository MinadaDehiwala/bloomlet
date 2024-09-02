import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Cookies from 'js-cookie'; // Import Cookies to handle cookie operations

const Profile = () => {
  const { currentUser, logout } = useAuth(); // Get logout function from AuthContext
  const [userData, setUserData] = useState(null);
  const [childData, setChildData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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
      if (!childID) {
        console.log('No child ID found');
        return;
      }

      try {
        const childRef = doc(db, 'childrenData', childID);
        const childSnap = await getDoc(childRef);

        if (childSnap.exists()) {
          setChildData(childSnap.data());
        } else {
          console.error('No such child document!');
        }
      } catch (error) {
        console.error('Error fetching child data:', error);
      }
    };

    fetchUserData();
    fetchChildData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout(); // Log out the user
      Cookies.remove('userID'); // Clear the userID cookie
      Cookies.remove('childID'); // Clear the childID cookie (if exists)
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (!userData || !childData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex items-center mb-8">
          <img
            src={userData.profilePicURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <h2 className="text-3xl font-semibold text-black">{userData.firstName} {userData.lastName}</h2>
            <p className="text-xl text-black">{userData.email}</p>
          </div>
        </div>

        <hr className="mb-8 border-gray-300" />

        <div className="p-6 bg-gray-200 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-bold text-black mb-4">Child Information</h3>
          <p className="text-black">Age: {childData.age} years old</p>
          <p className="text-black">Location: Sri Lanka</p>
          <p className="text-black">Joined: September 2024</p>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="flex justify-between">
          <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
            Home
          </Link>
          <Link to="/userdashboard" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
            Dashboard
          </Link>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
