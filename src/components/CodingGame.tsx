import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, HelpCircle, Award, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface Obstacle {
  x: number;
  y: number;
  type: 'wall' | 'trap';
}

const GRID_SIZE = 5;

// Game variations
const GAME_VARIATIONS = [
  {
    id: 1,
    name: "Path Finding",
    description: "Guide your character (G) to the target (R) using basic movement commands.",
    initialPos: { x: 0, y: 0 },
    targetPos: { x: 4, y: 4 },
    obstacles: [],
    hint: "Try using move_right() and move_down() to reach the target!",
    maxMoves: 8,
    character: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=64&h=64&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Obstacle Course",
    description: "Navigate through walls to reach the target. Hitting a wall will reset your position!",
    initialPos: { x: 0, y: 2 },
    targetPos: { x: 4, y: 2 },
    obstacles: [
      { x: 2, y: 1, type: 'wall' },
      { x: 2, y: 2, type: 'wall' },
      { x: 2, y: 3, type: 'wall' },
    ],
    hint: "Find a path around the walls. You might need to go up or down first!",
    maxMoves: 12,
    character: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=64&h=64&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Trap Maze",
    description: "Watch out for traps! Plan your path carefully as stepping on a trap will reset your progress.",
    initialPos: { x: 0, y: 0 },
    targetPos: { x: 4, y: 4 },
    obstacles: [
      { x: 1, y: 1, type: 'trap' },
      { x: 3, y: 2, type: 'trap' },
      { x: 2, y: 3, type: 'trap' },
    ],
    hint: "Traps are marked in red. Try to find a safe path around them!",
    maxMoves: 15,
    character: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=64&h=64&fit=crop&auto=format",
  },
];

const CodingGame = () => {
  const [currentGame, setCurrentGame] = useState(0);
  const [playerPos, setPlayerPos] = useState<Position>(GAME_VARIATIONS[0].initialPos);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentVariation = GAME_VARIATIONS[currentGame];

  const resetGame = () => {
    setPlayerPos(currentVariation.initialPos);
    setOutput([]);
    setSuccess(false);
    setIsRunning(false);
    setMoves(0);
    setScore(0);
    setGameOver(false);
    setShowSuccessModal(false);
  };

  const handleNextGame = () => {
    const nextGameIndex = (currentGame + 1) % GAME_VARIATIONS.length;
    setCurrentGame(nextGameIndex);
    setPlayerPos(GAME_VARIATIONS[nextGameIndex].initialPos);
    setCode('');
    resetGame();
  };

  const switchGame = (index: number) => {
    setCurrentGame(index);
    setPlayerPos(GAME_VARIATIONS[index].initialPos);
    setCode('');
    resetGame();
  };

  const validatePosition = (pos: Position): boolean => {
    if (pos.x < 0 || pos.x >= GRID_SIZE || pos.y < 0 || pos.y >= GRID_SIZE) {
      return false;
    }

    const hitWall = currentVariation.obstacles.some(
      obs => obs.type === 'wall' && obs.x === pos.x && obs.y === pos.y
    );
    if (hitWall) {
      setOutput(prev => [...prev, "🚫 Hit a wall! Position reset."]);
      setPlayerPos(currentVariation.initialPos);
      return false;
    }

    const hitTrap = currentVariation.obstacles.some(
      obs => obs.type === 'trap' && obs.x === pos.x && obs.y === pos.y
    );
    if (hitTrap) {
      setOutput(prev => [...prev, "💥 Triggered a trap! Position reset."]);
      setPlayerPos(currentVariation.initialPos);
      return false;
    }

    return true;
  };

  const movePlayer = (direction: 'right' | 'left' | 'up' | 'down') => {
    if (moves >= currentVariation.maxMoves) {
      setGameOver(true);
      return;
    }

    setPlayerPos((prev) => {
      const newPos = { ...prev };
      switch (direction) {
        case 'right':
          newPos.x += 1;
          break;
        case 'left':
          newPos.x -= 1;
          break;
        case 'up':
          newPos.y -= 1;
          break;
        case 'down':
          newPos.y += 1;
          break;
      }
      if (validatePosition(newPos)) {
        setMoves(prev => prev + 1);
        return newPos;
      }
      return prev;
    });
  };

  const calculateScore = () => {
    const baseScore = 1000;
    const movesPenalty = moves * 50;
    const difficultyBonus = currentGame * 200;
    return Math.max(baseScore - movesPenalty + difficultyBonus, 100);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    setGameOver(false);
    const commands = code.split('\n').filter(line => line.trim());
    
    for (const command of commands) {
      if (gameOver) break;
      
      const newOutput = [...output, `Running: ${command}`];
      setOutput(newOutput);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (command.includes('move_right()')) {
        movePlayer('right');
      } else if (command.includes('move_left()')) {
        movePlayer('left');
      } else if (command.includes('move_up()')) {
        movePlayer('up');
      } else if (command.includes('move_down()')) {
        movePlayer('down');
      }
    }
    
    setIsRunning(false);
  };

  useEffect(() => {
    if (playerPos.x === currentVariation.targetPos.x && 
        playerPos.y === currentVariation.targetPos.y) {
      setSuccess(true);
      setScore(calculateScore());
      setShowSuccessModal(true);
    }
  }, [playerPos, currentVariation]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Level 1: Python Basics
          </h1>

          {/* Game Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {GAME_VARIATIONS.map((variation, index) => (
              <motion.button
                key={variation.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => switchGame(index)}
                className={`p-4 rounded-lg text-left ${
                  currentGame === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <h3 className="font-bold mb-2">{variation.name}</h3>
                <p className="text-sm opacity-80">{variation.description}</p>
              </motion.button>
            ))}
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">{currentVariation.name}</h2>
            <p className="text-gray-300 mb-4">{currentVariation.description}</p>
            <div className="bg-gray-900 rounded p-4">
              <h3 className="font-bold mb-2">Available Commands:</h3>
              <ul className="grid grid-cols-2 gap-4 text-gray-300">
                <li><code className="bg-gray-800 px-2 py-1 rounded">move_right()</code></li>
                <li><code className="bg-gray-800 px-2 py-1 rounded">move_left()</code></li>
                <li><code className="bg-gray-800 px-2 py-1 rounded">move_up()</code></li>
                <li><code className="bg-gray-800 px-2 py-1 rounded">move_down()</code></li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Grid */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="grid grid-cols-5 gap-2 w-full aspect-square">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isTarget = currentVariation.targetPos.x === x && currentVariation.targetPos.y === y;
                const obstacle = currentVariation.obstacles.find(obs => obs.x === x && obs.y === y);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold
                      ${isPlayer || isTarget || obstacle ? 'text-white' : 'bg-gray-700'}`}
                  >
                    {isPlayer && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-full h-full rounded-lg overflow-hidden"
                      >
                        <img
                          src={currentVariation.character}
                          alt="Player"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}
                    {isTarget && !isPlayer && (
                      <motion.div
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-full h-full rounded-lg bg-green-500 flex items-center justify-center"
                      >
                        R
                      </motion.div>
                    )}
                    {obstacle && !isPlayer && !isTarget && (
                      <motion.div
                        animate={obstacle.type === 'trap' ? { opacity: [1, 0.6, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`w-full h-full rounded-lg ${
                          obstacle.type === 'wall' ? 'bg-gray-900' : 'bg-red-500/50'
                        } flex items-center justify-center`}
                      >
                        {obstacle.type === 'wall' ? '⬛' : '⚠️'}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-gray-300">
                Moves: <span className="font-bold text-white">{moves}</span> / {currentVariation.maxMoves}
              </div>
              {success && (
                <div className="text-yellow-400 font-bold flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Score: {score}
                </div>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="# Write your Python code here
# Example:
move_right()
move_down()"
                className="w-full h-48 bg-gray-900 text-white p-4 rounded-lg font-mono"
                disabled={isRunning}
              />
            </div>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runCode}
                disabled={isRunning || !code.trim()}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-6 py-2 rounded-lg"
              >
                <Play size={20} />
                Run Code
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
              >
                <RotateCcw size={20} />
                Reset
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
              >
                <HelpCircle size={20} />
                Hint
              </motion.button>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-900/50 p-4 rounded-lg text-purple-200"
              >
                <p>{currentVariation.hint}</p>
              </motion.div>
            )}

            {gameOver && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/50 p-4 rounded-lg text-red-200 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                <p>Out of moves! Try optimizing your solution to use fewer steps.</p>
              </motion.div>
            )}

            {/* Output Console */}
            <div className="bg-gray-800 rounded-lg p-4 h-48 overflow-y-auto">
              <div className="font-mono text-sm">
                {output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-green-400"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                  <p className="text-gray-300">
                    You've completed {currentVariation.name} with a score of {score}!
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  {currentGame < GAME_VARIATIONS.length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextGame}
                      className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                    >
                      Next Game
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium"
                  >
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodingGame;