import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { db } from '../firebase';
import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Cookies from 'js-cookie';
import appleImage from '../assets/apple.png';
import ballImage from '../assets/ball.png';
import bananaImage from '../assets/banana.png';
import bookImage from '../assets/book.png';
import carImage from '../assets/car.png';
import catImage from '../assets/cat.png';
import dogImage from '../assets/dog.png';
import redColor from '../assets/red.png';
import blueColor from '../assets/blue.png';
import greenColor from '../assets/green.png';
import { useAuth } from '../contexts/AuthContext';

const MySwal = withReactContent(Swal);

const levels = [
  {
    type: 'image',
    image: appleImage,
    options: ['Apple', 'Banana', 'Car'],
    correct: 'Apple',
    wrongAnswerPenalties: {
      'Banana': 10,
      'Car': 20,
    }
  },
  {
    type: 'image',
    image: ballImage,
    options: ['Dog', 'Ball', 'Cat'],
    correct: 'Ball',
    wrongAnswerPenalties: {
      'Dog': 15,
      'Cat': 10,
    }
  },
  {
    type: 'color',
    image: redColor,
    options: ['Red', 'Blue', 'Green'],
    correct: 'Red',
    wrongAnswerPenalties: {
      'Blue': 20,
      'Green': 15,
    }
  },
  {
    type: 'image',
    image: bananaImage,
    options: ['Book', 'Apple', 'Banana'],
    correct: 'Banana',
    wrongAnswerPenalties: {
      'Book': 20,
      'Apple': 10,
    }
  },
  {
    type: 'color',
    image: blueColor,
    options: ['Red', 'Blue', 'Green'],
    correct: 'Blue',
    wrongAnswerPenalties: {
      'Red': 20,
      'Green': 15,
    }
  },
  {
    type: 'image',
    image: bookImage,
    options: ['Car', 'Book', 'Ball'],
    correct: 'Book',
    wrongAnswerPenalties: {
      'Car': 20,
      'Ball': 15,
    }
  },
  {
    type: 'color',
    image: greenColor,
    options: ['Green', 'Blue', 'Red'],
    correct: 'Green',
    wrongAnswerPenalties: {
      'Blue': 20,
      'Red': 15,
    }
  },
  {
    type: 'image',
    image: carImage,
    options: ['Cat', 'Dog', 'Car'],
    correct: 'Car',
    wrongAnswerPenalties: {
      'Cat': 20,
      'Dog': 15,
    }
  },
  {
    type: 'image',
    image: catImage,
    options: ['Cat', 'Ball', 'Dog'],
    correct: 'Cat',
    wrongAnswerPenalties: {
      'Ball': 15,
      'Dog': 10,
    }
  },
  {
    type: 'image',
    image: dogImage,
    options: ['Apple', 'Dog', 'Banana'],
    correct: 'Dog',
    wrongAnswerPenalties: {
      'Apple': 20,
      'Banana': 15,
    }
  },
];

const Game1 = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [imageRecognitionScore, setImageRecognitionScore] = useState(0);
  const [colorIdentificationScore, setColorIdentificationScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get current user

  const userId = Cookies.get('userID');
  const childId = Cookies.get('childID');

  useEffect(() => {
    if (!childId) {
      console.error('No childId found in cookies');
      navigate('/');
    }
  }, [childId, navigate]);

  const checkAnswer = (answer) => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
    setStartTime(endTime); // Reset start time for next level

    let score = 0;

    if (answer === levels[currentLevel].correct) {
      score = 10; // 10 points for correct answer

      // Adjust score based on response time
      if (timeTaken <= 3) {
        score += 2; // Fast response bonus
      } else if (timeTaken > 10) {
        score -= 2; // Slow response penalty
      }

      setCorrectAnswers((prev) => prev + 1);
    } else {
      score -= levels[currentLevel].wrongAnswerPenalties[answer] || 0;
    }

    if (levels[currentLevel].type === 'image') {
      setImageRecognitionScore((prev) => prev + score);
    } else if (levels[currentLevel].type === 'color') {
      setColorIdentificationScore((prev) => prev + score);
    }

    MySwal.fire({
      title: answer === levels[currentLevel].correct ? 'Correct!' : 'Wrong!',
      text: answer === levels[currentLevel].correct ? 'You chose the right answer!' : 'Moving to the next level.',
      icon: answer === levels[currentLevel].correct ? 'success' : 'error',
      confirmButtonText: 'Next Level',
    }).then(() => {
      moveToNextLevel();
    });
  };

  const moveToNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      finalizeScore();
    }
  };

  const finalizeScore = () => {
    const totalScore = imageRecognitionScore + colorIdentificationScore;
    const intelligencePercentage = (totalScore / (levels.length * 10)) * 100;

    updateChildScores(childId, intelligencePercentage, imageRecognitionScore, colorIdentificationScore);
    saveGameHistory(intelligencePercentage); // Save game history
  };

  const updateChildScores = async (childId, totalScore, imageScore, colorScore) => {
    try {
      const childRef = doc(db, 'childrenData', childId);

      await updateDoc(childRef, {
        score: totalScore,
        imageRecognition: imageScore,
        colorIdentification: colorScore
      });

      MySwal.fire({
        title: 'Game Over!',
        text: `Your total intelligence score is ${totalScore.toFixed(2)}%.`,
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => {
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
        gameType: 'Game 1',
        score: Math.round(score), // Save the score rounded to the nearest whole number
        datePlayed: serverTimestamp(),
      });
      console.log('Game history saved successfully');
    } catch (error) {
      console.error('Error saving game history:', error);
    }
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
        Guess the Image
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
            justifyContent: 'center', 
            mb: 4 
          }}
        >
          <img 
            src={levels[currentLevel].image} 
            alt="Guess" 
            style={{ 
              width: 200, 
              height: 200, 
              borderRadius: '10px',
              objectFit: 'contain'
            }} 
          />
        </Box>
        <Grid container spacing={2}>
          {levels[currentLevel].options.map((option) => (
            <Grid item xs={12} sm={4} key={option}>
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

export default Game1;
