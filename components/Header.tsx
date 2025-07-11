
'use client';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const navItems = [
    { id: 'daily', label: 'Daily Activities', icon: 'ri-calendar-line', emoji: '📅' },
    { id: 'certificates', label: 'Certificates', icon: 'ri-award-line', emoji: '🏆' },
    { id: 'final', label: 'Final Project', icon: 'ri-flag-line', emoji: '🚀' },
    { id: 'mini', label: 'Mini Projects', icon: 'ri-code-box-line', emoji: '⚡' },
  ];

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 relative overflow-hidden">
      {/* Animated header background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-pulse"></div>
        <div className="absolute top-2 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-2 left-8 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4 group">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 p-2">
              <img 
                src="https://static.readdy.ai/image/8ccac6b46ad0bd24ab3c51c482463436/75a417ec52b369f074c3a74950bf6c2f.png" 
                alt="GURU NANAK DEV ENGINEERING COLLEGE Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  GURU NANAK DEV ENGINEERING COLLEGE
                </span>
                <span className="text-xl animate-bounce">🛡️</span>
              </div>
              <p className="text-gray-400 text-sm animate-pulse">
                ⚡ LUDHIANA ⚡
              </p>
            </div>
          </div>
          
          <nav className="flex bg-gray-800/50 rounded-full p-2 backdrop-blur-md border border-gray-700/50">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 whitespace-nowrap cursor-pointer relative group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50 hover:scale-105'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span className="text-lg animate-bounce group-hover:animate-pulse">
                  {item.emoji}
                </span>
                <i className={`${item.icon} text-lg transition-transform duration-300 group-hover:rotate-12`}></i>
                <span className="font-medium">{item.label}</span>
                
                {/* Active indicator */}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                )}
              </button>
            ))}
          </nav>
          
          {/* Anime-style status indicator */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
            <span className="text-2xl animate-bounce">🌟</span>
          </div>
        </div>
      </div>
    </header>
  );
}
