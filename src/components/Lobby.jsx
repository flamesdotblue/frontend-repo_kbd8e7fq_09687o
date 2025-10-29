import React, { useState } from 'react';
import { User, Lock, Play } from 'lucide-react';

export default function Lobby({ onStart, onSetUser }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const isVIP = username.trim().toLowerCase() === 'tebdash';

  const handleStart = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onSetUser({ name: username.trim(), isVIP });
    onStart({ room: room.trim() || undefined });
  };

  return (
    <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Lobby</h2>
        {isVIP && (
          <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300">
            VIP Active
          </span>
        )}
      </div>

      <form onSubmit={handleStart} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-white ring-1 ring-inset ring-white/10">
          <User size={18} className="shrink-0 text-white/70" />
          <input
            className="w-full bg-transparent placeholder-white/50 outline-none"
            placeholder="Your name (TEBDASH for VIP)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
        </label>

        <label className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-white ring-1 ring-inset ring-white/10">
          <Lock size={18} className="shrink-0 text-white/70" />
          <input
            className="w-full bg-transparent placeholder-white/50 outline-none"
            placeholder="Room code (optional)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            aria-label="Room code"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white transition hover:bg-emerald-600"
        >
          <Play size={18} />
          Start Game
        </button>
      </form>

      <p className="mt-3 text-sm text-white/60">
        Share your name and a room code to play privately. Leave room empty to start a quick match.
      </p>
    </section>
  );
}
