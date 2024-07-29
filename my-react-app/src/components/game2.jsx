import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Confetti from 'react-confetti';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import ballImage from '../assets/ball.png';
import appleImage from '../assets/apple.png';
import bananaImage from '../assets/banana.png';

const MySwal = withReactContent(Swal);

const levels = [
  {
    images: [ballImage, ballImage, ballImage],
    options: [2, 3, 4, 5, 6],
    correct: 3,
  },
  {
    images: [appleImage, appleImage],
    options: [1, 2, 3, 4, 5],
    correct: 2,
  },
  {
    images: [bananaImage, bananaImage, bananaImage, bananaImage],
    options: [3, 4, 5, 6, 7],
    correct: 4,
  },
  {
    images: [ballImage, ballImage, ballImage, ballImage, ballImage],
    options: [4, 5, 6, 7, 8],
    correct: 5,
  },
  {
    images: [appleImage, appleImage, appleImage],
    options: [2, 3, 4, 5, 6],
    correct: 3,
  },
];

const Game2 = () => {
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
        Count the Images
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
          {levels[currentLevel].images.map((image, index) => (
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
          ))}
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
