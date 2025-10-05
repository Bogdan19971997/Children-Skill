import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { BookOpen, Calculator, Users, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/stories', label: 'Stories', icon: BookOpen },
    { path: '/math', label: 'Math Fun', icon: Calculator },
    { path: '/life-skills', label: 'Life Skills', icon: Users },
  ];

  return (
    <header className="bg-gradient-to-r from-orange-100 to-yellow-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-orange-700">KidsLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link key={path} to={path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 text-lg font-medium transition-all hover:scale-105 ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-orange-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link key={path} to={path} onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start flex items-center space-x-3 text-lg font-medium ${
                        isActive 
                          ? 'bg-orange-500 text-white' 
                          : 'text-orange-700 hover:bg-orange-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};