import React from 'react';
import { Code2, BookOpen, Play, Hammer, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">CodeCraft</span>
          </div>
          <div className="flex items-center gap-8">
            <NavLink icon={<BookOpen />} text="Learn" />
            <NavLink icon={<Play />} text="Practice" />
            <NavLink icon={<Hammer />} text="Build" />
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
    {icon}
    {text}
  </a>
);

export default Navbar;