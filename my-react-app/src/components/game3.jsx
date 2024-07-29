import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Confetti from 'react-confetti';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';

const MySwal = withReactContent(Swal);

const levels = [
  {
    question: [5, 5],
    options: [8, 9, 10, 11, 12],
    correct: 10,
  },
  {
    question: [3, 4, 2],
    options: [8, 9, 7, 10, 6],
    correct: 9,
  },
  {
    question: [7, 2, 1],
    options: [11, 12, 10, 9, 8],
    correct: 10,
  },
  {
    question: [6, 3],
    options: [9, 8, 7, 10, 11],
    correct: 9,
  },
  {
    question: [2, 3, 5],
    options: [8, 10, 9, 7, 6],
    correct: 10,
  },
];

const Game3 = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const checkAnswer = (answer) => {
    if (answer === levels[currentLevel].correct) {
      setShowConfetti(true);
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
          navigate('/');
        }
      });
    } else {
      MySwal.fire({
        title: 'Wrong!',
        text: 'Try again!',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
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
        Solve the Math Question
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
          {levels[currentLevel].question.map((num, index) => (
            <React.Fragment key={index}>
              {index > 0 && <AddIcon sx={{ fontSize: '2rem', marginX: '10px' }} />}
              {num}
            </React.Fragment>
          ))}
          <QuestionMarkIcon sx={{ fontSize: '2rem', marginLeft: '10px' }} />
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
