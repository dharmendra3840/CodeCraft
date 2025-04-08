import React from 'react';
import { Trophy } from 'lucide-react';

const players = [
  { id: 1, name: "Alex", level: 5, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
  { id: 2, name: "Sarah", level: 7, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
  { id: 3, name: "Mike", level: 4, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100" },
];

const PlayersList = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Top Players</h2>
      <div className="space-y-4">
        {players.map(player => (
          <div key={player.id} className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{player.name}</p>
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Level {player.level}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;