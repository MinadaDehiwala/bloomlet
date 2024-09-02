import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box, Typography, Paper, Button } from '@mui/material';

const ChildInfo = () => {
  const { currentUser } = useAuth();
  const [childData, setChildData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildData = async () => {
      const childID = Cookies.get('childID');
      if (!childID) {
        console.log('No child ID found');
        navigate('/addchilddata');
        return;
      }

      try {
        const childRef = doc(db, 'childrenData', childID);
        const childSnap = await getDoc(childRef);

        if (childSnap.exists()) {
          setChildData(childSnap.data());
        } else {
          console.error('No such child document!');
          navigate('/addchilddata');
        }
      } catch (error) {
        console.error('Error fetching child data:', error);
      }
    };

    fetchChildData();
  }, [currentUser, navigate]);

  if (!childData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: '0 auto', borderRadius: '10px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Child Information
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          <strong>Name:</strong> {childData.name}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          <strong>Age:</strong> {childData.age} years
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          <strong>Weight:</strong> {childData.weight} kg
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          <strong>Height:</strong> {childData.height} cm
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          <strong>Average Daily Screen Time:</strong> {childData.avgDailyScreenTime} hours
        </Typography>
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/userdashboard')} sx={{ marginRight: 2 }}>
            Back to Dashboard
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/updatechilddata')}>
            Update Child Info
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChildInfo;
