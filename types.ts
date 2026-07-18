/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface UserStats {
  points: number;
  stars: number;
  level: number;
  xpToNextLevel: number;
  currentStreak: number;
  highestStreak: number;
  unlockedAchievements: string[];
  completedThemes: string[];
  dailyMissions: DailyMission[];
  lastActiveDate: string; // YYYY-MM-DD
}

export interface DailyMission {
  id: string;
  type: 'sentences' | 'translations' | 'math' | 'words' | 'dialogues' | 'errors';
  titleAm: string;
  titleRu: string;
  target: number;
  current: number;
  rewardPoints: number;
  rewardStars: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  titleAm: string;
  titleRu: string;
  descAm: string;
  descRu: string;
  iconName: string;
  pointsReq?: number;
  starsReq?: number;
  gamesPlayedReq?: number;
  streakReq?: number;
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  stars: number;
  isCurrentUser?: boolean;
}

// Game 1: Sentence Building Task
export interface SentenceTask {
  id: string;
  difficulty: Difficulty;
  theme: string;
  scrambledWords: string[];
  correctSentence: string;
  translationAm: string;
  translationRu: string;
}

// Game 2: Speed Translate Task
export interface SpeedTranslateTask {
  id: string;
  difficulty: Difficulty;
  phraseAm: string;
  phraseRu: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number; // in seconds
}

// Game 3: Backpack Task
export interface BackpackItem {
  id: string;
  nameEs: string;
  nameAm: string;
  nameRu: string;
  icon: string;
  isSchoolItem: boolean;
}

export interface BackpackTask {
  id: string;
  difficulty: Difficulty;
  instructionEs: string;
  instructionAm: string;
  requiredItemIds: string[];
}

// Game 4: Lesson Schedule Task
export interface ScheduleDay {
  dayNameEs: string;
  dayNameAm: string;
  classes: { time: string; subjectEs: string; subjectAm: string }[];
}

export interface ScheduleTask {
  id: string;
  difficulty: Difficulty;
  questionEs: string;
  questionAm: string;
  options: string[];
  correctAnswer: string;
}

// Game 5: Teacher Says Task
export interface TeacherSaysTask {
  id: string;
  difficulty: Difficulty;
  commandEs: string;
  commandAm: string;
  actionAm: string;
  explanationAm: string;
  options: { id: string; textAm: string; textEs: string; isCorrect: boolean }[];
}

// Game 6: School Subject Description
export interface SchoolSubjectTask {
  id: string;
  difficulty: Difficulty;
  descriptionEs: string;
  descriptionAm: string;
  correctSubjectEs: string;
  correctSubjectAm: string;
  optionsEs: string[];
}

// Game 7: Math Quest Step
export interface MathQuestStep {
  id: string;
  difficulty: Difficulty;
  storyEs: string;
  storyAm: string;
  questionEs: string;
  questionAm: string;
  correctAnswer: string;
  options: string[];
  solutionAm: string;
}

// Game 8: Shop Task
export interface ShopItem {
  id: string;
  nameEs: string;
  nameAm: string;
  price: number;
}

export interface ShopTask {
  id: string;
  difficulty: Difficulty;
  budget: number;
  instructionEs: string;
  instructionAm: string;
  requiredItems: { itemId: string; quantity: number }[];
  questionEs: string;
  questionAm: string;
  correctAnswer: string;
  options: string[];
}

// Game 9: Time Task
export interface TimeTask {
  id: string;
  difficulty: Difficulty;
  hours: number;
  minutes: number;
  situationEs?: string;
  situationAm?: string;
  correctAnswerEs: string;
  optionsEs: string[];
}

// Game 10: Calendar Task
export interface CalendarTask {
  id: string;
  difficulty: Difficulty;
  monthNameEs: string;
  monthNameAm: string;
  daysCount: number;
  events: { date: number; titleEs: string; titleAm: string }[];
  questionEs: string;
  questionAm: string;
  options: string[];
  correctAnswer: string;
}

// Game 11: Dialogue Task
export interface DialogueExchange {
  speaker: string;
  text: string;
  translationAm: string;
}

export interface DialogueTask {
  id: string;
  difficulty: Difficulty;
  situationAm: string;
  dialogueBefore: DialogueExchange[];
  missingPhraseOptions: string[];
  correctMissingPhrase: string;
  dialogueAfter: DialogueExchange[];
}

// Game 12: What Would You Say Task
export interface WhatWouldYouSayTask {
  id: string;
  difficulty: Difficulty;
  situationAm: string;
  optionsEs: string[];
  correctAnswerEs: string;
  explanationAm: string;
}

// Game 13: True or False Task
export interface TrueOrFalseTask {
  id: string;
  difficulty: Difficulty;
  textEs: string;
  textAm: string;
  statementEs: string;
  statementAm: string;
  isTrue: boolean;
}

// Game 14: Error Detective Task
export interface ErrorDetectiveTask {
  id: string;
  difficulty: Difficulty;
  incorrectSentenceEs: string;
  correctSentenceEs: string;
  explanationAm: string;
  options: string[]; // Options of correct or corrected versions
}

// Game 15: Odd One Out Task
export interface OddOneOutTask {
  id: string;
  difficulty: Difficulty;
  wordsEs: { word: string; category: string }[];
  oddWordEs: string;
  explanationAm: string;
}

// Game 16: Match Pairs Task
export interface MatchPairItem {
  id: string;
  left: string; // Spanish
  right: string; // Armenian
}

export interface MatchPairsTask {
  id: string;
  difficulty: Difficulty;
  pairs: MatchPairItem[];
}

// Game 17: Who Am I Task
export interface WhoAmITask {
  id: string;
  difficulty: Difficulty;
  descriptionEs: string;
  descriptionAm: string;
  correctJobEs: string;
  correctJobAm: string;
  optionsEs: string[];
}

// Game 18: Football Quiz Task
export interface FootballQuizTask {
  id: string;
  difficulty: Difficulty;
  questionEs: string;
  questionAm: string;
  optionsEs: string[];
  correctAnswerEs: string;
  commentaryTemplate?: string; // used for creating commentary
}

// Game 19: Word Labyrinth Task
export interface LabyrinthCell {
  wordEs: string;
  wordAm: string;
  isValid: boolean; // e.g. is a verb or is feminine
}

export interface WordLabyrinthTask {
  id: string;
  difficulty: Difficulty;
  instructionAm: string;
  instructionEs: string;
  criteria: string; // e.g. "Find all verbs"
  grid: LabyrinthCell[][]; // 4x4 or 5x5 grid
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

// Game 20: Wheel of Tasks
export interface WheelSector {
  id: string;
  nameAm: string;
  nameEs: string;
  color: string;
  gameIndex: number; // maps to one of the game IDs
}

// Game 21: First Day Mission Step
export interface FirstDayMissionStep {
  id: string;
  titleAm: string;
  titleEs: string;
  descriptionAm: string;
  questionEs: string;
  questionAm: string;
  options: string[];
  correctAnswer: string;
  feedbackSuccessAm: string;
  feedbackSuccessEs: string;
}

// Game 22: Error Monster Task
export interface ErrorMonsterTask {
  id: string;
  difficulty: Difficulty;
  topic: string; // 'ser/estar' | 'tener' | 'hay' | 'articles' | 'verbs' | 'school' | 'math'
  sentenceEs: string;
  questionAm: string;
  optionsEs: string[];
  correctAnswerEs: string;
  explanationAm: string;
}

// Game 24: Duel Task
export interface DuelTask {
  category: string;
  questionAm: string;
  questionEs?: string;
  options: string[];
  correctAnswer: string;
}

// Game 25: Story Element Options
export interface StoryOption {
  character: string;
  place: string;
  action: string;
  time: string;
  item: string;
}
