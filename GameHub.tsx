/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Search, 
  Target, 
  Lock, 
  ChevronRight, 
  Trophy, 
  Settings, 
  User, 
  Volume2, 
  VolumeX, 
  Clock, 
  Grid,
  CheckCircle2,
  Calendar,
  Gamepad2,
  UserCheck,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserStats, Achievement, LeaderboardEntry } from './types';

interface GameHubProps {
  stats: UserStats;
  onSelectGame: (gameId: string, titleAm: string, titleEs: string) => void;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
}

// Fixed Achievements list
const achievementsList: Achievement[] = [
  { id: 'ach1', titleAm: 'Առաջին քայլեր', titleRu: 'Первые шаги', descAm: 'Հավաքիր քո առաջին 100 XP միավորը:', descRu: 'Наберите первые 100 XP.', iconName: '🚀', pointsReq: 100 },
  { id: 'ach2', titleAm: 'Աստղային վարպետ', titleRu: 'Звездный мастер', descAm: 'Հավաքիր 25 աստղ դպրոցական խաղերից:', descRu: 'Соберите 25 звезд.', iconName: '⭐', starsReq: 25 },
  { id: 'ach3', titleAm: 'Անսասան շարք', titleRu: 'Непобедимый', descAm: 'Կատարիր 5 անընդմեջ ճիշտ պատասխան:', descRu: '5 правильных ответов подряд.', iconName: '🔥', streakReq: 5 },
  { id: 'ach4', titleAm: 'Դպրոցի չեմպիոն', titleRu: 'Чемпион школы', descAm: 'Կատարիր 1000 XP միավոր և պատրաստվիր դպրոցին:', descRu: 'Наберите 1000 XP.', iconName: '🏆', pointsReq: 1000 }
];

// Leaderboard dummy players
const defaultLeaderboard: LeaderboardEntry[] = [
  { name: 'Լեո (Leo)', points: 1450, stars: 65 },
  { name: 'Սոֆիա (Sofia)', points: 1120, stars: 48 },
  { name: 'Մատեո (Mateo)', points: 980, stars: 42 },
  { name: 'Լուկաս (Lucas)', points: 740, stars: 30 },
  { name: 'Մարիա (Maria)', points: 620, stars: 25 }
];

// All 25 games/features structured perfectly
const gameHubModules = [
  { id: 'sentences', titleAm: '«Սահմանիր նախադասությունը»', titleEs: 'Sobe Sentence', descAm: 'Կազմի՛ր նախադասություններ պատահական բառերից:', cat: 'core', theme: 'школа', color: 'from-blue-500 to-indigo-600', icon: '📝' },
  { id: 'speed-translate', titleAm: '«Արագ թարգմանիր»', titleEs: 'Traduce Rápido', descAm: 'Գտի՛ր ճիշտ թարգմանությունը սահմանափակ ժամանակում:', cat: 'core', theme: 'разговорный', color: 'from-emerald-500 to-teal-600', icon: '⚡' },
  { id: 'backpack', titleAm: '«Դպրոցական պայուսակ»', titleEs: 'Mochila Escolar', descAm: 'Պատրաստի՛ր պայուսակդ՝ ընտրելով անհրաժեշտ պարագաները:', cat: 'core', theme: 'предметы', color: 'from-amber-500 to-orange-600', icon: '🎒' },
  { id: 'schedule', titleAm: '«Դասացուցակ»', titleEs: 'Horario Escolar', descAm: 'Կողմնորոշվի՛ր դասացուցակում և պատասխանի՛ր հարցերին:', cat: 'core', theme: 'школа', color: 'from-violet-500 to-purple-600', icon: '📅' },
  { id: 'teacher-says', titleAm: '«Ուսուցիչն ասում է»', titleEs: 'El Profesor Dice', descAm: 'Հասկացի՛ր դասարանական հրահանգներն ու գործողությունները:', cat: 'core', theme: 'разговорный', color: 'from-pink-500 to-rose-600', icon: '👩‍🏫' },
  { id: 'school-subject', titleAm: '«Գտիր առարկան»', titleEs: 'Asignaturas Escolares', descAm: 'Գուշակի՛ր առարկան իսպաներեն նկարագրության միջոցով:', cat: 'core', theme: 'школа', color: 'from-cyan-500 to-blue-600', icon: '🔍' },
  
  { id: 'math-quest', titleAm: '«Մաթեմատիկական քվեստ»', titleEs: 'Aventura Matemática', descAm: 'Լուծի՛ր մաթեմատիկական խնդիրներ իսպաներենով:', cat: 'math', theme: 'математика', color: 'from-indigo-500 to-purple-600', icon: '🧮' },
  { id: 'shop', titleAm: '«Դպրոցական խանութ»', titleEs: 'Tienda Escolar', descAm: 'Գնի՛ր անհրաժեշտ իրեր և հաշվի՛ր մնացորդը:', cat: 'math', theme: 'деньги', color: 'from-emerald-500 to-green-600', icon: '🪙' },
  { id: 'time', titleAm: '«Ժամը քանիսն է՞»', titleEs: '¿Qué Hora Es?', descAm: 'Սովորի՛ր ճանաչել ժամը և կապել այն դպրոցի հետ:', cat: 'math', theme: 'время', color: 'from-orange-500 to-amber-600', icon: '⏰' },
  { id: 'calendar', titleAm: '«Օրացույց»', titleEs: 'El Calendario', descAm: 'Պլանավորի՛ր քո քննություններն ու էքսկուրսիաները:', cat: 'math', theme: 'календарь', color: 'from-fuchsia-500 to-pink-600', icon: '📆' },

  { id: 'dialogue', titleAm: '«Դպրոցական երկխոսություն»', titleEs: 'Diálogos en la Escuela', descAm: 'Լրացրո՛ւ դասընկերների և ուսուցչի խոսակցությունը:', cat: 'dialog', theme: 'разговорный', color: 'from-sky-500 to-indigo-600', icon: '💬' },
  { id: 'what-would-you-say', titleAm: '«Ի՞նչ կասես այս դեպքում»', titleEs: '¿Qué Dirías Tú?', descAm: 'Գտի՛ր ճիշտ արձագանքը տարբեր իրավիճակներում:', cat: 'dialog', theme: 'разговорный', color: 'from-teal-500 to-emerald-600', icon: '💭' },
  { id: 'true-false', titleAm: '«Ճիշտ է թե Սխալ»', titleEs: 'Verdadero o Falso', descAm: 'Կարդա՛ պատմությունն ու գնահատի՛ր պնդումները:', cat: 'dialog', theme: 'школа', color: 'from-violet-500 to-indigo-600', icon: '✔️' },
  { id: 'error-detective', titleAm: '«Սխալների դետեկտիվ»', titleEs: 'Detective de Errores', descAm: 'Գտի՛ր քերականական սխալներն ու ուղղի՛ր դրանք:', cat: 'dialog', theme: 'школа', color: 'from-rose-500 to-orange-600', icon: '🕵️' },

  { id: 'odd-one-out', titleAm: '«Ավելորդ բառը»', titleEs: 'La Palabra Intrusa', descAm: 'Գտի՛ր տրված չորս բառերից ավելորդը:', cat: 'words', theme: 'предметы', color: 'from-purple-500 to-fuchsia-600', icon: '❌' },
  { id: 'match-pairs', titleAm: '«Գտիր զույգերը»', titleEs: 'Une las Parejas', descAm: 'Միացրո՛ւ իսպաներեն բառը հայերեն թարգմանության հետ:', cat: 'words', theme: 'предметы', color: 'from-blue-500 to-cyan-600', icon: '🔗' },
  { id: 'who-am-i', titleAm: '«Ո՞վ եմ ես»', titleEs: '¿Quién Soy Yo?', descAm: 'Գուշակի՛ր դպրոցական կամ սպորտային մասնագիտությունները:', cat: 'words', theme: 'школа', color: 'from-teal-500 to-blue-600', icon: '🧑‍💻' },
  { id: 'football-quiz', titleAm: '«Ֆուտբոլային վիկտորինա»', titleEs: 'Fútbol Quiz', descAm: 'Սովորի՛ր իսպանական ֆուտբոլային տերմիններն ու կանոնները:', cat: 'words', theme: 'футбол', color: 'from-emerald-600 to-green-700', icon: '⚽' },
  { id: 'word-labyrinth', titleAm: '«Բառերի լաբիրինթոս»', titleEs: 'Laberinto de Palabras', descAm: 'Անցի՛ր լաբիրինթոսը միայն ճիշտ խոսքի մասերով:', cat: 'words', theme: 'школа', color: 'from-indigo-600 to-rose-600', icon: '🌀' },
  { id: 'wheel', titleAm: '«Անակնկալների անիվ»', titleEs: 'Rueda de Tareas', descAm: 'Պտտի՛ր անիվը և ստացի՛ր պատահական խաղ:', cat: 'words', theme: 'школа', color: 'from-purple-600 to-pink-600', icon: '🎡' },

  { id: 'first-day', titleAm: '«Առաջին օրը դպրոցում»', titleEs: 'Mi Primer Día', descAm: 'Անցի՛ր 10-փուլանոց էպիկական ճանապարհորդություն:', cat: 'epic', theme: 'школа', color: 'from-rose-500 to-indigo-600 border-2 border-amber-400', icon: '🌟' },
  { id: 'error-monster', titleAm: '«Հաղթի՛ր սխալների հրեշին»', titleEs: 'Vence al Monstruo', descAm: 'Թուլացրո՛ւ հրեշին քո քերականական ճիշտ պատասխաններով:', cat: 'epic', theme: 'разговорный', color: 'from-red-600 to-purple-800', icon: '🐉' },
  { id: 'duel', titleAm: '«Երկու խաղացողի դուել»', titleEs: 'Duelo de Dos Jugadores', descAm: 'Խաղացե՛ք միասին նույն սարքի վրա և պարզե՛ք լավագույնին:', cat: 'epic', theme: 'школа', color: 'from-rose-600 to-orange-600', icon: '⚔️' },
  { id: 'story', titleAm: '«Ստեղծի՛ր քո պատմությունը»', titleEs: 'Crea tu Historia', descAm: 'Ընտրի՛ր կերպարներ, վայրեր և կազմի՛ր սեփական պատմությունը:', cat: 'epic', theme: 'разговорный', color: 'from-sky-500 to-violet-600', icon: '🎨' }
];

export default function GameHub({ stats, onSelectGame, onUpdateStats }: GameHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter categories
  const categories = [
    { id: 'all', title: 'Բոլոր խաղերը (Todos)' },
    { id: 'core', title: 'Հիմնական դպրոցական' },
    { id: 'math', title: 'Մաթեմատիկա' },
    { id: 'dialog', title: 'Հաղորդակցություն' },
    { id: 'words', title: 'Բառախաղեր' },
    { id: 'epic', title: 'Էպիկական առաքելություններ' }
  ];

  // Filter modules depending on search + category
  const filteredModules = gameHubModules.filter(m => {
    const matchesSearch = 
      m.titleAm.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.titleEs.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.descAm.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = activeCategory === 'all' || m.cat === activeCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate unlock progress for achievements
  const getAchievementProgress = (ach: Achievement) => {
    if (ach.pointsReq) {
      return { current: stats.points, target: ach.pointsReq, completed: stats.points >= ach.pointsReq };
    }
    if (ach.starsReq) {
      return { current: stats.stars, target: ach.starsReq, completed: stats.stars >= ach.starsReq };
    }
    if (ach.streakReq) {
      return { current: stats.highestStreak, target: ach.streakReq, completed: stats.highestStreak >= ach.streakReq };
    }
    return { current: 0, target: 1, completed: false };
  };

  // Build high-scores board
  const fullLeaderboard = [
    ...defaultLeaderboard,
    { name: 'Դու (Tú) 🧑‍🚀', points: stats.points, stars: stats.stars, isCurrentUser: true }
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8" id="game_center_hub">
      
      {/* 1. VISUALLY MAGNIFICENT BENTO HERO - HERO STATS CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Child Profile Bento Card */}
        <div className="lg:col-span-2 bg-slate-900/60 text-white rounded-[2rem] p-6 md:p-8 border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Decorative glowing sphere */}
          <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center text-3xl shadow-lg border-2 border-white/20 shadow-orange-500/20 text-slate-900 font-bold">
                👦
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-extrabold font-display tracking-tight text-white">Իսպաներենի Ակադեմիա</h2>
                  <span className="bg-sky-500/20 border border-sky-400/30 text-sky-400 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">12 տարեկան</span>
                </div>
                <p className="text-sm font-sans text-slate-400 mt-1">Պատրաստվի՛ր Իսպանիայի դպրոցին հետաքրքիր խաղերով։</p>
              </div>
            </div>

            {/* Level Badge */}
            <div className="flex items-center gap-2 bg-slate-800/50 border border-white/5 px-4 py-2 rounded-2xl">
              <span className="text-xs uppercase font-mono text-slate-400 block font-bold">Մակարդակ</span>
              <span className="text-xl font-extrabold font-sans text-sky-400">{stats.level}</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="bg-slate-950/60 border border-white/5 p-5 rounded-2xl mb-6 z-10">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Փորձ (XP)</span>
              <span className="font-bold text-slate-200">Դեպի հաջորդ մակարդակ՝ {stats.xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(10, (stats.points % 150) / 1.5))}%` }}
              />
            </div>
          </div>

          {/* Points, Stars and Streak badges */}
          <div className="grid grid-cols-3 gap-3 z-10">
            <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl flex items-center gap-3 transition hover:bg-white/10">
              <Award className="text-amber-400 w-6 h-6 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Միավորներ</span>
                <span className="text-sm md:text-base font-extrabold font-sans text-white">{stats.points} XP</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl flex items-center gap-3 transition hover:bg-white/10">
              <Sparkles className="text-sky-400 w-6 h-6 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Աստղեր</span>
                <span className="text-sm md:text-base font-extrabold font-sans text-white">{stats.stars} ★</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl flex items-center gap-3 transition hover:bg-white/10">
              <Flame className="text-rose-500 w-6 h-6 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Բարձրագույն շարք</span>
                <span className="text-sm md:text-base font-extrabold font-sans text-white">{stats.highestStreak} ճիշտ</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. DAILY MISSIONS PANEL (Immersive UI style) */}
        <div className="bg-slate-900/60 border border-white/10 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="text-rose-500 w-5 h-5" />
                <h3 className="text-xs font-bold uppercase text-slate-400">Ամենօրյա Առաքելություններ</h3>
              </div>
              <span className="text-blue-400 font-mono text-xs font-bold">
                {stats.dailyMissions.filter(m => m.completed).length}/{stats.dailyMissions.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {stats.dailyMissions.map(m => (
                <div 
                  key={m.id} 
                  className={`p-3 rounded-2xl flex items-start gap-3 relative overflow-hidden border transition-all ${
                    m.completed 
                      ? 'bg-blue-600/20 border-blue-500/30' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="p-1.5 bg-slate-800 rounded-lg text-lg shrink-0">
                    {m.type === 'sentences' && '📝'}
                    {m.type === 'translations' && '⚡'}
                    {m.type === 'math' && '🧮'}
                    {m.type === 'words' && '🔗'}
                    {m.type === 'dialogues' && '💬'}
                    {m.type === 'errors' && '🕵️'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-sans font-bold text-slate-100 leading-snug">{m.titleAm}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${m.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${(m.current / m.target) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">{m.current}/{m.target}</span>
                    </div>
                  </div>

                  {m.completed && (
                    <div className="absolute inset-y-0 right-3 flex items-center justify-center">
                      <CheckCircle2 className="text-emerald-400 w-5 h-5 fill-slate-900" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 mt-4 pt-3 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-sans">Բոլորն ավարտելու դեպքում՝</span>
            <span className="text-xs font-bold text-amber-400 font-sans">+50 XP / +5 ★</span>
          </div>
        </div>
      </div>

      {/* 3. FILTERING & SEARCH CONTROLS */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-slate-900/40 p-4 rounded-[2rem] border border-white/10 backdrop-blur-md">
        
        {/* Category tags */}
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-sans transition ${
                activeCategory === c.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" size={16} />
          <input
            type="text"
            id="search_games_input"
            placeholder="Փնտրել խաղեր..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-sans text-white outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
          />
        </div>
      </div>

      {/* 4. MAIN GAMES AND STORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredModules.map((game, index) => {
          const isCompleted = stats.completedThemes.includes(game.id);

          return (
            <div
              key={game.id}
              id={`game_card_${game.id}`}
              onClick={() => onSelectGame(game.id, game.titleAm, game.titleEs)}
              className="group relative bg-slate-900/40 hover:bg-slate-800/60 border border-white/10 rounded-[2rem] p-6 cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
            >
              <div>
                {/* Reward Bubble / Completed Status on top-right */}
                {isCompleted ? (
                  <div className="absolute top-6 right-6 w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xs" title="Ավարտված">
                    ✓
                  </div>
                ) : (
                  <div className="absolute top-6 right-6 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform font-bold text-xs">
                    +{game.cat === 'epic' ? '50' : '20'}
                  </div>
                )}

                <div className="text-4xl mb-4 w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
                  {game.icon}
                </div>

                <h4 className="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition-colors leading-snug font-display">
                  {game.titleAm}
                </h4>
                <p className="text-xs font-mono text-slate-400 mb-3">{game.titleEs}</p>
                
                <p className="text-xs font-sans text-slate-300 leading-relaxed mb-6">
                  {game.descAm}
                </p>
              </div>

              {/* Tag row and Play prompt */}
              <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/5 mt-auto">
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-blue-400 border border-white/5 font-bold uppercase tracking-wider font-mono">
                    {game.theme}
                  </span>
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-orange-400 border border-white/5 font-bold uppercase tracking-wider font-mono">
                    12 տարեկան
                  </span>
                </div>
                <span className="text-xs font-bold text-blue-400 font-sans flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  Խաղալ
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}

        {filteredModules.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-900/40 border border-dashed border-white/10 rounded-[2rem] backdrop-blur-sm">
            <span className="text-4xl mb-3 block">🔍</span>
            <p className="text-slate-400 font-sans text-sm">Ոչինչ չի գտնվել ձեր որոնմամբ:</p>
          </div>
        )}
      </div>

      {/* 5. DUAL ACHIEVEMENTS & LEADERBOARD SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Achievements list */}
        <div className="bg-slate-900/60 border border-white/10 rounded-[2rem] p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="text-amber-400 w-5 h-5" />
            <h3 className="text-xs font-bold uppercase text-slate-400 font-display">Նվաճումներ (Logros)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievementsList.map(ach => {
              const prog = getAchievementProgress(ach);
              const unlocked = stats.unlockedAchievements.includes(ach.id) || prog.completed;

              return (
                <div 
                  key={ach.id}
                  className={`p-4 rounded-2xl flex items-start gap-3 transition border ${
                    unlocked 
                      ? 'bg-amber-500/5 border-amber-500/20 text-white hover:bg-amber-500/10' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className={`text-2xl p-2 rounded-xl bg-slate-950 ${unlocked ? 'grayscale-0' : 'grayscale'}`}>
                    {ach.iconName}
                  </div>

                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${unlocked ? 'text-amber-400 font-display' : 'text-slate-450'}`}>
                      {ach.titleAm}
                    </p>
                    <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">{ach.descAm}</p>
                    
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <div className="flex-1 h-1 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${unlocked ? 'bg-amber-400' : 'bg-slate-700'}`}
                          style={{ width: `${(prog.current / prog.target) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0 font-bold">{prog.current}/{prog.target}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard panel */}
        <div className="bg-slate-900/60 border border-white/10 rounded-[2rem] p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="text-emerald-400 w-5 h-5" />
            <h3 className="text-xs font-bold uppercase text-slate-400 font-display">Լավագույն Արդյունքներ (Tabla)</h3>
          </div>

          <div className="flex flex-col gap-2.5">
            {fullLeaderboard.map((player, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl flex items-center justify-between gap-4 transition border ${
                  player.isCurrentUser 
                    ? 'bg-blue-600/20 border-blue-500/30 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg text-center leading-6 text-[10px] font-bold block ${
                    idx === 0 ? 'bg-amber-400 text-slate-950' : 
                    idx === 1 ? 'bg-slate-300 text-slate-950' : 
                    idx === 2 ? 'bg-amber-600 text-white' : 
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs font-sans font-bold block truncate max-w-[150px]">{player.name}</span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono font-bold shrink-0">
                  <span className="text-slate-300">{player.points} XP</span>
                  <span className="text-amber-400">{player.stars} ★</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
