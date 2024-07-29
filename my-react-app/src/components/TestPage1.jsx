import React, { useState } from 'react';
import circleImage from '../assets/circle.png'; // Placeholder image
import squareImage from '../assets/square.png'; // Placeholder image
import triangleImage from '../assets/triangle.png'; // Placeholder image
import redImage from '../assets/red.png'; // Placeholder image
import blueImage from '../assets/blue.png'; // Placeholder image
import greenImage from '../assets/green.png'; // Placeholder image
import dogImage from '../assets/dog.png'; // Placeholder image
import catImage from '../assets/cat.png'; // Placeholder image
import cowImage from '../assets/cow.png'; // Placeholder image
import appleImage from '../assets/apple.png'; // Placeholder image
import orangeImage from '../assets/orange.png'; // Placeholder image
import bananaImage from '../assets/banana.png'; // Placeholder image

const ShapeSorting = () => {
  const [draggedShape, setDraggedShape] = useState(null);
  const [correct, setCorrect] = useState(false);

  const onDragStart = (e, shape) => {
    setDraggedShape(shape);
  };

  const onDrop = (e, targetShape) => {
    e.preventDefault();
    if (draggedShape === targetShape) {
      setCorrect(true);
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
      <div className="flex justify-around mb-4">
        <div
          className="w-24 h-24 border border-gray-400 flex items-center justify-center"
          onDrop={(e) => onDrop(e, 'circle')}
          onDragOver={onDragOver}
        >
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        </div>
        <div
          className="w-24 h-24 border border-gray-400 flex items-center justify-center"
          onDrop={(e) => onDrop(e, 'square')}
          onDragOver={onDragOver}
        >
          <div className="w-16 h-16 bg-gray-200"></div>
        </div>
        <div
          className="w-24 h-24 border border-gray-400 flex items-center justify-center"
          onDrop={(e) => onDrop(e, 'triangle')}
          onDragOver={onDragOver}
        >
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-yellow-500"></div>
        </div>
      </div>
      <div className="flex justify-around">
        <img
          src={circleImage}
          alt="Circle"
          draggable
          onDragStart={(e) => onDragStart(e, 'circle')}
          className="w-24 h-24 cursor-pointer"
        />
        <img
          src={squareImage}
          alt="Square"
          draggable
          onDragStart={(e) => onDragStart(e, 'square')}
          className="w-24 h-24 cursor-pointer"
        />
        <img
          src={triangleImage}
          alt="Triangle"
          draggable
          onDragStart={(e) => onDragStart(e, 'triangle')}
          className="w-24 h-24 cursor-pointer"
        />
      </div>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const ColorMatching = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [correct, setCorrect] = useState(false);

  const colors = ['red', 'blue', 'green'];
  const correctColor = 'red';

  const checkAnswer = () => {
    if (selectedColor === correctColor) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Match the colors with their corresponding pairs:</p>
      <div className="flex justify-around mb-4">
        <div
          className="w-24 h-24 border border-gray-400"
          style={{ backgroundColor: 'red' }}
          onClick={() => setSelectedColor('red')}
        ></div>
        <div
          className="w-24 h-24 border border-gray-400"
          style={{ backgroundColor: 'blue' }}
          onClick={() => setSelectedColor('blue')}
        ></div>
        <div
          className="w-24 h-24 border border-gray-400"
          style={{ backgroundColor: 'green' }}
          onClick={() => setSelectedColor('green')}
        ></div>
      </div>
      <div className="flex justify-around">
        <img
          src={redImage}
          alt="Red"
          className="w-24 h-24 cursor-pointer"
          onClick={() => setSelectedColor('red')}
        />
        <img
          src={blueImage}
          alt="Blue"
          className="w-24 h-24 cursor-pointer"
          onClick={() => setSelectedColor('blue')}
        />
        <img
          src={greenImage}
          alt="Green"
          className="w-24 h-24 cursor-pointer"
          onClick={() => setSelectedColor('green')}
        />
      </div>
      <button onClick={checkAnswer} className="mt-4 bg-black text-white py-2 px-4 rounded">Check Answer</button>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const ObjectPermanence = () => {
  const [selectedCup, setSelectedCup] = useState(null);
  const [correct, setCorrect] = useState(false);

  const correctCup = 2;

  const checkAnswer = (cup) => {
    setSelectedCup(cup);
    if (cup === correctCup) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Find the hidden object under the cups:</p>
      <div className="flex justify-around">
        {[1, 2, 3].map((cup) => (
          <div
            key={cup}
            className="bg-gray-300 p-4 m-2 cursor-pointer"
            onClick={() => checkAnswer(cup)}
          >
            Cup {cup}
          </div>
        ))}
      </div>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const SimplePuzzles = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <div>
      <p>Complete the simple puzzle:</p>
      <button
        className="bg-gray-300 p-4 m-2 cursor-pointer"
        onClick={() => setCompleted(true)}
      >
        Place Last Piece
      </button>
      {completed && <p className="text-green-500">Puzzle Completed!</p>}
    </div>
  );
};

const SoundIdentification = () => {
  const [selectedSound, setSelectedSound] = useState(null);
  const [correct, setCorrect] = useState(false);

  const sounds = ['dog', 'cat', 'cow'];
  const correctSound = 'dog';

  const checkAnswer = () => {
    if (selectedSound === correctSound) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Match the sounds with the corresponding objects:</p>
      <div className="flex justify-around">
        <img src={dogImage} alt="Dog" onClick={() => setSelectedSound('dog')} className="w-24 h-24 cursor-pointer" />
        <img src={catImage} alt="Cat" onClick={() => setSelectedSound('cat')} className="w-24 h-24 cursor-pointer" />
        <img src={cowImage} alt="Cow" onClick={() => setSelectedSound('cow')} className="w-24 h-24 cursor-pointer" />
      </div>
      <button onClick={checkAnswer} className="mt-4 bg-black text-white py-2 px-4 rounded">Check Answer</button>
      {correct && <p className="text-green-500 mt-4">Correct!</p>}
    </div>
  );
};

const CauseAndEffect = () => {
  const [effect, setEffect] = useState(false);

  return (
    <div>
      <p>Press the button to see what happens:</p>
      <button
        className="bg-gray-300 p-4 m-2 cursor-pointer"
        onClick={() => setEffect(true)}
      >
        Press Me
      </button>
      {effect && <p className="text-green-500">Effect Activated!</p>}
    </div>
  );
};

const ObjectRecognition = () => {
  const [correct, setCorrect] = useState(false);

  const checkAnswer = (e) => {
    if (e.target.value === 'apple') {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Identify the objects shown:</p>
      <div className="flex justify-around">
        <img src={appleImage} alt="Apple" onClick={() => checkAnswer({ target: { value: 'apple' } })} className="w-24 h-24 cursor-pointer" />
        <img src={orangeImage} alt="Orange" onClick={() => checkAnswer({ target: { value: 'orange' } })} className="w-24 h-24 cursor-pointer" />
        <img src={bananaImage} alt="Banana" onClick={() => checkAnswer({ target: { value: 'banana' } })} className="w-24 h-24 cursor-pointer" />
      </div>
      {correct && <p className="text-green-500">Correct!</p>}
    </div>
  );
};

const MatchingPairs = () => {
  const [pairsFound, setPairsFound] = useState(0);

  const findPair = () => {
    setPairsFound(pairsFound + 1);
  };

  return (
    <div>
      <p>Match the pairs of images:</p>
      <div className="flex justify-around">
        <img src={appleImage} alt="Apple" onClick={findPair} className="w-24 h-24 cursor-pointer" />
        <img src={bananaImage} alt="Banana" onClick={findPair} className="w-24 h-24 cursor-pointer" />
        <img src={orangeImage} alt="Orange" onClick={findPair} className="w-24 h-24 cursor-pointer" />
      </div>
      {pairsFound === 3 && <p className="text-green-500">All Pairs Found!</p>}
    </div>
  );
};

const FollowingInstructions = () => {
  const [correct, setCorrect] = useState(false);

  const checkAnswer = (e) => {
    if (e.target.value === 'jump') {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <p>Follow the simple instructions given:</p>
      <div className="flex justify-around">
        <button value="run" onClick={checkAnswer} className="bg-gray-300 p-4 m-2 cursor-pointer">Run</button>
        <button value="sit" onClick={checkAnswer} className="bg-gray-300 p-4 m-2 cursor-pointer">Sit</button>
        <button value="jump" onClick={checkAnswer} className="bg-gray-300 p-4 m-2 cursor-pointer">Jump</button>
      </div>
      {correct && <p className="text-green-500">Correct!</p>}
    </div>
  );
};

const InteractiveStory = () => {
  const [storyPart, setStoryPart] = useState(1);

  const nextPart = () => {
    setStoryPart(storyPart + 1);
  };

  return (
    <div>
      <p>Engage with the interactive story:</p>
      <p>{`This is part ${storyPart} of the story.`}</p>
      <button
        className="bg-gray-300 p-4 m-2 cursor-pointer"
        onClick={nextPart}
      >
        Next Part
      </button>
    </div>
  );
};

const levels = [
  {
    title: "Shape Sorting",
    description: "Drag and drop the shapes into the corresponding holes.",
    component: () => <ShapeSorting />
  },
  {
    title: "Color Matching",
    description: "Match the colors with their corresponding pairs.",
    component: () => <ColorMatching />
  },
  {
    title: "Object Permanence",
    description: "Find the hidden object under the cups.",
    component: () => <ObjectPermanence />
  },
  {
    title: "Simple Puzzles",
    description: "Complete the simple puzzle.",
    component: () => <SimplePuzzles />
  },
  {
    title: "Sound Identification",
    description: "Match the sounds with the corresponding objects.",
    component: () => <SoundIdentification />
  },
  {
    title: "Cause and Effect",
    description: "Press the button to see what happens.",
    component: () => <CauseAndEffect />
  },
  {
    title: "Object Recognition",
    description: "Identify the objects shown.",
    component: () => <ObjectRecognition />
  },
  {
    title: "Matching Pairs",
    description: "Match the pairs of images.",
    component: () => <MatchingPairs />
  },
  {
    title: "Following Instructions",
    description: "Follow the simple instructions given.",
    component: () => <FollowingInstructions />
  },
  {
    title: "Interactive Story",
    description: "Engage with the interactive story.",
    component: () => <InteractiveStory />
  }
];

const TestPage1 = () => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
  };

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">IQ Test for 3-Year-Olds</h1>
      <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-black">{levels[currentLevel].title}</h2>
        <p className="mb-6 text-black">{levels[currentLevel].description}</p>
        {levels[currentLevel].component()}
        <div className="text-center mt-6">
          {currentLevel < levels.length - 1 && (
            <button onClick={nextLevel} className="bg-blue-500 text-white py-3 px-6 rounded shadow-md hover:bg-blue-700">
              Next Level
            </button>
          )}
          {currentLevel === levels.length - 1 && (
            <p className="text-2xl font-bold text-green-500">Test Complete!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage1;
