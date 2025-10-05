import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import MathGames from './pages/MathGames';
import MathGameDetail from './pages/MathGameDetail';
import LifeSkills from './pages/LifeSkills';
import LifeSkillDetail from './pages/LifeSkillDetail';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      <BrowserRouter>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/math" element={<MathGames />} />
            <Route path="/math/:id" element={<MathGameDetail />} />
            <Route path="/life-skills" element={<LifeSkills />} />
            <Route path="/life-skills/:id" element={<LifeSkillDetail />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;