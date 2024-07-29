import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import all necessary images (assuming these exist in your assets folder)
import circleImage from '../assets/circle.png';
import squareImage from '../assets/square.png';
import triangleImage from '../assets/triangle.png';
import starImage from '../assets/star.png';
import hexagonImage from '../assets/hexagon.png';
import redImage from '../assets/red.png';
import blueImage from '../assets/blue.png';
import greenImage from '../assets/green.png';
import yellowImage from '../assets/yellow.png';
import purpleImage from '../assets/purple.png';
import dogImage from '../assets/dog.png';
import catImage from '../assets/cat.png';
import cowImage from '../assets/cow.png';
import appleImage from '../assets/apple.png';
import orangeImage from '../assets/orange.png';
import bananaImage from '../assets/banana.png';
import carImage from '../assets/car.png';
import ballImage from '../assets/ball.png';
import bookImage from '../assets/book.png';

// Assume we have audio files for these sounds
import dogSound from '../assets/sounds/dog.mp3';
import catSound from '../assets/sounds/cat.mp3';
import cowSound from '../assets/sounds/cow.mp3';
import carSound from '../assets/sounds/car.mp3';
import bellSound from '../assets/sounds/bell.mp3';

const ShapeSorting = ({ setScore }) => {
  const [draggedShape, setDraggedShape] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);

  const shapes = ['circle', 'square', 'triangle', 'star', 'hexagon'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onDragStart = (e, shape) => {
    setDraggedShape(shape);
  };

  const onDrop = (e, targetShape) => {
    e.preventDefault();
    if (draggedShape === targetShape) {
      setCorrect(true);
      setScore(prevScore => prevScore + 10);
      if (level < shapes.length) {
        setLevel(level + 1);
      }
    } else {
      setCorrect(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <p>Drag and drop the shapes into the corresponding holes:</p>
      <p>Time Left: {timeLeft} | Level: {level}</p>
      <div className="flex justify-around mb-4">
        {shapes.slice(0, level).map((shape) => (
          <div
            key={shape}
            className="w-24 h-24 border border-gray-400 flex items-center justify-center"
            onDrop={(e) => onDrop(e, shape)}
            onDragOver={onDragOver}
          >
            <div className={`w-16 h-16 bg-gray-200 ${shape}`}></div>
          </div>
        ))}
      </div>
      <div className="flex justify-around">
        {shapes.slice(0, level).map((shape) => (
          <img
            key={shape}
            src={eval(`${shape}Image`)}
            alt={shape}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
            className="w-24 h-24 cursor-pointer"
          />
        ))}
      </div>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const ColorMatching = ({ setScore }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [showColors, setShowColors] = useState(true);

  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const correctColor = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowColors(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const checkAnswer = () => {
    if (selectedColor === correctColor) {
      setCorrect(true);
      setScore(prevScore => prevScore + 10);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Remember and match the colors:</p>
      <div className="flex justify-around mb-4">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-24 h-24 border border-gray-400 ${showColors ? '' : 'bg-gray-200'}`}
            style={{ backgroundColor: showColors ? color : undefined }}
          ></div>
        ))}
      </div>
      <div className="flex justify-around">
        {colors.map((color) => (
          <img
            key={color}
            src={eval(`${color}Image`)}
            alt={color}
            className="w-24 h-24 cursor-pointer"
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <button onClick={checkAnswer} className="mt-4 bg-black text-white py-2 px-4 rounded">Check Answer</button>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const ObjectPermanence = ({ setScore }) => {
  const [selectedCup, setSelectedCup] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [cupPositions, setCupPositions] = useState([0, 1, 2]);

  const correctCup = 1;

  const checkAnswer = (cup) => {
    setSelectedCup(cup);
    if (cupPositions[cup] === correctCup) {
      setCorrect(true);
      setScore(prevScore => prevScore + 10);
    } else {
      setCorrect(false);
    }
  };

  const shuffleCups = () => {
    setCupPositions(cupPositions.sort(() => Math.random() - 0.5));
  };

  return (
    <div>
      <p>Find the hidden object under the cups:</p>
      <div className="flex justify-around">
        {[0, 1, 2].map((cup) => (
          <motion.div
            key={cup}
            className="bg-gray-300 p-4 m-2 cursor-pointer"
            onClick={() => checkAnswer(cup)}
            animate={{ x: cupPositions[cup] * 100 }}
            transition={{ duration: 0.5 }}
          >
            Cup {cup + 1}
          </motion.div>
        ))}
      </div>
      <button onClick={shuffleCups} className="mt-4 bg-black text-white py-2 px-4 rounded">Shuffle Cups</button>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const SimplePuzzles = ({ setScore }) => {
  const [pieces, setPieces] = useState([
    { id: 1, position: 'top-left' },
    { id: 2, position: 'top-right' },
    { id: 3, position: 'bottom-left' },
    { id: 4, position: 'bottom-right' },
  ]);
  const [completed, setCompleted] = useState(false);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const onDrop = (e, position) => {
    const pieceId = parseInt(e.dataTransfer.getData('text'));
    const newPieces = pieces.map(piece =>
      piece.id === pieceId ? { ...piece, position } : piece
    );
    setPieces(newPieces);
    checkCompletion(newPieces);
  };

  const checkCompletion = (currentPieces) => {
    const isCompleted = currentPieces.every(piece => piece.id.toString() === piece.position.split('-')[1]);
    setCompleted(isCompleted);
    if (isCompleted) {
      setScore(prevScore => prevScore + 10);
    }
  };

  return (
    <div>
      <p>Complete the simple puzzle:</p>
      <div className="grid grid-cols-2 gap-2 w-64 h-64 border-2 border-black">
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(position => (
          <div
            key={position}
            className="border border-gray-400"
            onDrop={(e) => onDrop(e, position)}
            onDragOver={(e) => e.preventDefault()}
          >
            {pieces.find(piece => piece.position === position) && (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, pieces.find(piece => piece.position === position).id)}
                className="w-full h-full bg-blue-500"
              >
                Piece {pieces.find(piece => piece.position === position).id}
              </div>
            )}
          </div>
        ))}
      </div>
      {completed && <p className="text-green-500">Puzzle Completed!</p>}
    </div>
  );
};

const SoundIdentification = ({ setScore }) => {
  const [selectedSound, setSelectedSound] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [playing, setPlaying] = useState(null);

  const sounds = [
    { name: 'dog', sound: dogSound, image: dogImage },
    { name: 'cat', sound: catSound, image: catImage },
    { name: 'cow', sound: cowSound, image: cowImage },
    { name: 'car', sound: carSound, image: carImage },
    { name: 'bell', sound: bellSound, image: bellImage },
  ];

  const correctSound = sounds[Math.floor(Math.random() * sounds.length)];

  const playSound = (sound) => {
    setPlaying(sound);
    const audio = new Audio(sound.sound);
    audio.play();
  };

  const checkAnswer = () => {
    if (selectedSound === correctSound.name) {
      setCorrect(true);
      setScore(prevScore => prevScore + 10);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Listen to the sound and match it with the corresponding object:</p>
      <button onClick={() => playSound(correctSound)} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
        Play Sound
      </button>
      <div className="flex justify-around">
        {sounds.map((sound) => (
          <img
            key={sound.name}
            src={sound.image}
            alt={sound.name}
            onClick={() => setSelectedSound(sound.name)}
            className={`w-24 h-24 cursor-pointer ${selectedSound === sound.name ? 'border-4 border-blue-500' : ''}`}
          />
        ))}
      </div>
      <button onClick={checkAnswer} className="mt-4 bg-black text-white py-2 px-4 rounded">Check Answer</button>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const CauseAndEffect = ({ setScore }) => {
  const [effect, setEffect] = useState(null);

  const triggerEffect = (type) => {
    setEffect(type);
    setScore(prevScore => prevScore + 5);
    setTimeout(() => setEffect(null), 2000);
  };

  return (
    <div>
      <p>Interact with the objects to see what happens:</p>
      <div className="flex justify-around">
        <button
          className="bg-blue-500 p-4 m-2 cursor-pointer rounded"
          onClick={() => triggerEffect('water')}
        >
          Water Plant
        </button>
        <button
          className="bg-yellow-500 p-4 m-2 cursor-pointer rounded"
          onClick={() => triggerEffect('light')}
        >
          Turn On Light
        </button>
        <button
          className="bg-red-500 p-4 m-2 cursor-pointer rounded"
          onClick={() => triggerEffect('balloon')}
        >
          Pop Balloon
        </button>
      </div>
      {effect === 'water' && <p className="text-green-500">The plant is growing!</p>}
      {effect === 'light' && <p className="text-yellow-500">The room is bright!</p>}
      {effect === 'balloon' && <p className="text-red-500">Pop! The balloon burst!</p>}
    </div>
  );
};

const ObjectRecognition = ({ setScore }) => {
  const [correct, setCorrect] = useState(false);
  const [category, setCategory] = useState('fruits');

  const categories = {
    fruits: [
      { name: 'apple', image: appleImage },
      { name: 'orange', image: orangeImage },
      { name: 'banana', image: bananaImage },
    ],
    toys: [
      { name: 'ball', image: ballImage },
      { name: 'car', image: carImage },
      { name: 'book', image: bookImage },
    ],
    animals: [
      { name: 'dog', image: dogImage },
      { name: 'cat', image: catImage },
      { name: 'cow', image: cowImage },
    ],
  };

  const checkAnswer = (objectName) => {
    if (objectName === categories[category][0].name) {
      setCorrect(true);
      setScore(prevScore => prevScore + 10);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Identify the objects shown:</p>
      <div className="mb-4">
        <button onClick={() => setCategory('fruits')} className="bg-red-500 text-white py-2 px-4 rounded mr-2">Fruits</button>
        <button onClick={() => setCategory('toys')} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Toys</button>
        <button onClick={() => setCategory('animals')} className="bg-green-500 text-white py-2 px-4 rounded">Animals</button>
      </div>
      <div className="flex justify-around">
        {categories[category].map((object) => (
          <img
            key={object.name}
            src={object.image}
            alt={object.name}
            onClick={() => checkAnswer(object.name)}
            className="w-24 h-24 cursor-pointer"
          />
        ))}
      </div>
      {correct && <p className="text-green-500">Correct!</p>}
    </div>
  );
};

const MatchingPairs = ({ setScore }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);

  const cards = [
    { id: 1, name: 'apple', image: appleImage },
    { id: 2, name: 'apple', image: appleImage },
    { id: 3, name: 'banana', image: bananaImage },
    { id: 4, name: 'banana', image: bananaImage },
    { id: 5, name: 'orange', image: orangeImage },
    { id: 6, name: 'orange', image: orangeImage },
    { id: 7, name: 'dog', image: dogImage },
    { id: 8, name: 'dog', image: dogImage },
  ].sort(() => Math.random() - 0.5);

  const flipCard = (id) => {
    if (flippedCards.length === 2) return;
    setFlippedCards([...flippedCards, id]);
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards.find(card => card.id === first).name === cards.find(card => card.id === second).name) {
        setMatchedPairs([...matchedPairs, cards.find(card => card.id === first).name]);
        setScore(prevScore => prevScore + 10);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards, matchedPairs, setScore]);

  return (
    <div>
      <p>Match the pairs of images:</p>
      <p>Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-24 h-24 cursor-pointer ${flippedCards.includes(card.id) || matchedPairs.includes(card.name) ? '' : 'bg-gray-300'}`}
            onClick={() => flipCard(card.id)}
          >
            {(flippedCards.includes(card.id) || matchedPairs.includes(card.name)) && (
              <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
      {matchedPairs.length === cards.length / 2 && <p className="text-green-500">All Pairs Found!</p>}
    </div>
  );
};

const FollowingInstructions = ({ setScore }) => {
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [correct, setCorrect] = useState(false);

  const instructions = [
    { text: "Touch your nose", action: "nose" },
    { text: "Clap your hands", action: "clap" },
    { text: "Wave hello", action: "wave" },
    { text: "Touch your nose then clap twice", action: "complex" }
  ];

  const checkAction = (action) => {
    if (action === instructions[currentInstruction].action) {
      setCorrect(true);
      setScore(prevScore => prevScore + 10);
      setTimeout(() => {
        setCorrect(false);
        setCurrentInstruction((prev) => (prev + 1) % instructions.length);
      }, 1000);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Follow the simple instructions given:</p>
      <p className="text-xl font-bold mb-4">{instructions[currentInstruction].text}</p>
      <div className="flex justify-around">
        <button onClick={() => checkAction("nose")} className="bg-blue-500 text-white py-2 px-4 rounded">Touch Nose</button>
        <button onClick={() => checkAction("clap")} className="bg-green-500 text-white py-2 px-4 rounded">Clap Hands</button>
        <button onClick={() => checkAction("wave")} className="bg-yellow-500 text-white py-2 px-4 rounded">Wave Hello</button>
        <button onClick={() => checkAction("complex")} className="bg-purple-500 text-white py-2 px-4 rounded">Complex Action</button>
      </div>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const InteractiveStory = ({ setScore }) => {
  const [storyPart, setStoryPart] = useState(0);
  const [userChoices, setUserChoices] = useState([]);

  const storyParts = [
    {
      text: "Once upon a time, there was a little rabbit named Hoppy. Hoppy loved to explore the forest. One day, Hoppy came across a fork in the path. Should Hoppy go left or right?",
      choices: ["Go Left", "Go Right"]
    },
    {
      text: "Hoppy decided to go {choice}. Along the way, Hoppy met a wise old owl. The owl offered to share some advice. Should Hoppy listen to the owl or continue on the journey?",
      choices: ["Listen to the Owl", "Continue Journey"]
    },
    {
      text: "Hoppy {choice}. As the day went on, Hoppy became hungry. There was a carrot patch nearby, but it belonged to Farmer Brown. Should Hoppy take a carrot or look for food elsewhere?",
      choices: ["Take a Carrot", "Look Elsewhere"]
    },
    {
      text: "In the end, Hoppy {choice}. It was getting late, so Hoppy decided to head home. On the way, Hoppy thought about all the adventures of the day. The End.",
      choices: []
    }
  ];

  const makeChoice = (choice) => {
    setUserChoices([...userChoices, choice]);
    setStoryPart(storyPart + 1);
    setScore(prevScore => prevScore + 5);
  };

  const getCurrentText = () => {
    let text = storyParts[storyPart].text;
    if (userChoices[storyPart - 1]) {
      text = text.replace("{choice}", userChoices[storyPart - 1].toLowerCase());
    }
    return text;
  };

  return (
    <div>
      <p>Engage with the interactive story:</p>
      <p className="text-lg mb-4">{getCurrentText()}</p>
      <div className="flex justify-around">
        {storyParts[storyPart].choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => makeChoice(choice)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {choice}
          </button>
        ))}
      </div>
      {storyPart === storyParts.length - 1 && (
        <button
          onClick={() => {
            setStoryPart(0);
            setUserChoices([]);
          }}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Restart Story
        </button>
      )}
    </div>
  );
};

const TestPage1 = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);

  const levels = [
    {
      title: "Shape Sorting",
      description: "Drag and drop the shapes into the corresponding holes.",
      component: ShapeSorting
    },
    {
      title: "Color Matching",
      description: "Match the colors with their corresponding pairs.",
      component: ColorMatching
    },
    {
      title: "Object Permanence",
      description: "Find the hidden object under the cups.",
      component: ObjectPermanence
    },
    {
      title: "Simple Puzzles",
      description: "Complete the simple puzzle.",
      component: SimplePuzzles
    },
    {
      title: "Sound Identification",
      description: "Match the sounds with the corresponding objects.",
      component: SoundIdentification
    },
    {
      title: "Cause and Effect",
      description: "Interact with objects to see what happens.",
      component: CauseAndEffect
    },
    {
      title: "Object Recognition",
      description: "Identify the objects shown.",
      component: ObjectRecognition
    },
    {
      title: "Matching Pairs",
      description: "Match the pairs of images.",
      component: MatchingPairs
    },
    {
      title: "Following Instructions",
      description: "Follow the simple instructions given.",
      component: FollowingInstructions
    },
    {
      title: "Interactive Story",
      description: "Engage with the interactive story.",
      component: InteractiveStory
    }
  ];

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
  };

  const CurrentComponent = levels[currentLevel].component;

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">IQ Test for 3-Year-Olds</h1>
      <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-black">{levels[currentLevel].title}</h2>
        <p className="mb-6 text-black">{levels[currentLevel].description}</p>
        <CurrentComponent setScore={setScore} />
        <div className="text-center mt-6">
          <p className="text-xl font-bold mb-4">Score: {score}</p>
          {currentLevel < levels.length - 1 && (
            <button onClick={nextLevel} className="bg-blue-500 text-white py-3 px-6 rounded shadow-md hover:bg-blue-700">
              Next Level
            </button>
          )}
          {currentLevel === levels.length - 1 && (
            <p className="text-2xl font-bold text-green-500">Test Complete! Final Score: {score}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage1;