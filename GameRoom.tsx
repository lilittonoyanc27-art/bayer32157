/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  ArrowLeft, 
  Award, 
  Flame, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  User, 
  Coins, 
  ShoppingBag,
  Swords,
  BookOpen,
  Calendar,
  Gamepad2,
  Trash2,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  getQuestionsForGame, 
  backpackItems, 
  scheduleDays, 
  storyOptions, 
  generateDuelQuestions,
  firstDayMissionSteps
} from './gamesData';
import { Difficulty, UserStats, StoryOption } from './types';

// Helper component for clicking Spanish questions to open in Armenian
function ClickToReveal({ textEs, textAm, currentIndex }: { textEs: string; textAm: string; currentIndex: number }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [currentIndex]);

  return (
    <div 
      onClick={() => setRevealed(prev => !prev)}
      className="cursor-pointer group select-none p-5 rounded-2xl bg-slate-950/45 hover:bg-slate-950/75 border border-dashed border-white/10 hover:border-blue-500/30 text-center transition-all duration-200 shadow-inner w-full"
      title="Կտտացրու հայերեն թարգմանությունը տեսնելու համար / Нажми для перевода"
    >
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <p className="text-base md:text-lg font-bold font-sans text-sky-450 group-hover:text-blue-400 transition-colors leading-relaxed">
          {textEs}
        </p>
        <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
          {revealed ? '👁️ Բացված' : '👁️‍🗨️ Թարգմանել'}
        </span>
      </div>
      
      {revealed ? (
        <p className="text-sm md:text-base font-sans text-slate-200 mt-3 border-t border-white/5 pt-2.5 animate-fade-in">
          {textAm}
        </p>
      ) : (
        <p className="text-xs font-sans text-slate-500 mt-2 group-hover:text-slate-400 transition-colors">
          Կտտացրու իսպաներեն հարցին՝ թարգմանությունը բացելու համար
        </p>
      )}
    </div>
  );
}

// Helper component for dialogue speech bubbles
function DialogBubble({ speaker, text, translationAm }: { speaker: string; text: string; translationAm: string; key?: any }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div 
      onClick={() => setRevealed(prev => !prev)}
      className="flex flex-col gap-1 items-start max-w-[85%] bg-slate-700/50 p-3 rounded-2xl border border-slate-600/30 cursor-pointer select-none transition hover:bg-slate-700/85 w-full"
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold text-sky-400">{speaker}:</span>
        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 bg-slate-900/40 px-1.5 py-0.5 rounded">
          {revealed ? '👁️' : '👁️‍🗨️ Թարգմանել'}
        </span>
      </div>
      <p className="text-sm font-sans font-medium text-white">{text}</p>
      {revealed && (
        <p className="text-xs text-slate-300 font-sans mt-0.5 border-t border-white/5 pt-1 w-full animate-fade-in">
          {translationAm}
        </p>
      )}
    </div>
  );
}

interface GameRoomProps {
  gameId: string;
  gameTitleAm: string;
  gameTitleEs: string;
  difficulty: Difficulty;
  stats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  onBack: () => void;
  soundEnabled: boolean;
  onToggleSound?: () => void;
  timerEnabled: boolean;
  onTriggerConfetti: () => void;
}

export default function GameRoom({
  gameId,
  gameTitleAm,
  gameTitleEs,
  difficulty: initialDifficulty,
  stats,
  onUpdateStats,
  onBack,
  soundEnabled: initialSoundEnabled,
  onToggleSound,
  timerEnabled: initialTimerEnabled,
  onTriggerConfetti
}: GameRoomProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [soundEnabled, setSoundEnabled] = useState(initialSoundEnabled);
  const [timerEnabled, setTimerEnabled] = useState(initialTimerEnabled);

  // Synchronize sound enabled state with the parent
  useEffect(() => {
    setSoundEnabled(initialSoundEnabled);
  }, [initialSoundEnabled]);

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Game state
  const [selectedWords, setSelectedWords] = useState<string[]>([]); // For Sentence Builder
  const [backpackSelected, setBackpackSelected] = useState<string[]>([]); // For Backpack Game
  const [matchPairsSelected, setMatchPairsSelected] = useState<{ leftId: string | null; rightId: string | null }>({ leftId: null, rightId: null });
  const [completedPairs, setCompletedPairs] = useState<string[]>([]); // Matched item ids/keys
  const [storyState, setStoryState] = useState<{ currentStep: number; selections: string[]; customStory: string[] }>({
    currentStep: 0,
    selections: [],
    customStory: []
  });

  // Dual Player state
  const [duelPlayers, setDuelPlayers] = useState<{ p1: string; p2: string; p1Score: number; p2Score: number; activePlayer: 1 | 2; winner: string | null }>({
    p1: 'Խաղացող 1',
    p2: 'Խաղացող 2',
    p1Score: 0,
    p2Score: 0,
    activePlayer: 1,
    winner: null
  });
  const [duelStage, setDuelStage] = useState<'setup' | 'playing' | 'ended'>('setup');
  const [duelRound, setDuelRound] = useState(0);
  const [duelQuestionsList, setDuelQuestionsList] = useState<any[]>([]);

  // Wheel of Fortune State
  const [wheelDegree, setWheelDegree] = useState(0);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResultGame, setWheelResultGame] = useState<any | null>(null);

  // Monster HP
  const [monsterHp, setMonsterHp] = useState(100);
  const [monsterMaxHp] = useState(100);

  // Common interactive state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSecondTry, setIsSecondTry] = useState(false);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean; explanation: string }>({
    isCorrect: false,
    show: false,
    explanation: ''
  });
  const [hintUsed, setHintUsed] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load questions
  useEffect(() => {
    setLoading(true);
    setCurrentIndex(0);
    setFeedback({ isCorrect: false, show: false, explanation: '' });
    setSelectedWords([]);
    setBackpackSelected([]);
    setCompletedPairs([]);
    setHintUsed(false);
    setHintMessage(null);
    setIsSecondTry(false);
    setHasFailedOnce(false);

    if (gameId === 'first-day') {
      setQuestions(firstDayMissionSteps);
    } else if (gameId === 'duel') {
      const qList = generateDuelQuestions();
      setDuelQuestionsList(qList);
      setQuestions(qList);
    } else {
      const loaded = getQuestionsForGame(gameId, difficulty);
      // Shuffle loaded questions
      const shuffled = [...loaded].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
    }
    setLoading(false);
  }, [gameId, difficulty]);

  // Handle active task timer
  useEffect(() => {
    if (loading || questions.length === 0 || !timerEnabled || feedback.show || gameId === 'story' || gameId === 'duel' || gameId === 'first-day') return;

    const currentTask = questions[currentIndex];
    const initialTime = currentTask?.timeLimit || 15;
    setTimeLeft(initialTime);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, questions, loading, timerEnabled, feedback.show]);

  // Speech synthesis speaker
  const speakSpanish = (text: string) => {
    if (!soundEnabled) return;
    try {
      window.speechSynthesis.cancel();
      // Remove Spanish brackets/helpers for cleaner speech
      const cleanedText = text.replace(/¿|!|¡|\?|\(.*?\)/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis failed to launch:', e);
    }
  };

  const speakArmenian = (text: string) => {
    if (!soundEnabled) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hy-AM';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis for Armenian failed:', e);
    }
  };

  // Play interface sounds using synth fallback to avoid files
  const playSoundEffect = (type: 'correct' | 'wrong' | 'victory') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(147, ctx.currentTime + 0.15); // D3
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'victory') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
        notes.forEach((freq, idx) => {
          const individualOsc = ctx.createOscillator();
          const individualGain = ctx.createGain();
          individualOsc.connect(individualGain);
          individualGain.connect(ctx.destination);
          individualOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          individualGain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.1);
          individualGain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + idx * 0.1 + 0.4);
          individualOsc.start(ctx.currentTime + idx * 0.1);
          individualOsc.stop(ctx.currentTime + idx * 0.1 + 0.45);
        });
      }
    } catch (e) {
      // Audio fallback silent
    }
  };

  const handleTimeOut = () => {
    playSoundEffect('wrong');
    setFeedback({
      isCorrect: false,
      show: true,
      explanation: 'Ժամանակն սպառվեց։ Փորձիր ավելի արագ պատասխանել հաջորդ հարցին։'
    });
    setHasFailedOnce(true);
    // Reset streak
    onUpdateStats(prev => ({
      ...prev,
      currentStreak: 0
    }));
  };

  const handleGetHint = () => {
    if (hintUsed) return;
    setHintUsed(true);
    const task = questions[currentIndex];
    
    // Custom hints depending on games
    if (gameId === 'sentences') {
      const firstWord = task.correctSentence.split(' ')[0];
      setHintMessage(`Հուշում. Նախադասությունը սկսվում է «${firstWord}» բառով:`);
    } else if (gameId === 'speed-translate' || gameId === 'school-subject' || gameId === 'who-am-i' || gameId === 'football-quiz' || gameId === 'error-monster') {
      const correct = task.correctAnswer || task.correctAnswerEs || task.correctSubjectEs || task.correctJobEs;
      setHintMessage(`Հուշում. Ճիշտ պատասխանը սկսվում է «${correct.substring(0, 2)}» տառերով:`);
    } else if (gameId === 'backpack') {
      const itemNames = task.requiredItemIds.map((id: string) => {
        const item = backpackItems.find(b => b.id === id);
        return item ? `«${item.nameEs}» (${item.nameAm})` : '';
      }).join(', ');
      setHintMessage(`Հուշում. Քեզ անհրաժեշտ է դնել՝ ${itemNames}:`);
    } else if (gameId === 'math-quest') {
      setHintMessage(`Հուշում. Լուծումը ներառում է հետևյալ գործողությունը՝ ${task.solutionAm.split(':')[0]}:`);
    } else if (gameId === 'time') {
      setHintMessage(`Հուշում. Իսպաներենով ժամը ցույց տալու համար օգտագործում ենք «Son las...» կամ «Es la...»:`);
    } else {
      setHintMessage(`Հուշում. Ուշադիր կարդա թարգմանությունը կամ տարբերակները:`);
    }
  };

  const handleSubmitAnswer = (answer: string) => {
    const task = questions[currentIndex];
    let isCorrect = false;
    let explanation = '';

    // Clear previous timer
    if (timerRef.current) clearInterval(timerRef.current);

    // Dynamic checks
    if (gameId === 'sentences') {
      const userSentence = selectedWords.join(' ');
      isCorrect = userSentence.trim().toLowerCase() === task.correctSentence.trim().toLowerCase();
      explanation = `Ճիշտ նախադասությունը՝ «${task.correctSentence}»։\nԱրտասանությունն ու թարգմանությունը՝ «${task.translationAm}»`;
    } else if (gameId === 'speed-translate') {
      isCorrect = answer === task.correctAnswer;
      explanation = `Ճիշտ պատասխանն է՝ «${task.correctAnswer}»։`;
    } else if (gameId === 'backpack') {
      // Compare arrays
      const reqSorted = [...task.requiredItemIds].sort();
      const selSorted = [...backpackSelected].sort();
      isCorrect = JSON.stringify(reqSorted) === JSON.stringify(selSorted);
      explanation = `Ճիշտ պատասխանեցիր։ Պայուսակը պատրաստ է դպրոցի համար։`;
    } else if (gameId === 'schedule') {
      isCorrect = answer === task.correctAnswer;
      explanation = `Ճիշտ պատասխանն է՝ «${task.correctAnswer}»։`;
    } else if (gameId === 'teacher-says') {
      isCorrect = answer === 'correct' || answer === task.commandEs;
      explanation = task.explanationAm;
    } else if (gameId === 'school-subject') {
      isCorrect = answer === task.correctSubjectEs;
      explanation = `Առարկան է՝ «${task.correctSubjectEs}» (${task.correctSubjectAm})։`;
    } else if (gameId === 'math-quest') {
      isCorrect = answer === task.correctAnswer;
      explanation = `Լուծում՝ ${task.solutionAm}`;
    } else if (gameId === 'shop') {
      isCorrect = answer === task.correctAnswer;
      explanation = `Մնացած գումարը՝ ${task.correctAnswer}։`;
    } else if (gameId === 'time') {
      isCorrect = answer === task.correctAnswerEs;
      explanation = `Ճիշտ ժամն է՝ «${task.correctAnswerEs}»։`;
    } else if (gameId === 'calendar') {
      isCorrect = answer === task.correctAnswer;
      explanation = `Ճիշտ պատասխանն է՝ ${task.correctAnswer}։`;
    } else if (gameId === 'dialogue') {
      isCorrect = answer === task.correctMissingPhrase;
      explanation = `Ճիշտ պատասխանն է՝ «${task.correctMissingPhrase}»։`;
    } else if (gameId === 'what-would-you-say') {
      isCorrect = answer === task.correctAnswerEs;
      explanation = task.explanationAm;
    } else if (gameId === 'true-false') {
      const val = answer === 'true';
      isCorrect = val === task.isTrue;
      explanation = `Ճիշտ պատասխանն է՝ ${task.isTrue ? 'Ճիշտ է (Verdadero)' : 'Սխալ է (Falso)'}։`;
    } else if (gameId === 'error-detective') {
      isCorrect = answer === task.correctSentenceEs;
      explanation = task.explanationAm;
    } else if (gameId === 'odd-one-out') {
      isCorrect = answer === task.oddWordEs;
      explanation = task.explanationAm;
    } else if (gameId === 'who-am-i') {
      isCorrect = answer === task.correctJobEs;
      explanation = `Ճիշտ պատասխանն է՝ «${task.correctJobEs}» (${task.correctJobAm})։`;
    } else if (gameId === 'football-quiz') {
      isCorrect = answer === task.correctAnswerEs;
      explanation = task.commentaryTemplate || `Ճիշտ պատասխանն է՝ ${task.correctAnswerEs}։`;
    } else if (gameId === 'word-labyrinth') {
      isCorrect = answer === 'success';
      explanation = `Հիանալի՛ է, դու անցար բառերի լաբիրինթոսը։`;
    } else if (gameId === 'error-monster') {
      isCorrect = answer === task.correctAnswerEs;
      explanation = task.explanationAm;
    } else if (gameId === 'first-day') {
      isCorrect = answer === task.correctAnswer;
      explanation = task.feedbackSuccessAm;
    }

    if (isCorrect) {
      playSoundEffect('correct');
      // Speak the spanish answer/sentence to practice audios
      const speakText = task.correctSentence || task.correctAnswerEs || task.correctSubjectEs || task.correctJobEs || task.commandEs || task.correctSentenceEs || answer;
      if (typeof speakText === 'string') {
        speakSpanish(speakText);
      }

      // Calculate reward points
      let pts = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 25;
      let str = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;

      if (hintUsed) {
        pts = Math.round(pts * 0.6); // Less points if hint used
      }
      if (isSecondTry) {
        pts = Math.round(pts * 0.5); // Less points if second try
      }

      setFeedback({
        isCorrect: true,
        show: true,
        explanation: explanation || 'Հիանալի՛ պատասխան։'
      });

      // Update statistics
      onUpdateStats(prev => {
        const nextStreak = prev.currentStreak + 1;
        const nextHighestStreak = Math.max(prev.highestStreak, nextStreak);
        const xpGained = pts;
        const nextXp = prev.xpToNextLevel - xpGained;
        let nextLvl = prev.level;
        let finalXpToNext = nextXp;

        if (nextXp <= 0) {
          nextLvl += 1;
          finalXpToNext = 150 * nextLvl + nextXp; // dynamic level scaling
          onTriggerConfetti();
          playSoundEffect('victory');
        }

        // Add progress to current daily missions
        const updatedMissions = prev.dailyMissions.map(m => {
          let progress = m.current;
          if (m.type === 'sentences' && gameId === 'sentences') progress += 1;
          if (m.type === 'translations' && gameId === 'speed-translate') progress += 1;
          if (m.type === 'math' && gameId === 'math-quest') progress += 1;
          if (m.type === 'words' && (gameId === 'odd-one-out' || gameId === 'match-pairs')) progress += 1;
          if (m.type === 'dialogues' && gameId === 'dialogue') progress += 1;
          if (m.type === 'errors' && gameId === 'error-detective') progress += 1;

          const isNowCompleted = progress >= m.target && !m.completed;
          return {
            ...m,
            current: Math.min(progress, m.target),
            completed: progress >= m.target
          };
        });

        return {
          ...prev,
          points: prev.points + pts,
          stars: prev.stars + str,
          level: nextLvl,
          xpToNextLevel: finalXpToNext,
          currentStreak: nextStreak,
          highestStreak: nextHighestStreak,
          dailyMissions: updatedMissions
        };
      });

      // SLAY MONSTER HP REDUCTION
      if (gameId === 'error-monster') {
        setMonsterHp(prev => Math.max(0, prev - (difficulty === 'easy' ? 25 : difficulty === 'medium' ? 35 : 50)));
      }

    } else {
      playSoundEffect('wrong');
      // Speak error explanation
      speakArmenian(explanation || 'Փորձի՛ր նորից։');

      if (!isSecondTry && !hasFailedOnce) {
        // Allow a second attempt
        setIsSecondTry(true);
        setFeedback({
          isCorrect: false,
          show: true,
          explanation: `Սխալ պատասխան: Փորձի՛ր ևս մեկ անգամ:\n${explanation || 'Ուշադիր եղիր:'}`
        });
      } else {
        // Complete failure for this round
        setFeedback({
          isCorrect: false,
          show: true,
          explanation: `Սխալ պատասխան։\n${explanation || 'Հաջորդ անգամ ավելի լավ կստացվի:'}`
        });
        setHasFailedOnce(true);
        // Reset streak
        onUpdateStats(prev => ({
          ...prev,
          currentStreak: 0
        }));
      }
    }
  };

  const handleNextQuestion = () => {
    setFeedback({ isCorrect: false, show: false, explanation: '' });
    setSelectedWords([]);
    setBackpackSelected([]);
    setCompletedPairs([]);
    setHintUsed(false);
    setHintMessage(null);
    setIsSecondTry(false);

    // If monster is defeated
    if (gameId === 'error-monster' && monsterHp <= 0) {
      onTriggerConfetti();
      playSoundEffect('victory');
      onUpdateStats(prev => ({
        ...prev,
        points: prev.points + 50,
        stars: prev.stars + 5
      }));
      setMonsterHp(100);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed theme/game completely
      onTriggerConfetti();
      playSoundEffect('victory');
      
      // Update theme completion
      onUpdateStats(prev => {
        const alreadyCompleted = prev.completedThemes.includes(gameId);
        const updatedCompleted = alreadyCompleted ? prev.completedThemes : [...prev.completedThemes, gameId];
        
        // Bonus for theme completion
        const bonusPts = alreadyCompleted ? 0 : 100;
        const bonusStars = alreadyCompleted ? 0 : 10;
        
        return {
          ...prev,
          points: prev.points + bonusPts,
          stars: prev.stars + bonusStars,
          completedThemes: updatedCompleted
        };
      });

      alert(`Շնորհավորո՜ւմ ենք: Դու հաջողությամբ ավարտեցիր այս խաղը և ստացար լրացուցիչ պարգևներ։`);
      onBack();
    }
  };

  // Sentence Builder helpers
  const handleWordClick = (word: string) => {
    setSelectedWords(prev => {
      if (prev.includes(word)) {
        return prev.filter(w => w !== word);
      } else {
        return [...prev, word];
      }
    });
  };

  // Match pairs click helper
  const handlePairClick = (id: string, side: 'left' | 'right') => {
    setMatchPairsSelected(prev => {
      const next = { ...prev };
      if (side === 'left') {
        next.leftId = next.leftId === id ? null : id;
      } else {
        next.rightId = next.rightId === id ? null : id;
      }

      // Check match if both selected
      const currentTask = questions[currentIndex];
      if (next.leftId && next.rightId) {
        // Find if correct pairing
        const leftPair = currentTask.pairs.find((p: any) => p.id === next.leftId);
        const rightPair = currentTask.pairs.find((p: any) => p.id === next.rightId);

        if (leftPair && rightPair && leftPair.id === rightPair.id) {
          // It's a match!
          playSoundEffect('correct');
          setCompletedPairs(curr => [...curr, leftPair.id]);
          next.leftId = null;
          next.rightId = null;

          // Check if all pairs matched
          if (completedPairs.length + 1 === currentTask.pairs.length) {
            setTimeout(() => {
              handleSubmitAnswer('success');
            }, 500);
          }
        } else {
          playSoundEffect('wrong');
          // Reset selection shortly
          setTimeout(() => {
            setMatchPairsSelected({ leftId: null, rightId: null });
          }, 600);
        }
      }

      return next;
    });
  };

  // Story constructor handler
  const handleStorySelection = (value: string) => {
    const nextStep = storyState.currentStep + 1;
    const updatedSelections = [...storyState.selections, value];

    if (nextStep < 5) {
      setStoryState(prev => ({
        ...prev,
        currentStep: nextStep,
        selections: updatedSelections
      }));
    } else {
      // Completed building 5 elements
      const finalStoryEs = `${updatedSelections[0]} ${updatedSelections[1]} ${updatedSelections[2]} ${updatedSelections[4]} ${updatedSelections[3]}.`;
      
      onTriggerConfetti();
      playSoundEffect('victory');
      
      // Update scores for writing a story
      onUpdateStats(prev => ({
        ...prev,
        points: prev.points + 30,
        stars: prev.stars + 3
      }));

      setStoryState(prev => ({
        ...prev,
        currentStep: 5,
        selections: updatedSelections,
        customStory: [...prev.customStory, finalStoryEs]
      }));
    }
  };

  // Duel Actions
  const handleDuelAnswer = (option: string) => {
    const currentQ = duelQuestionsList[duelRound];
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      playSoundEffect('correct');
      setDuelPlayers(prev => {
        const next = { ...prev };
        if (prev.activePlayer === 1) next.p1Score += 10;
        else next.p2Score += 10;
        return next;
      });
    } else {
      playSoundEffect('wrong');
    }

    // Move turn
    if (duelPlayers.activePlayer === 1) {
      setDuelPlayers(prev => ({ ...prev, activePlayer: 2 }));
    } else {
      // End round
      const nextRound = duelRound + 1;
      if (nextRound < 5) {
        setDuelRound(nextRound);
        setDuelPlayers(prev => ({ ...prev, activePlayer: 1 }));
      } else {
        // Duel ended
        const p1Score = duelPlayers.p1Score;
        const p2Score = duelPlayers.p2Score;
        let winner = '';
        if (p1Score > p2Score) winner = duelPlayers.p1;
        else if (p2Score > p1Score) winner = duelPlayers.p2;
        else winner = 'Ոչ-ոքի';

        setDuelStage('ended');
        setDuelPlayers(prev => ({ ...prev, winner }));
        onTriggerConfetti();
        playSoundEffect('victory');

        // Award points to host
        onUpdateStats(prev => ({
          ...prev,
          points: prev.points + 20,
          stars: prev.stars + 2
        }));
      }
    }
  };

  // Spin Wheel Action
  const handleSpinWheel = () => {
    if (wheelSpinning) return;
    setWheelSpinning(true);
    const bonusDeg = 1440 + Math.floor(Math.random() * 360); // 4 full rotations + random sector
    setWheelDegree(prev => prev + bonusDeg);

    setTimeout(() => {
      setWheelSpinning(false);
      playSoundEffect('victory');
      onTriggerConfetti();

      // Load a random game as wheel result
      const gameOptions = [
        { id: 'sentences', titleAm: 'Սահմանիր նախադասությունը', titleEs: 'Sentence Builder' },
        { id: 'speed-translate', titleAm: 'Արագ թարգմանիր', titleEs: 'Speed Translate' },
        { id: 'math-quest', titleAm: 'Մաթեմատիկական քվեստ', titleEs: 'Math Quest' },
        { id: 'who-am-i', titleAm: 'Ո՞վ եմ ես', titleEs: 'Who Am I' },
        { id: 'football-quiz', titleAm: 'Ֆուտբոլային վիկտորինա', titleEs: 'Football Quiz' }
      ];
      const selected = gameOptions[Math.floor(Math.random() * gameOptions.length)];
      setWheelResultGame(selected);
    }, 4000);
  };

  // Rendering Helper
  if (loading || (questions.length === 0 && gameId !== 'story' && gameId !== 'wheel' && gameId !== 'duel')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-400 font-medium font-sans">Բեռնվում է...</p>
      </div>
    );
  }

  const currentTask = questions[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6" id="gameroom_container">
      {/* HEADER CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <button 
          id="back_to_hub_btn"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-sans font-semibold shrink-0"
        >
          <ArrowLeft size={14} />
          <span>Հետ</span>
        </button>

        {/* Display details of active game */}
        <div className="text-center md:text-left">
          <h2 className="text-base md:text-lg font-bold font-display text-white tracking-tight leading-tight">
            {gameTitleAm}
          </h2>
          <span className="text-xs font-mono text-slate-400 block mt-0.5">{gameTitleEs}</span>
        </div>

        {/* Level, Difficulty and Settings */}
        <div className="flex items-center gap-3">
          <select
            id="difficulty_selector"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="bg-slate-950 border border-white/10 text-white rounded-xl px-3 py-1.5 text-xs font-sans outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="easy">Հեշտ (Fácil)</option>
            <option value="medium">Միջին (Medio)</option>
            <option value="hard">Դժվար (Difícil)</option>
          </select>

          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              onToggleSound?.();
            }}
            className={`p-2 rounded-xl border transition ${soundEnabled ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' : 'bg-slate-900 border-white/10 text-slate-400'}`}
            title="Ձայն"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {gameId !== 'story' && gameId !== 'duel' && gameId !== 'first-day' && (
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className={`p-2 rounded-xl border transition ${timerEnabled ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-slate-900 border-white/10 text-slate-400'}`}
              title="Ժամանակ"
            >
              <Clock size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE STATS BAR */}
      {gameId !== 'story' && gameId !== 'duel' && gameId !== 'wheel' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-sm">
            <Award className="text-amber-400" size={20} />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">Միավորներ</span>
              <span className="text-sm font-bold font-sans text-white">{stats.points} XP</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-sm">
            <Sparkles className="text-sky-400" size={20} />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">Աստղեր</span>
              <span className="text-sm font-bold font-sans text-white">{stats.stars} ★</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-sm">
            <Flame className="text-rose-500 animate-pulse" size={20} />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">Շարք</span>
              <span className="text-sm font-bold font-sans text-white">{stats.currentStreak} ճիշտ</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-sm">
            <BookOpen className="text-emerald-400" size={20} />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">Առաջընթաց</span>
              <span className="text-sm font-bold font-sans text-white">
                {gameId === 'first-day' ? `${currentIndex + 1}/10` : `${currentIndex + 1}/${questions.length}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CORE WORKSPACE / GAME SCREENS */}
      <div className="bg-slate-900/60 border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[350px] backdrop-blur-md">
        {/* TIMER BAR */}
        {timerEnabled && !feedback.show && gameId !== 'story' && gameId !== 'duel' && gameId !== 'wheel' && gameId !== 'first-day' && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-950">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000"
              style={{ width: `${(timeLeft / (currentTask?.timeLimit || 15)) * 100}%` }}
            />
          </div>
        )}

        {/* FEEDBACK OVERLAYS */}
        {feedback.show && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="p-4 rounded-full mb-4">
              {feedback.isCorrect ? (
                <CheckCircle2 className="text-emerald-400 w-20 h-20 animate-bounce" />
              ) : (
                <XCircle className="text-rose-500 w-20 h-20" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold font-sans text-white mb-2">
              {feedback.isCorrect ? 'Ճի՛շտ է: ¡Excelente!' : isSecondTry ? 'Փորձի՛ր նորից' : 'Սխալ պատասխան'}
            </h3>

            <p className="text-slate-300 max-w-md mb-6 text-base font-sans leading-relaxed whitespace-pre-line">
              {feedback.explanation}
            </p>

            <div className="flex gap-4">
              {feedback.isCorrect || !isSecondTry ? (
                <button
                  id="next_question_btn"
                  onClick={handleNextQuestion}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold px-8 py-3 rounded-xl transition flex items-center gap-2 shadow-lg"
                >
                  <span>Շարունակել</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setFeedback({ isCorrect: false, show: false, explanation: '' });
                  }}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-sans font-semibold px-8 py-3 rounded-xl transition flex items-center gap-2 shadow-lg"
                >
                  <span>Փորձել 2-րդ անգամ</span>
                  <RotateCcw size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* GAME CONTENT ROOT */}
        {(() => {
          // 1. Sentence Builder
          if (gameId === 'sentences') {
            return (
              <div className="flex flex-col gap-6" id="game_sentence_builder">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold bg-slate-700 text-slate-300 px-3 py-1 rounded-md uppercase">
                    Թեմա՝ {currentTask.theme}
                  </span>
                  <button onClick={() => speakSpanish(currentTask.correctSentence)} className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg">
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="text-center py-4 bg-slate-900/40 rounded-2xl border border-slate-700/30 px-4">
                  <p className="text-lg md:text-xl font-bold font-sans text-white">
                    {selectedWords.length > 0 ? selectedWords.join(' ') : '---'}
                  </p>
                </div>

                {/* Scrambled Word bank */}
                <div className="flex flex-wrap gap-2.5 justify-center py-6">
                  {currentTask.scrambledWords.map((word: string, i: number) => {
                    const isSelected = selectedWords.includes(word);
                    return (
                      <button
                        key={i}
                        onClick={() => handleWordClick(word)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition transform active:scale-95 ${
                          isSelected 
                            ? 'bg-sky-500 text-white shadow-sky-500/20' 
                            : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between gap-4 mt-4">
                  <button
                    onClick={() => setSelectedWords([])}
                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition bg-slate-700/30 hover:bg-slate-700/60 px-4 py-2.5 rounded-xl font-sans"
                  >
                    <RotateCcw size={16} />
                    <span>Մաքրել</span>
                  </button>

                  <button
                    onClick={() => handleSubmitAnswer('')}
                    disabled={selectedWords.length === 0}
                    className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-sans font-semibold px-8 py-2.5 rounded-xl transition shadow-lg shadow-sky-500/10"
                  >
                    Ստուգել պատասխանը
                  </button>
                </div>
              </div>
            );
          }

          // 2. Speed Translate / 4 options
          if (gameId === 'speed-translate' || gameId === 'school-subject' || gameId === 'who-am-i' || gameId === 'football-quiz' || gameId === 'calendar' || gameId === 'schedule') {
            const promptTextEs = currentTask.questionEs || currentTask.descriptionEs || '';
            const promptTextAm = currentTask.phraseAm || currentTask.questionAm || currentTask.descriptionAm;
            const options = currentTask.options || currentTask.optionsEs || [];

            return (
              <div className="flex flex-col gap-6" id="game_speed_translate">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold bg-slate-700 text-slate-300 px-3 py-1 rounded-md uppercase">
                    Գրագիտություն
                  </span>
                  {promptTextEs && (
                    <button onClick={() => speakSpanish(promptTextEs)} className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg">
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>

                {promptTextEs ? (
                  <ClickToReveal 
                    textEs={promptTextEs} 
                    textAm={promptTextAm} 
                    currentIndex={currentIndex} 
                  />
                ) : (
                  <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-6 text-center">
                    <p className="text-base font-sans text-slate-200">
                      {promptTextAm}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                  {options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98 hover:border-sky-500/30 hover:shadow-lg"
                    >
                      <span className="inline-block bg-slate-800 text-slate-400 text-xs w-6 h-6 rounded-md text-center leading-6 mr-3">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // Math Quest / Aventura Matemática
          if (gameId === 'math-quest') {
            return (
              <div className="flex flex-col gap-6" id="game_math_quest">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold bg-slate-700 text-slate-300 px-3 py-1 rounded-md uppercase">
                    Մաթեմատիկական քվեստ
                  </span>
                  <button onClick={() => speakSpanish(currentTask.questionEs)} className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg">
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl p-5 flex flex-col gap-2">
                  <span className="text-xs uppercase font-mono text-indigo-400 block mb-1">Պատմություն (Historia)՝</span>
                  <ClickToReveal 
                    textEs={currentTask.storyEs} 
                    textAm={currentTask.storyAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-mono text-slate-400 block">Խնդիր (Problema)՝</span>
                  <ClickToReveal 
                    textEs={currentTask.questionEs} 
                    textAm={currentTask.questionAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                  {currentTask.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98 hover:border-indigo-500/30 hover:shadow-lg"
                    >
                      <span className="inline-block bg-slate-800 text-slate-400 text-xs w-6 h-6 rounded-md text-center leading-6 mr-3">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // Shop Game / Tienda Escolar
          if (gameId === 'shop') {
            return (
              <div className="flex flex-col gap-6" id="game_shop">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold bg-slate-700 text-slate-300 px-3 py-1 rounded-md uppercase">
                    Դպրոցական խանութ
                  </span>
                  <button onClick={() => speakSpanish(currentTask.instructionEs)} className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg">
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs uppercase font-mono text-emerald-400 font-bold">Բյուջե (Presupuesto)՝</span>
                    <span className="text-sm font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">{currentTask.budget} €</span>
                  </div>
                  <ClickToReveal 
                    textEs={currentTask.instructionEs} 
                    textAm={currentTask.instructionAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-mono text-slate-400 block">Հարց (Pregunta)՝</span>
                  <ClickToReveal 
                    textEs={currentTask.questionEs} 
                    textAm={currentTask.questionAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                  {currentTask.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98 hover:border-emerald-500/30 hover:shadow-lg"
                    >
                      <span className="inline-block bg-slate-800 text-slate-400 text-xs w-6 h-6 rounded-md text-center leading-6 mr-3">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 3. School Backpack / Mochila
          if (gameId === 'backpack') {
            return (
              <div className="flex flex-col gap-6" id="game_school_backpack">
                <ClickToReveal 
                  textEs={currentTask.instructionEs} 
                  textAm={currentTask.instructionAm} 
                  currentIndex={currentIndex} 
                />

                {/* Grid of items to choose */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3.5 my-4">
                  {backpackItems.map((item) => {
                    const isSelected = backpackSelected.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setBackpackSelected(prev => {
                            if (prev.includes(item.id)) return prev.filter(id => id !== item.id);
                            return [...prev, item.id];
                          });
                        }}
                        className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition transform active:scale-95 ${
                          isSelected 
                            ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg' 
                            : 'bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        <span className="text-3xl mb-2 filter drop-shadow">{item.icon}</span>
                        <span className="text-xs font-semibold text-center font-sans tracking-tight leading-tight block truncate w-full">
                          {item.nameEs}
                        </span>
                        <span className="text-[10px] text-slate-400 text-center font-sans mt-0.5 truncate w-full block">
                          {item.nameAm}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setBackpackSelected([])}
                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition bg-slate-700/30 hover:bg-slate-700/60 px-4 py-2 rounded-xl font-sans"
                  >
                    <Trash2 size={16} />
                    <span>Դատարկել</span>
                  </button>

                  <button
                    onClick={() => handleSubmitAnswer('')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold px-8 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/10"
                  >
                    Պատրաստել ուսապարկը
                  </button>
                </div>
              </div>
            );
          }

          // 5. Teacher Says
          if (gameId === 'teacher-says') {
            return (
              <div className="flex flex-col gap-6" id="game_teacher_says">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold bg-slate-700 text-slate-300 px-3 py-1 rounded-md uppercase">
                    Ուսուցչի հրահանգը
                  </span>
                  <button onClick={() => speakSpanish(currentTask.commandEs)} className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg">
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-xs uppercase font-mono text-slate-400 block mb-2">Ուսուցիչն ասում է՝</span>
                  <ClickToReveal 
                    textEs={`«${currentTask.commandEs}»`} 
                    textAm={currentTask.commandAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <p className="text-center text-sm font-sans text-slate-300">
                  Ո՞ր գործողությունն է ճիշտ համապատասխանում այս հրահանգին.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentTask.options.map((option: any) => (
                    <button
                      key={option.id}
                      onClick={() => handleSubmitAnswer(option.isCorrect ? 'correct' : 'wrong')}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-center transition transform active:scale-98"
                    >
                      <p className="text-sm font-bold text-white mb-0.5">{option.textAm}</p>
                      <span className="text-xs text-slate-400 font-mono">({option.textEs})</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 9. Time clock / Reloj
          if (gameId === 'time') {
            return (
              <div className="flex flex-col gap-6" id="game_what_time">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* SVG clock view */}
                  <div className="relative w-44 h-44 bg-slate-900 rounded-full border-4 border-slate-700 flex items-center justify-center shadow-lg">
                    {/* Clock numbers */}
                    <span className="absolute top-2 text-xs font-mono font-bold text-slate-400">12</span>
                    <span className="absolute right-2 text-xs font-mono font-bold text-slate-400">3</span>
                    <span className="absolute bottom-2 text-xs font-mono font-bold text-slate-400">6</span>
                    <span className="absolute left-2 text-xs font-mono font-bold text-slate-400">9</span>

                    {/* Clock Hands */}
                    <div 
                      className="absolute w-1 h-12 bg-slate-400 rounded-full origin-bottom"
                      style={{ 
                        transform: `rotate(${(currentTask.minutes / 60) * 360}deg)`,
                        transformOrigin: 'bottom center',
                        bottom: '50%'
                      }}
                    />
                    <div 
                      className="absolute w-1.5 h-9 bg-sky-400 rounded-full origin-bottom"
                      style={{ 
                        transform: `rotate(${((currentTask.hours % 12) / 12) * 360 + (currentTask.minutes / 60) * 30}deg)`,
                        transformOrigin: 'bottom center',
                        bottom: '50%'
                      }}
                    />
                    {/* center dot */}
                    <div className="absolute w-3 h-3 bg-white rounded-full z-10" />
                  </div>

                  <div className="flex-1 w-full flex flex-col gap-2">
                    <span className="text-xs font-mono text-slate-400 block">Դպրոցական իրավիճակ՝</span>
                    <ClickToReveal 
                      textEs={currentTask.situationEs} 
                      textAm={currentTask.situationAm} 
                      currentIndex={currentIndex} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                  {currentTask.optionsEs.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 11. School Dialogue
          if (gameId === 'dialogue') {
            return (
              <div className="flex flex-col gap-6" id="game_school_dialogues">
                <div className="bg-slate-900/45 border border-slate-700/40 p-4 rounded-2xl">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Իրավիճակ՝</span>
                  <p className="text-sm font-sans font-bold text-white">{currentTask.situationAm}</p>
                </div>

                {/* Dialog board */}
                <div className="flex flex-col gap-3.5 py-4">
                  {currentTask.dialogueBefore.map((d: any, idx: number) => (
                    <DialogBubble 
                      key={idx} 
                      speaker={d.speaker} 
                      text={d.text} 
                      translationAm={d.translationAm} 
                    />
                  ))}

                  {/* Missing slot placeholder */}
                  <div className="border-2 border-dashed border-sky-500/50 bg-sky-500/5 p-4 rounded-2xl text-center max-w-[85%]">
                    <span className="text-xs font-mono font-bold text-sky-400 block mb-1">Լրացրո՛ւ բաց թողնված արտահայտությունը՝</span>
                    <p className="text-sm font-sans font-bold text-slate-300">________________________</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {currentTask.missingPhraseOptions.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 12. What Would You Say
          if (gameId === 'what-would-you-say') {
            return (
              <div className="flex flex-col gap-6" id="game_what_would_say">
                <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-6 text-center">
                  <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Իրավիճակ՝</span>
                  <p className="text-lg md:text-xl font-bold font-sans text-white leading-snug">
                    {currentTask.situationAm}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                  {currentTask.optionsEs.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98"
                    >
                      <span className="inline-block bg-slate-800 text-slate-400 text-xs w-6 h-6 rounded-md text-center leading-6 mr-3">
                        {idx + 1}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 13. True or False
          if (gameId === 'true-false') {
            return (
              <div className="flex flex-col gap-6" id="game_true_false">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-slate-400">Տեքստ (Texto)՝</span>
                  <ClickToReveal 
                    textEs={currentTask.textEs} 
                    textAm={currentTask.textAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="text-center flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Պնդում՝</span>
                  <ClickToReveal 
                    textEs={`«${currentTask.statementEs}»`} 
                    textAm={currentTask.statementAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    onClick={() => handleSubmitAnswer('true')}
                    className="bg-emerald-600/80 hover:bg-emerald-600 text-white font-sans font-bold p-5 rounded-2xl transition transform active:scale-95 shadow-lg shadow-emerald-600/10 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-xl">Ճիշտ է</span>
                    <span className="text-xs font-mono opacity-85">Verdadero</span>
                  </button>

                  <button
                    onClick={() => handleSubmitAnswer('false')}
                    className="bg-rose-600/80 hover:bg-rose-600 text-white font-sans font-bold p-5 rounded-2xl transition transform active:scale-95 shadow-lg shadow-rose-600/10 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-xl">Սխալ է</span>
                    <span className="text-xs font-mono opacity-85">Falso</span>
                  </button>
                </div>
              </div>
            );
          }

          // 14. Error Detective
          if (gameId === 'error-detective') {
            return (
              <div className="flex flex-col gap-6" id="game_error_detective">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-slate-450 text-rose-400 block mb-1">Գտի՛ր և ուղղի՛ր սխալը այս նախադասության մեջ (Կտտացրու հուշման համար)՝</span>
                  <ClickToReveal 
                    textEs={currentTask.incorrectSentenceEs} 
                    textAm={`Սխալի բացատրություն՝ ${currentTask.explanationAm}`} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <p className="text-center text-sm font-sans text-slate-300">
                  Ո՞րն է այս նախադասության ճիշտ տարբերակը.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                  {currentTask.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 15. Odd One Out
          if (gameId === 'odd-one-out') {
            return (
              <div className="flex flex-col gap-6" id="game_odd_one_out">
                <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-5 text-center">
                  <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Գտի՛ր ավելորդ բառը՝</span>
                  <p className="text-base font-sans text-slate-300">
                    Ներքևում նշված չորս բառերից մեկը չի համապատասխանում մյուսների խմբին։
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-2">
                  {currentTask.wordsEs.map((w: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(w.word)}
                      className="bg-slate-700 hover:bg-slate-650 text-white font-sans font-bold p-6 rounded-2xl border border-slate-600/50 text-center transition transform active:scale-95 shadow-md hover:border-sky-500/30"
                    >
                      <span className="text-lg block mb-1">{w.word}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 16. Match Pairs / Соедини пары
          if (gameId === 'match-pairs') {
            const spanishWords = [...currentTask.pairs].sort((a: any, b: any) => a.left.localeCompare(b.left));
            const armenianWords = [...currentTask.pairs].sort((a: any, b: any) => a.right.localeCompare(b.right));

            return (
              <div className="flex flex-col gap-6" id="game_match_pairs">
                <p className="text-center text-sm font-sans text-slate-300">
                  Միացրո՛ւ իսպաներեն բառը հայերեն ճիշտ թարգմանության հետ։
                </p>

                <div className="grid grid-cols-2 gap-6 my-2">
                  {/* Spanish Column */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase font-mono text-slate-400 text-center font-semibold mb-1">Español</span>
                    {spanishWords.map((item: any) => {
                      const isMatched = completedPairs.includes(item.id);
                      const isSelected = matchPairsSelected.leftId === item.id;
                      return (
                        <button
                          key={item.id}
                          disabled={isMatched}
                          onClick={() => handlePairClick(item.id, 'left')}
                          className={`p-4 rounded-xl text-sm font-bold font-sans transition border ${
                            isMatched 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400/55 cursor-not-allowed line-through' 
                              : isSelected 
                                ? 'bg-sky-500 border-sky-400 text-white shadow-lg' 
                                : 'bg-slate-700 border-slate-600 hover:bg-slate-650 text-slate-200'
                          }`}
                        >
                          {item.left}
                        </button>
                      );
                    })}
                  </div>

                  {/* Armenian Column */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase font-mono text-slate-400 text-center font-semibold mb-1">Հայերեն</span>
                    {armenianWords.map((item: any) => {
                      const isMatched = completedPairs.includes(item.id);
                      const isSelected = matchPairsSelected.rightId === item.id;
                      return (
                        <button
                          key={item.id}
                          disabled={isMatched}
                          onClick={() => handlePairClick(item.id, 'right')}
                          className={`p-4 rounded-xl text-sm font-bold font-sans transition border ${
                            isMatched 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400/55 cursor-not-allowed line-through' 
                              : isSelected 
                                ? 'bg-sky-500 border-sky-400 text-white shadow-lg' 
                                : 'bg-slate-700 border-slate-600 hover:bg-slate-650 text-slate-200'
                          }`}
                        >
                          {item.right}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          // 19. Word Labyrinth / Лабиринт
          if (gameId === 'word-labyrinth') {
            const grid = currentTask.grid;
            return (
              <div className="flex flex-col gap-6" id="game_word_labyrinth">
                <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-4">
                  <p className="text-sky-400 font-bold font-sans text-sm mb-1">
                    {currentTask.instructionEs}
                  </p>
                  <p className="text-xs font-sans text-slate-300">
                    {currentTask.instructionAm}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 py-2">
                  <div className="grid grid-cols-3 gap-3.5 bg-slate-900 p-4 rounded-3xl border border-slate-700/60 max-w-sm w-full">
                    {grid.map((row: any[], rIdx: number) =>
                      row.map((cell: any, cIdx: number) => (
                        <button
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => {
                            if (cell.isValid) {
                              playSoundEffect('correct');
                              if (rIdx === currentTask.endRow && cIdx === currentTask.endCol) {
                                handleSubmitAnswer('success');
                              } else {
                                // Add interactive green splash or just standard note
                                alert(`Ճիշտ է: «${cell.wordEs}»-ն համապատասխանում է պայմանին։ Շարունակի՛ր ճանապարհը։`);
                              }
                            } else {
                              playSoundEffect('wrong');
                              handleSubmitAnswer('wrong');
                            }
                          }}
                          className={`aspect-square flex flex-col items-center justify-center p-2 rounded-2xl border transition transform active:scale-95 bg-slate-800 border-slate-700 text-slate-100 hover:border-sky-500/30`}
                        >
                          <span className="text-sm font-bold font-sans tracking-tight">{cell.wordEs}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{cell.wordAm}</span>
                        </button>
                      ))
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">Կտտացրո՛ւ վանդակներին՝ մուտքից մինչև ելք ճիշտ բառերով անցնելու համար:</span>
                </div>
              </div>
            );
          }

          // 20. Wheel of Fortune / Колесо
          if (gameId === 'wheel') {
            return (
              <div className="flex flex-col items-center gap-6" id="game_spin_wheel">
                <p className="text-center text-sm font-sans text-slate-300">
                  Պտտի՛ր անակնկալների անիվը՝ պատահական հետաքրքիր առաջադրանք ստանալու համար։
                </p>

                {/* Spin Wheel Visuals */}
                <div className="relative my-4">
                  {/* Wheel center pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-500 drop-shadow" />

                  <div 
                    className="w-56 h-56 rounded-full border-8 border-slate-700 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] ease-out flex items-center justify-center"
                    style={{ 
                      transform: `rotate(${wheelDegree}deg)`,
                      background: 'conic-gradient(#3b82f6 0% 10%, #10b981 10% 20%, #f59e0b 20% 30%, #ef4444 30% 40%, #8b5cf6 40% 50%, #ec4899 50% 60%, #14b8a6 60% 70%, #06b6d4 70% 80%, #f43f5e 80% 90%, #6366f1 90% 100%)'
                    }}
                  >
                    {/* Circle cover in center */}
                    <div className="w-16 h-16 bg-slate-950 rounded-full z-10 flex items-center justify-center border-4 border-slate-800">
                      <Sparkles className="text-amber-400 w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                </div>

                <button
                  id="spin_wheel_btn"
                  disabled={wheelSpinning}
                  onClick={handleSpinWheel}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 text-white font-sans font-bold px-10 py-3.5 rounded-2xl transition shadow-xl shadow-indigo-500/20 text-lg uppercase tracking-wider"
                >
                  {wheelSpinning ? 'Պտտվում է...' : 'Պտտել անիվը'}
                </button>

                {/* Wheel results loading */}
                {wheelResultGame && (
                  <div className="bg-slate-900/60 border border-slate-700/60 p-5 rounded-2xl w-full text-center max-w-sm animate-fade-in mt-2">
                    <span className="text-xs uppercase font-mono text-emerald-400 block mb-1">Քո առաջադրանքն է՝</span>
                    <p className="text-lg font-bold font-sans text-white mb-4">
                      {wheelResultGame.titleAm}
                    </p>
                    <button
                      id="load_wheel_game_btn"
                      onClick={() => {
                        // Dynamically load the chosen game
                        onBack();
                        setTimeout(() => {
                          // Simulates loading the specific game index
                          alert(`Բեռնվում է "${wheelResultGame.titleAm}" խաղը։`);
                        }, 50);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold px-6 py-2 rounded-xl text-sm transition"
                    >
                      Սկսել խաղալ
                    </button>
                  </div>
                )}
              </div>
            );
          }

          // 21. First Day Mission Narrative Steps (10-Step Epic Journey)
          if (gameId === 'first-day') {
            return (
              <div className="flex flex-col gap-6" id="game_first_day_mission">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-slate-700 text-slate-300 px-3 py-1 rounded-md uppercase">
                    Փուլ {currentIndex + 1}/10՝ {currentTask.titleAm}
                  </span>
                  <span className="text-xs font-mono text-sky-400">{currentTask.titleEs}</span>
                </div>

                {/* Adventure description */}
                <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl p-5">
                  <p className="text-sm font-sans text-slate-200 leading-relaxed">
                    {currentTask.descriptionAm}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Հարցում՝</span>
                  <ClickToReveal 
                    textEs={currentTask.questionEs} 
                    textAm={currentTask.questionAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                  {currentTask.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 22. Error Monster / Slay Dragon Game
          if (gameId === 'error-monster') {
            return (
              <div className="flex flex-col gap-6" id="game_error_monster">
                {/* Boss bar health */}
                <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🐉</span>
                      <span className="font-bold font-sans text-rose-400">Սխալների Հրեշ (Monster)</span>
                    </div>
                    <span className="font-mono text-xs text-rose-500 font-bold">{monsterHp}/{monsterMaxHp} HP</span>
                  </div>

                  {/* HP bar */}
                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-600 to-red-400 transition-all duration-500"
                      style={{ width: `${monsterHp}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-mono text-slate-400 block">Լրացրո՛ւ բաց թողնված տեղը հրեշին թուլացնելու համար՝</span>
                  <ClickToReveal 
                    textEs={currentTask.sentenceEs} 
                    textAm={currentTask.questionAm} 
                    currentIndex={currentIndex} 
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                  {currentTask.optionsEs.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmitAnswer(option)}
                      className="bg-slate-700 hover:bg-slate-650 text-white font-sans font-bold p-4 rounded-xl border border-slate-600/50 text-center transition transform active:scale-95"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // 24. Two Player Duel
          if (gameId === 'duel') {
            if (duelStage === 'setup') {
              return (
                <div className="flex flex-col gap-6" id="game_duel_setup">
                  <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-5 text-center">
                    <Swords className="text-rose-500 mx-auto w-12 h-12 mb-2 animate-bounce" />
                    <h3 className="text-lg font-bold font-sans text-white mb-1">Դուել երկու խաղացողների համար</h3>
                    <p className="text-sm font-sans text-slate-300">
                      Խաղացե՛ք միասին նույն սարքի վրա։ Պատասխանե՛ք հարցերին հերթով և պարզե՛ք, թե ով է իսպաներենի չեմպիոնը։
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-750 p-4 rounded-xl border border-slate-700">
                      <label className="text-xs font-mono text-slate-400 block mb-1">Խաղացող 1-ի անունը</label>
                      <input 
                        type="text" 
                        value={duelPlayers.p1} 
                        onChange={(e) => setDuelPlayers(prev => ({ ...prev, p1: e.target.value }))}
                        className="bg-slate-900 border border-slate-700 text-white rounded-lg p-2 w-full text-sm outline-none"
                      />
                    </div>

                    <div className="bg-slate-750 p-4 rounded-xl border border-slate-700">
                      <label className="text-xs font-mono text-slate-400 block mb-1">Խաղացող 2-ի անունը</label>
                      <input 
                        type="text" 
                        value={duelPlayers.p2} 
                        onChange={(e) => setDuelPlayers(prev => ({ ...prev, p2: e.target.value }))}
                        className="bg-slate-900 border border-slate-700 text-white rounded-lg p-2 w-full text-sm outline-none"
                      />
                    </div>
                  </div>

                  <button
                    id="start_duel_btn"
                    onClick={() => setDuelStage('playing')}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-sans font-bold p-3.5 rounded-xl transition mt-4"
                  >
                    Սկսել դուելը
                  </button>
                </div>
              );
            }

            if (duelStage === 'playing') {
              const currentQ = duelQuestionsList[duelRound];
              const activePlayerName = duelPlayers.activePlayer === 1 ? duelPlayers.p1 : duelPlayers.p2;

              return (
                <div className="flex flex-col gap-6" id="game_duel_playing">
                  {/* Scores dashboard */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-700/40">
                    <div className={`text-center p-2 rounded-xl ${duelPlayers.activePlayer === 1 ? 'bg-sky-500/20 border border-sky-500/50' : ''}`}>
                      <span className="text-xs font-mono text-slate-400 block">Խաղացող 1</span>
                      <span className="font-bold text-white block">{duelPlayers.p1}</span>
                      <span className="text-sm font-bold text-sky-400">{duelPlayers.p1Score} միավոր</span>
                    </div>

                    <div className={`text-center p-2 rounded-xl ${duelPlayers.activePlayer === 2 ? 'bg-rose-500/20 border border-rose-500/50' : ''}`}>
                      <span className="text-xs font-mono text-slate-400 block">Խաղացող 2</span>
                      <span className="font-bold text-white block">{duelPlayers.p2}</span>
                      <span className="text-sm font-bold text-rose-400">{duelPlayers.p2Score} միավոր</span>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-center">
                    <span className="text-xs uppercase font-mono text-rose-400 block mb-1">Հերթը պատկանում է՝</span>
                    <h3 className="text-xl font-extrabold font-sans text-white mb-4 animate-pulse">
                      👉 {activePlayerName}
                    </h3>
                    
                    <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                      <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Բաժին՝ {currentQ.category}</span>
                      <p className="text-base font-sans font-semibold text-slate-200">
                        {currentQ.questionAm}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                    {currentQ.options.map((option: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleDuelAnswer(option)}
                        className="bg-slate-700 hover:bg-slate-650 text-slate-100 font-sans font-medium p-4 rounded-xl border border-slate-600/50 text-left transition transform active:scale-98"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            if (duelStage === 'ended') {
              return (
                <div className="flex flex-col items-center justify-center text-center gap-6 py-6 animate-fade-in" id="game_duel_ended">
                  <Award className="text-amber-400 w-16 h-16 animate-bounce" />
                  <div>
                    <h3 className="text-2xl font-bold font-sans text-white">Դուելն ավարտվեց</h3>
                    <p className="text-sm font-sans text-slate-400 mt-1">Հիանալի խաղ էր երկուսիդ կողմից էլ։</p>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-700 p-5 rounded-2xl max-w-sm w-full">
                    <span className="text-xs font-mono text-slate-400 block">Հաղթողն է՝</span>
                    <p className="text-2xl font-extrabold font-sans text-emerald-400 mt-1">
                      🏆 {duelPlayers.winner} 🏆
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-4 border-t border-slate-800 pt-4">
                      <div>
                        <span className="text-xs font-mono text-slate-400 block">{duelPlayers.p1}</span>
                        <span className="font-bold text-white text-lg">{duelPlayers.p1Score}</span>
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-400 block">{duelPlayers.p2}</span>
                        <span className="font-bold text-white text-lg">{duelPlayers.p2Score}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setDuelStage('setup');
                      setDuelRound(0);
                      setDuelPlayers(prev => ({ ...prev, p1Score: 0, p2Score: 0, activePlayer: 1, winner: null }));
                    }}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-sans font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-rose-500/10"
                  >
                    Խաղալ նորից
                  </button>
                </div>
              );
            }
          }

          // 25. Create Your Story
          if (gameId === 'story') {
            const step = storyState.currentStep;
            
            if (step < 5) {
              const currentOptionList = storyOptions;
              const categories = ['Character (Կերպար)', 'Place (Վայր)', 'Action (Գործողություն)', 'Time (Ժամանակ)', 'Item (Առարկա)'];
              const catKeys = ['character', 'place', 'action', 'time', 'item'] as const;
              const activeKey = catKeys[step];

              return (
                <div className="flex flex-col gap-6" id="game_create_story_steps">
                  <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-5">
                    <h3 className="text-base font-bold font-sans text-sky-400 mb-1">Քայլ {step + 1} / 5՝ Ընտրի՛ր {categories[step]}</h3>
                    <p className="text-xs font-sans text-slate-300">
                      Ընտրի՛ր առաջարկվող տարբերակներից մեկը՝ քո պատմությունը կազմելու համար:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
                    {currentOptionList.map((opt: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleStorySelection(opt[activeKey])}
                        className="bg-slate-700 hover:bg-slate-650 text-white font-sans font-medium p-5 rounded-2xl border border-slate-600/50 text-left transition transform active:scale-95"
                      >
                        <span className="font-bold block text-sm mb-0.5">{opt[activeKey].split(' (')[0]}</span>
                        <span className="text-xs text-slate-400">({opt[activeKey].split(' (')[1]?.replace(')', '') || ''})</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            // Completed Story Screen
            return (
              <div className="flex flex-col gap-6" id="game_create_story_ended">
                <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-5 text-center">
                  <Sparkles className="text-amber-400 mx-auto w-12 h-12 mb-2 animate-bounce" />
                  <h3 className="text-xl font-bold font-sans text-white mb-1">Քո պատմությունը պատրաստ է</h3>
                  <p className="text-xs font-sans text-slate-300">Դու հաջողությամբ կազմեցիր պատմություն իսպաներենով։</p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                  <p className="text-lg md:text-xl font-bold font-sans text-sky-400 italic">
                    «{storyState.customStory[storyState.customStory.length - 1]}»
                  </p>
                </div>

                {/* List of previously made stories */}
                {storyState.customStory.length > 1 && (
                  <div className="bg-slate-900/40 border border-slate-700/40 p-4 rounded-xl">
                    <span className="text-xs font-mono text-slate-400 block mb-2">Նախկինում ստեղծված պատմությունները՝</span>
                    <ul className="flex flex-col gap-2">
                      {storyState.customStory.slice(0, -1).map((s, idx) => (
                        <li key={idx} className="text-xs font-sans text-slate-300 italic bg-slate-800/40 p-2 rounded-lg">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-2">
                  <button
                    onClick={() => {
                      setStoryState(prev => ({ ...prev, currentStep: 0, selections: [] }));
                    }}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-sans font-bold px-8 py-3 rounded-xl transition"
                  >
                    Ստեղծել նոր պատմություն
                  </button>
                </div>
              </div>
            );
          }
        })()}
      </div>

      {/* FOOTER INTERACTIVE BUTTONS (Hint / Skip) */}
      {gameId !== 'story' && gameId !== 'duel' && gameId !== 'wheel' && !feedback.show && (
        <div className="flex items-center justify-between mt-6 px-1">
          <button
            id="hint_btn"
            disabled={hintUsed}
            onClick={handleGetHint}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-sm bg-slate-800/60 hover:bg-slate-800 px-5 py-2.5 rounded-xl border border-slate-700/50 transition disabled:opacity-50 font-sans"
          >
            <HelpCircle size={16} />
            <span>Հուշում (Hint)</span>
          </button>

          <button
            onClick={handleNextQuestion}
            className="text-slate-400 hover:text-slate-200 text-sm font-sans transition"
          >
            Բաց թողնել առաջադրանքը →
          </button>
        </div>
      )}

      {/* Display Hint Message */}
      {hintMessage && !feedback.show && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl mt-4 text-center font-sans text-amber-400 text-sm animate-fade-in">
          {hintMessage}
        </div>
      )}
    </div>
  );
}
