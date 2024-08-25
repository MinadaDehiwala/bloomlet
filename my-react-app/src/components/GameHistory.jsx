import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GameHistory = () => {
  const { currentUser, logout } = useAuth();
  const [gameHistory, setGameHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameHistory = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, 'gameHistory'),
          where('userID', '==', currentUser.uid),
          orderBy('datePlayed', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const historyData = querySnapshot.docs.map(doc => doc.data());
        setGameHistory(historyData);
      } catch (error) {
        console.error('Error fetching game history: ', error);
      }
    };

    fetchGameHistory();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
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

      <Box sx={{ p: 3, width: '100%', maxWidth: '800px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>

        <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>Game History</Typography>
        {gameHistory.length === 0 ? (
          <Typography sx={{ color: 'black' }}>No game history found.</Typography>
        ) : (
          gameHistory.map((game, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ color: 'black' }}>Game Type: {game.gameType}</Typography>
              <Typography sx={{ color: 'black' }}>Date Played: {new Date(game.datePlayed.seconds * 1000).toLocaleString()}</Typography>
              <Typography sx={{ color: 'black' }}>Score: {game.score}</Typography>
            </Box>
          ))
        )}
      </Box>
    </div>
  );
};

export default GameHistory;
