import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Confetti from 'react-confetti';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { db } from '../firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Cookies from 'js-cookie';
import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import { useAuth } from '../contexts/AuthContext';

const MySwal = withReactContent(Swal);

const levels = [
  {
    type: 'math',
    question: [5, 5],
    options: [8, 9, 10, 11, 12],
    correct: 10,
  },
  {
    type: 'math',
    question: [3, 4, 2],
    options: [8, 9, 7, 10, 6],
    correct: 9,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
    correct: 'Blue',
    displayColor: 'blue',
  },
  {
    type: 'math',
    question: [7, 2, 1],
    options: [11, 12, 10, 9, 8],
    correct: 10,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Orange', 'Pink', 'Purple', 'Blue', 'Red'],
    correct: 'Orange',
    displayColor: 'orange',
  },
  {
    type: 'math',
    question: [6, 3],
    options: [9, 8, 7, 10, 11],
    correct: 9,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Black', 'White', 'Gray', 'Blue', 'Green'],
    correct: 'Green',
    displayColor: 'green',
  },
  {
    type: 'math',
    question: [2, 3, 5],
    options: [8, 10, 9, 7, 6],
    correct: 10,
  },
  {
    type: 'color',
    question: ['Which color is this?'],
    options: ['Yellow', 'Blue', 'Red', 'Green', 'Purple'],
    correct: 'Red',
    displayColor: 'red',
  },
  {
    type: 'math',
    question: [4, 4],
    options: [7, 8, 9, 10, 12],
    correct: 8,
  },
];

const Game3 = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const childId = Cookies.get('childID');

  const checkAnswer = (answer) => {
    const currentQuestion = levels[currentLevel];

    if (answer === currentQuestion.correct) {
      setShowConfetti(true);
      setCorrectAnswers(correctAnswers + 1);

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
    const percentage = (correctAnswers / totalQuestions) * 100;

    updateChildScoreAndIntelligence(childId, percentage);
    saveGameHistory(percentage);
  };

  const updateChildScoreAndIntelligence = async (childId, percentage) => {
    try {
      const childRef = doc(db, 'childrenData', childId);

      await setDoc(childRef, {
        score: percentage, // Update the 'score' field with the new value
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
        gameType: 'Game 3',
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
    setCorrectAnswers(0);
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
        {levels[currentLevel].type === 'math' ? 'Solve the Math Question' : 'Identify the Color'}
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
            alignItems: 'center',
            justifyContent: 'center', 
            mb: 4,
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          {levels[currentLevel].type === 'math' ? (
            levels[currentLevel].question.map((num, index) => (
              <React.Fragment key={index}>
                {index > 0 && <AddIcon sx={{ fontSize: '2rem', marginX: '10px' }} />}
                {num}
              </React.Fragment>
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
          {levels[currentLevel].type === 'math' && (
            <QuestionMarkIcon sx={{ fontSize: '2rem', marginLeft: '10px' }} />
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

export default Game3;
