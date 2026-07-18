/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles, Volume2, VolumeX, Settings, RefreshCw, Star } from 'lucide-react';
import GameHub from './GameHub';
import GameRoom from './GameRoom';
import Confetti from './Confetti';
import { UserStats, DailyMission, Difficulty } from './types';

const STORAGE_KEY = 'academia_es_kids_stats_v1';

const defaultMissions: DailyMission[] = [
  { id: 'm1', type: 'sentences', titleAm: 'Կազմի՛ր 3 նախադասություն', titleRu: 'Собрать 3 предложения', target: 3, current: 0, rewardPoints: 20, rewardStars: 2, completed: false },
  { id: 'm2', type: 'translations', titleAm: 'Արագ թարգմանի՛ր 5 բառ', titleRu: 'Перевести 5 слов', target: 5, current: 0, rewardPoints: 15, rewardStars: 1, completed: false },
  { id: 'm3', type: 'math', titleAm: 'Լուծի՛ր 2 մաթեմատիկական քվեստ', titleRu: 'Решить 2 мат. квеста', target: 2, current: 0, rewardPoints: 25, rewardStars: 2, completed: false }
];

const initialStats: UserStats = {
  points: 0,
  stars: 0,
  level: 1,
  xpToNextLevel: 100,
  currentStreak: 0,
  highestStreak: 0,
  unlockedAchievements: [],
  completedThemes: [],
  dailyMissions: defaultMissions,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

export default function App() {
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [activeGame, setActiveGame] = useState<{ id: string; titleAm: string; titleEs: string } | null>(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerEnabled, setTimerEnabled] = useState(false);

  // Load stats on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: UserStats = JSON.parse(stored);
        
        // Handle daily mission reset based on date
        const todayStr = new Date().toISOString().split('T')[0];
        if (parsed.lastActiveDate !== todayStr) {
          parsed.dailyMissions = defaultMissions;
          parsed.lastActiveDate = todayStr;
        }

        setStats(parsed);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStats));
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    }
  }, []);

  // Save stats whenever stats change
  const handleUpdateStats = (updater: (prev: UserStats) => UserStats) => {
    setStats(prev => {
      const updated = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return updated;
    });
  };

  const handleTriggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, 4000);
  };

  const handleResetProgress = () => {
    if (window.confirm('Վստա՞հ եք, որ ուզում եք զրոյացնել ողջ առաջընթացը, միավորները և նվաճումները։')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStats));
      setStats(initialStats);
      setActiveGame(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative overflow-x-hidden" id="main_app_wrapper">
      
      {/* Background Atmospheric Glows from Immersive UI */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* CONFETTI OVERLAY */}
      <Confetti active={confettiActive} />

      {/* VISUALLY ENGAGING NAVIGATION BAR (Immersive UI style) */}
      <header className="sticky top-0 z-40 bg-slate-900/40 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 h-20 flex items-center justify-between">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & title */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveGame(null)}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-lg shadow-orange-500/20 text-slate-900 transition hover:scale-105 duration-300">
              Ա
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wider text-slate-300 uppercase leading-none font-display">
                Խաղային Կենտրոն
              </h1>
              <p className="text-xs text-blue-400 mt-1">
                Մակարդակ {stats.level} • {difficulty === 'easy' ? 'Հեշտ' : difficulty === 'medium' ? 'Միջին' : 'Դժվար'}
              </p>
            </div>
          </div>

          {/* Stats quick pill and settings (Immersive UI style) */}
          <div className="flex items-center gap-4">
            
            {/* Stats bar */}
            <div className="hidden md:flex gap-6 items-center bg-slate-800/50 px-6 py-2 rounded-full border border-white/5">
              <div className="flex items-center gap-2" title="Աստղեր">
                <span className="text-amber-400">⭐</span>
                <span className="font-mono font-bold text-base text-white">{stats.stars}</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-2" title="Շարք">
                <span className="text-orange-500">🔥</span>
                <span className="font-mono font-bold text-base text-white">{stats.currentStreak} Օր</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-2" title="Միավորներ">
                <span className="text-blue-400">🏆</span>
                <span className="font-mono font-bold text-base text-slate-300">{stats.points} XP</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5 text-xs mr-1">
                <button 
                  onClick={() => setDifficulty('easy')} 
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${difficulty === 'easy' ? 'bg-blue-600 shadow-md text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Հեշտ
                </button>
                <button 
                  onClick={() => setDifficulty('medium')} 
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${difficulty === 'medium' ? 'bg-blue-600 shadow-md text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Միջին
                </button>
                <button 
                  onClick={() => setDifficulty('hard')} 
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${difficulty === 'hard' ? 'bg-blue-600 shadow-md text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Դժվար
                </button>
              </div>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${soundEnabled ? 'bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30' : 'bg-slate-800 border-white/10 text-slate-400 hover:bg-slate-700'}`}
                title={soundEnabled ? "Անջատել ձայնը (Silenciar)" : "Միացնել ձայնը (Activar sonido)"}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                onClick={handleResetProgress}
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-slate-700 border border-white/10 text-slate-400 hover:text-rose-400 transition-all"
                title="Զրոյացնել առաջընթացը"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-grow z-10 relative">
        {activeGame ? (
          <GameRoom
            gameId={activeGame.id}
            gameTitleAm={activeGame.titleAm}
            gameTitleEs={activeGame.titleEs}
            difficulty={difficulty}
            stats={stats}
            onUpdateStats={handleUpdateStats}
            onBack={() => setActiveGame(null)}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            timerEnabled={timerEnabled}
            onTriggerConfetti={handleTriggerConfetti}
          />
        ) : (
          <GameHub
            stats={stats}
            onSelectGame={(id, titleAm, titleEs) => {
              setActiveGame({ id, titleAm, titleEs });
            }}
            onUpdateStats={handleUpdateStats}
          />
        )}
      </main>

      {/* FOOTER METRICS (Immersive UI style) */}
      <footer className="h-16 w-full bg-slate-900 px-6 md:px-8 flex items-center justify-between border-t border-white/5 z-10">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Համակարգը Պատրաստ է — Միացեք Խաղին
            </p>
          </div>
          <div className="flex gap-6 text-[10px] font-bold text-slate-400">
            <span className="cursor-pointer hover:text-white transition">ՕԳՆՈՒԹՅՈՒՆ</span>
            <span className="cursor-pointer hover:text-white transition">ԿԱՆՈՆՆԵՐ</span>
            <span className="cursor-pointer hover:text-white transition">ԱՌԱՋԱԴԻՄՈՒԹՅՈՒՆ</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
