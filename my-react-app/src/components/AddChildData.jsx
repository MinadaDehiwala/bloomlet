import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import Cookies from 'js-cookie';

const AddChildData = () => {
  const [childData, setChildData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    avgDailyScreenTime: '',
    appsUsed: [],
    platformsUsed: [],
    score: '' // Initialize score field
  });
  const [errors, setErrors] = useState({});
  const [childExists, setChildExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkChildExists = async () => {
      const userId = Cookies.get('userID');
      if (userId) {
        const q = query(collection(db, 'childrenData'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setChildExists(true);
          const childDoc = querySnapshot.docs[0];
          Cookies.set('childID', childDoc.id);
        }
      }
    };

    checkChildExists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData({ ...childData, [name]: value });
  };

  const handleToggle = (type, value) => {
    setChildData(prevState => {
      const currentData = prevState[type];
      if (currentData.includes(value)) {
        return { ...prevState, [type]: currentData.filter(item => item !== value) };
      } else {
        return { ...prevState, [type]: [...currentData, value] };
      }
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!childData.name) tempErrors.name = "Name is required";
    if (!childData.age || childData.age < 1 || childData.age > 5) tempErrors.age = "Age must be between 1 and 5";
    if (!childData.weight || childData.weight <= 0) tempErrors.weight = "Weight must be greater than 0 kg";
    if (!childData.height || childData.height <= 0) tempErrors.height = "Height must be greater than 0 cm";
    if (!childData.avgDailyScreenTime || childData.avgDailyScreenTime < 0) tempErrors.avgDailyScreenTime = "Average Daily Screen Time must be a positive number";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const userId = Cookies.get('userID');
        const docRef = await addDoc(collection(db, 'childrenData'), {
          ...childData,
          userId: userId
        });
        Cookies.set('childID', docRef.id);
        console.log('Child data saved:', childData);
        navigate('/');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const apps = ['YouTube', 'TikTok', 'YouTube Kids', 'Netflix', 'Games', 'Educational Apps'];
  const platforms = ['TV', 'Computer', 'Tablet', 'Mobile'];

  if (childExists) {
    return <div>You already have a child added.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Child Data Entry Form</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Add Child Data</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={childData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={childData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
          />
          {errors.age && <span className="text-red-500">{errors.age}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={childData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
          />
          {errors.weight && <span class="text-red-500">{errors.weight}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={childData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
          />
          {errors.height && <span class="text-red-500">{errors.height}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Average Daily Screen Time (hours)</label>
          <input
            type="number"
            name="avgDailyScreenTime"
            value={childData.avgDailyScreenTime}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black"
          />
          {errors.avgDailyScreenTime && <span class="text-red-500">{errors.avgDailyScreenTime}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Apps Used</label>
          <div className="flex flex-wrap gap-2">
            {apps.map(app => (
              <button
                key={app}
                type="button"
                onClick={() => handleToggle('appsUsed', app)}
                className={`px-4 py-2 rounded ${childData.appsUsed.includes(app) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {app}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Platforms Used</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map(platform => (
              <button
                key={platform}
                type="button"
                onClick={() => handleToggle('platformsUsed', platform)}
                className={`px-4 py-2 rounded ${childData.platformsUsed.includes(platform) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded shadow-md hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default AddChildData;
