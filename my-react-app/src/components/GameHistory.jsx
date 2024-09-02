import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
        const historyData = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
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

  const getGameTitle = (gameType) => {
    switch (gameType) {
      case 'Game 1':
        return '3 Year Old Game';
      case 'Game 2':
        return '4 Year Old Game';
      case 'Game 3':
        return '5 Year Old Game';
      default:
        return gameType;
    }
  };

  const handleDelete = async (gameId, index) => {
    try {
      await deleteDoc(doc(db, 'gameHistory', gameId));

      const updatedHistory = gameHistory.filter((_, i) => i !== index);
      setGameHistory(updatedHistory);

      // If the deleted game was the latest, update the score
      if (index === 0 && updatedHistory.length > 0) {
        const newScore = updatedHistory[0].score;
        const childId = updatedHistory[0].childID; // Assuming childID is stored in each game history document
        await updateChildScore(childId, newScore);
      } else if (updatedHistory.length === 0) {
        const childId = gameHistory[index].childID;
        await updateChildScore(childId, 0); // Reset score if no history remains
      }

      Swal.fire('Deleted!', 'The game history has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting game history:', error);
      Swal.fire('Error', 'Failed to delete game history.', 'error');
    }
  };

  const updateChildScore = async (childId, newScore) => {
    try {
      const childRef = doc(db, 'childrenData', childId);
      await setDoc(childRef, { score: newScore }, { merge: true });
    } catch (error) {
      console.error('Error updating child score:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center">
      <div className="topnav bg-blue-600 w-full flex justify-around p-4 shadow-lg">
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">Bloomlet</a>
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
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
              <Typography variant="h6" sx={{ color: 'black' }}>{getGameTitle(game.gameType)}</Typography>
              <Typography sx={{ color: 'black' }}>Date Played: {new Date(game.datePlayed.seconds * 1000).toLocaleString()}</Typography>
              <Typography sx={{ color: 'black' }}>Score: {game.score}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(game.id, index)}
                sx={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                Delete
              </Button>
            </Box>
          ))
        )}
      </Box>
    </div>
  );
};

export default GameHistory;
