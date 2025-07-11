
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import DailyActivities from '../components/DailyActivities';
import Certificates from '../components/Certificates';
import FinalProject from '../components/FinalProject';
import MiniProjects from '../components/MiniProjects';

export default function Home() {
  const [activeSection, setActiveSection] = useState('daily');

  const renderSection = () => {
    switch (activeSection) {
      case 'daily':
        return <DailyActivities />;
      case 'certificates':
        return <Certificates />;
      case 'final':
        return <FinalProject />;
      case 'mini':
        return <MiniProjects />;
      default:
        return <DailyActivities />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs with different animations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-xl animate-ping"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-3/4 right-1/5 w-20 h-20 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-lg animate-bounce"></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 right-1/2 w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-8 h-8 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rotate-12 animate-pulse"></div>
      </div>
      
      {/* Anime-style cybersecurity background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=anime%20cyberpunk%20hacker%20girl%20with%20purple%20hair%20sitting%20at%20multiple%20monitors%20showing%20code%20and%20network%20diagrams%2C%20neon%20purple%20blue%20lighting%2C%20futuristic%20tech%20setup%2C%20glowing%20screens%2C%20digital%20matrix%20background%2C%20cybersecurity%20theme%2C%20expressive%20anime%20art%20style%2C%20dynamic%20pose%2C%20confident%20expression&width=1920&height=1080&seq=cyber-anime-bg-001&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Tech grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/2 w-2 h-20 bg-gradient-to-b from-purple-400 to-transparent transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-2 bg-gradient-to-r from-blue-400 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent transform -rotate-12 animate-pulse"></div>
        <div className="absolute top-1/6 right-1/6 w-24 h-1 bg-gradient-to-r from-pink-400 to-transparent animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative">
              {/* Anime-style character mascot */}
              <div className="absolute -top-4 right-4 w-24 h-24 opacity-80 animate-bounce">
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=cute%20anime%20cybersecurity%20mascot%20character%20with%20headphones%20and%20laptop%2C%20chibi%20style%2C%20purple%20and%20blue%20color%20scheme%2C%20friendly%20expression%2C%20tech%20accessories%2C%20digital%20art%20style%2C%20kawaii%20aesthetic%2C%20transparent%20background&width=200&height=200&seq=cyber-mascot-001&orientation=squarish')`,
                  }}
                />
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-6 tracking-tight animate-pulse">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Cybersecurity Training Report
                </span>
              </h1>
              <div className="w-32 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto mb-6 rounded-full animate-pulse"></div>
              <p className="text-gray-200 text-xl max-w-2xl mx-auto leading-relaxed">
                🚀 Comprehensive tracking of daily progress, certifications, projects, and skill development in cybersecurity ⚡
              </p>
              
              {/* Animated stats display */}
              <div className="flex justify-center space-x-8 mt-8">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-purple-500/30 animate-pulse">
                  <div className="text-2xl font-bold text-purple-400">🎯</div>
                  <div className="text-sm text-gray-300">Learning Mode</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-blue-500/30 animate-bounce">
                  <div className="text-2xl font-bold text-blue-400">⚡</div>
                  <div className="text-sm text-gray-300">Progress</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-pink-500/30 animate-pulse">
                  <div className="text-2xl font-bold text-pink-400">🔥</div>
                  <div className="text-sm text-gray-300">Skills</div>
                </div>
              </div>
            </div>
            
            {renderSection()}
          </div>
        </main>
        
        <footer className="border-t border-purple-800/30 mt-20 backdrop-blur-sm relative">
          {/* Anime-style footer decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
          <div className="container mx-auto px-6 py-8 relative">
            <div className="text-center text-gray-300">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <span className="text-2xl animate-bounce">🛡️</span>
                <p className="font-semibold">GURU NANAK DEV ENGINEERING COLLEGE - Training Progress Dashboard</p>
                <span className="text-2xl animate-bounce">⚔️</span>
              </div>
              <p className="text-sm text-gray-400 animate-pulse mb-2">
                Level up your cybersecurity skills! 💫 Keep learning, keep growing! 🌟
              </p>
              <p className="text-sm text-gray-300 font-medium">
                ARPAN KAUR DHILLON (2302480)
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
