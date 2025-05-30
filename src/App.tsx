import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlayersList from './components/PlayersList';
import LevelGrid from './components/LevelGrid';
import LandingPage from './components/LandingPage';
import CodingGame from './components/CodingGame';
import SnakeBackground from './components/SnakeBackground';

function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <SnakeBackground />
        <div className="relative z-10">
          <Navbar />
          <LandingPage />
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <SnakeBackground />
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <main className="container mx-auto px-4 py-8 flex gap-4">
                  <aside className="w-64 bg-gray-800 rounded-lg p-4">
                    <PlayersList />
                  </aside>
                  <div className="flex-1">
                    <div className="text-center mb-12">
                      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Welcome to CodeCraft
                      </h1>
                      <p className="text-gray-300 text-lg">
                        Master Python through interactive challenges and earn badges
                      </p>
                    </div>
                    <LevelGrid />
                  </div>
                </main>
              }
            />
            <Route path="/level/1" element={<CodingGame />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;