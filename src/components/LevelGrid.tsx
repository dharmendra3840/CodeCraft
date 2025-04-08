import React from 'react';
import { Lock, Check } from 'lucide-react';

const levels = [
  { id: 1, name: "Variables & Types", completed: true, unlocked: true },
  { id: 2, name: "Control Flow", completed: true, unlocked: true },
  { id: 3, name: "Functions", completed: false, unlocked: true },
  { id: 4, name: "Lists & Loops", completed: false, unlocked: false },
  { id: 5, name: "Dictionaries", completed: false, unlocked: false },
  { id: 6, name: "Classes & Objects", completed: false, unlocked: false },
];

const LevelGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {levels.map(level => (
        <div
          key={level.id}
          className={`relative p-6 rounded-lg border-2 ${
            level.unlocked
              ? "bg-gray-800 border-blue-500 hover:border-blue-400 cursor-pointer"
              : "bg-gray-800/50 border-gray-700 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Level {level.id}</h3>
            {level.completed ? (
              <Check className="w-6 h-6 text-green-400" />
            ) : level.unlocked ? (
              <div className="w-6 h-6" />
            ) : (
              <Lock className="w-6 h-6 text-gray-500" />
            )}
          </div>
          <p className="text-gray-300">{level.name}</p>
          {level.completed && (
            <div className="absolute -top-2 -right-2">
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Completed
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LevelGrid;