import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 5;
const INITIAL_POSITION: Position = { x: 2, y: 2 }; // Position for 'G'
const TARGET_POSITION: Position = { x: 4, y: 4 }; // Position for 'R'

const CodingGame = () => {
  const [playerPos, setPlayerPos] = useState<Position>(INITIAL_POSITION);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const resetGame = () => {
    setPlayerPos(INITIAL_POSITION);
    setOutput([]);
    setSuccess(false);
    setIsRunning(false);
  };

  const validatePosition = (pos: Position): boolean => {
    return pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE;
  };

  const movePlayer = (direction: 'right' | 'left' | 'up' | 'down') => {
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
      return validatePosition(newPos) ? newPos : prev;
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    const commands = code.split('\n').filter(line => line.trim());
    
    for (const command of commands) {
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
    if (playerPos.x === TARGET_POSITION.x && playerPos.y === TARGET_POSITION.y) {
      setSuccess(true);
    }
  }, [playerPos]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Level 1: Basic Movement
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Grid */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="grid grid-cols-5 gap-2 w-full aspect-square">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isTarget = TARGET_POSITION.x === x && TARGET_POSITION.y === y;
                
                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold
                      ${isPlayer || isTarget ? 'text-white' : 'bg-gray-700'}`}
                  >
                    {isPlayer && (
                      <div className="w-full h-full rounded-lg bg-yellow-400 flex items-center justify-center">
                        G
                      </div>
                    )}
                    {isTarget && !isPlayer && (
                      <div className="w-full h-full rounded-lg bg-green-500 flex items-center justify-center">
                        R
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your Python code here..."
                className="w-full h-48 bg-gray-900 text-white p-4 rounded-lg font-mono"
                disabled={isRunning}
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={runCode}
                disabled={isRunning || !code.trim()}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-6 py-2 rounded-lg"
              >
                <Play size={20} />
                Run Code
              </button>
              
              <button
                onClick={resetGame}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>

            {/* Output Console */}
            <div className="bg-gray-800 rounded-lg p-4 h-48 overflow-y-auto">
              <div className="font-mono text-sm">
                {output.map((line, index) => (
                  <div key={index} className="text-green-400">{line}</div>
                ))}
                {success && (
                  <div className="text-yellow-400 font-bold mt-4">
                    🎉 Congratulations! You've completed Level 1!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingGame;