import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Confetti from 'react-confetti'; // Import Confetti
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { db } from '../firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Cookies from 'js-cookie';
import ballImage from '../assets/ball.png';
import appleImage from '../assets/apple.png';
import bananaImage from '../assets/banana.png';
import { useAuth } from '../contexts/AuthContext';

const MySwal = withReactContent(Swal);

const levels = [
  {
    type: 'counting',
    images: [ballImage, ballImage, ballImage],
    options: [2, 3, 4, 5, 6],
    correct: 3,
  },
  {
    type: 'counting',
    images: [appleImage, appleImage],
    options: [1, 2, 3, 4, 5],
    correct: 2,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
    correct: 'Blue',
    displayColor: 'blue',
  },
  {
    type: 'counting',
    images: [bananaImage, bananaImage, bananaImage, bananaImage],
    options: [3, 4, 5, 6, 7],
    correct: 4,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Orange', 'Pink', 'Purple', 'Blue', 'Red'],
    correct: 'Orange',
    displayColor: 'orange',
  },
  {
    type: 'counting',
    images: [ballImage, ballImage, ballImage, ballImage, ballImage],
    options: [4, 5, 6, 7, 8],
    correct: 5,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Black', 'White', 'Gray', 'Blue', 'Green'],
    correct: 'Green',
    displayColor: 'green',
  },
  {
    type: 'counting',
    images: [appleImage, appleImage, appleImage],
    options: [2, 3, 4, 5, 6],
    correct: 3,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Yellow', 'Blue', 'Red', 'Green', 'Purple'],
    correct: 'Red',
    displayColor: 'red',
  },
  {
    type: 'counting',
    images: [bananaImage, bananaImage],
    options: [1, 2, 3, 4, 5],
    correct: 2,
  },
  {
    type: 'counting',
    images: [appleImage, appleImage, appleImage, appleImage],
    options: [2, 3, 4, 5, 6],
    correct: 4,
  },
];

const Game2 = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctCountingAnswers, setCorrectCountingAnswers] = useState(0);
  const [correctColorAnswers, setCorrectColorAnswers] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const childId = Cookies.get('childID');

  const checkAnswer = (answer) => {
    const currentQuestion = levels[currentLevel];

    if (answer === currentQuestion.correct) {
      setShowConfetti(true);
      if (currentQuestion.type === 'counting') {
        setCorrectCountingAnswers(correctCountingAnswers + 1);
      } else if (currentQuestion.type === 'color') {
        setCorrectColorAnswers(correctColorAnswers + 1);
      }

      MySwal.fire({
        title: 'Correct!',
        text: 'You chose the right answer!',
        icon: 'success',
        confirmButtonText: 'Next Level',
      }).then(() => {
        setShowConfetti(false);
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
        } else {
          calculateAndSaveScore();
        }
      });
    } else {
      MySwal.fire({
        title: 'Wrong!',
        text: 'Moving to the next level.',
        icon: 'error',
        confirmButtonText: 'Next Level',
      }).then(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
        } else {
          calculateAndSaveScore();
        }
      });
    }
  };

  const calculateAndSaveScore = () => {
    const totalQuestions = levels.length;
    const totalCorrect = correctCountingAnswers + correctColorAnswers;
    const percentage = (totalCorrect / totalQuestions) * 100;

    updateChildScoreAndIntelligence(childId, percentage);
    saveGameHistory(percentage);
  };

  const updateChildScoreAndIntelligence = async (childId, percentage) => {
    try {
      const countingScore = (correctCountingAnswers / 6) * 100;
      const colorIdentificationScore = (correctColorAnswers / 5) * 100;

      const childRef = doc(db, 'childrenData', childId);

      await setDoc(childRef, {
        score: percentage, // Update the 'score' field
        countingScore: countingScore,
        colorIdentificationScore: colorIdentificationScore,
      }, { merge: true });

      MySwal.fire({
        title: 'Game Over!',
        text: `Your total score is ${percentage.toFixed(2)}%`,
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => {
        resetGame();
        navigate('/');
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const saveGameHistory = async (score) => {
    try {
      await addDoc(collection(db, 'gameHistory'), {
        userID: currentUser.uid,
        gameType: 'Game 2',
        score: Math.round(score), // Save the score rounded to the nearest whole number
        datePlayed: serverTimestamp(),
      });
      console.log('Game history saved successfully');
    } catch (error) {
      console.error('Error saving game history:', error);
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setCorrectCountingAnswers(0);
    setCorrectColorAnswers(0);
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        bgcolor: '#f0f4f8', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 4 
      }}
    >
      {showConfetti && <Confetti />}
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          color: '#333', 
          fontWeight: 'bold', 
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        {levels[currentLevel].type === 'counting' ? 'Count the Images' : 'Identify the Color'}
      </Typography>
      <Paper 
        elevation={6} 
        sx={{ 
          padding: '20px', 
          borderRadius: '15px',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center', 
            mb: 4,
            gap: '10px'
          }}
        >
          {levels[currentLevel].type === 'counting' ? (
            levels[currentLevel].images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt="Count" 
                style={{ 
                  width: 100, 
                  height: 100, 
                  objectFit: 'contain'
                }} 
              />
            ))
          ) : (
            <Box
              sx={{
                width: '100px',
                height: '100px',
                backgroundColor: levels[currentLevel].displayColor,
                borderRadius: '50%',
              }}
            />
          )}
        </Box>
        <Grid container spacing={2}>
          {levels[currentLevel].options.map((option) => (
            <Grid item xs={12} sm={6} key={option}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => checkAnswer(option)}
                sx={{ 
                  py: 2, 
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Game2;
