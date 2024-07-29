import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Confetti from 'react-confetti';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import appleImage from '../assets/apple.png';
import ballImage from '../assets/ball.png';
import bananaImage from '../assets/banana.png';
import bookImage from '../assets/book.png';
import carImage from '../assets/car.png';
import catImage from '../assets/cat.png';
import dogImage from '../assets/dog.png';

const MySwal = withReactContent(Swal);

const levels = [
  {
    image: appleImage,
    options: ['Apple', 'Banana', 'Car'],
    correct: 'Apple',
  },
  {
    image: ballImage,
    options: ['Dog', 'Ball', 'Cat'],
    correct: 'Ball',
  },
  {
    image: bananaImage,
    options: ['Book', 'Apple', 'Banana'],
    correct: 'Banana',
  },
  {
    image: bookImage,
    options: ['Car', 'Book', 'Ball'],
    correct: 'Book',
  },
  {
    image: carImage,
    options: ['Cat', 'Dog', 'Car'],
    correct: 'Car',
  },
  {
    image: catImage,
    options: ['Cat', 'Ball', 'Dog'],
    correct: 'Cat',
  },
  {
    image: dogImage,
    options: ['Apple', 'Dog', 'Banana'],
    correct: 'Dog',
  },
];

const Game1 = () => {
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
