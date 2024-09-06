import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UpdateChildData = () => {
  const navigate = useNavigate();
  const [childData, setChildData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    avgDailyScreenTime: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChildData = async () => {
      const childID = Cookies.get('childID');

      if (!childID) {
        navigate('/addchilddata'); // Redirect if no childID
        return;
      }

      try {
        const childRef = doc(db, 'childrenData', childID);
        const childSnap = await getDoc(childRef);

        if (childSnap.exists()) {
          setChildData(childSnap.data());
        } else {
          console.error('No such document!');
          navigate('/addchilddata');
        }
      } catch (error) {
        console.error('Error fetching child data:', error);
        navigate('/addchilddata');
      }
    };

    fetchChildData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const childID = Cookies.get('childID');

    try {
      const childRef = doc(db, 'childrenData', childID);
      await updateDoc(childRef, childData);
      navigate('/'); // Redirect to home after update
    } catch (error) {
      console.error('Error updating child data:', error);
      setError('Failed to update child data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update Child Data
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={childData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age (years)
              </label>
              <div className="mt-1">
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  value={childData.age}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <div className="mt-1">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  required
                  value={childData.weight}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <div className="mt-1">
                <input
                  id="height"
                  name="height"
                  type="number"
                  required
                  value={childData.height}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="avgDailyScreenTime" className="block text-sm font-medium text-gray-700">
                Avg Daily Screen Time (hours)
              </label>
              <div className="mt-1">
                <input
                  id="avgDailyScreenTime"
                  name="avgDailyScreenTime"
                  type="number"
                  required
                  value={childData.avgDailyScreenTime}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/')} // Navigate back to the home page
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>

              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Child Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateChildData;
