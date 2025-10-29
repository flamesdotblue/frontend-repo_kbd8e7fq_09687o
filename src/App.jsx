import React, { useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import Lobby from './components/Lobby.jsx';
import GameBoard from './components/GameBoard.jsx';
import AnalyticsPanel from './components/AnalyticsPanel.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); // home | game | analytics
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setView('game');
  };

  const handleEnd = (r) => {
    setResult(r);
    setView('analytics');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500" />
            <h1 className="text-xl font-bold tracking-tight">TEBDASH Chess</h1>
          </div>
          <div className="text-sm text-white/70">
            {user ? (
              <span>
                Signed in as <span className="font-semibold text-white">{user.name}</span>
                {user.isVIP && <span className="ml-2 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-300">VIP</span>}
              </span>
            ) : (
              <span>Welcome</span>
            )}
          </div>
        </header>

        {view === 'home' && (
          <>
            <HeroSection />
            <Lobby onStart={handleStart} onSetUser={setUser} />
          </>
        )}

        {view === 'game' && (
          <div className="grid gap-6 md:grid-cols-[1fr]">
            <GameBoard user={user} onEnd={handleEnd} onMove={() => {}} />
          </div>
        )}

        {view === 'analytics' && (
          <div className="space-y-6">
            <AnalyticsPanel result={result} />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('home')}
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
              >
                Back to Lobby
              </button>
              <button
                onClick={() => setView('game')}
                className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Rematch
              </button>
            </div>
          </div>
        )}

        <footer className="pt-6 text-center text-xs text-white/40">Built for real‑time play, private lobbies, VIP insights, and rich analytics.</footer>
      </div>
    </div>
  );
}

export default App;
