/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Difficulty,
  SentenceTask,
  SpeedTranslateTask,
  BackpackItem,
  BackpackTask,
  ScheduleDay,
  ScheduleTask,
  TeacherSaysTask,
  SchoolSubjectTask,
  MathQuestStep,
  ShopItem,
  ShopTask,
  TimeTask,
  CalendarTask,
  DialogueTask,
  WhatWouldYouSayTask,
  TrueOrFalseTask,
  ErrorDetectiveTask,
  OddOneOutTask,
  MatchPairItem,
  MatchPairsTask,
  WhoAmITask,
  FootballQuizTask,
  WordLabyrinthTask,
  FirstDayMissionStep,
  ErrorMonsterTask,
  DuelTask,
  StoryOption
} from './types';

// ==========================================
// 1. SENTENCE TASKS (Собери предложение / Կազմիր նախադասությունը)
// ==========================================
export const sentenceTasks: SentenceTask[] = [
  {
    id: 's1',
    difficulty: 'easy',
    theme: 'школа',
    scrambledWords: ['todos', 'los', 'días', 'español', 'estudio', 'yo'],
    correctSentence: 'Yo estudio español todos los días',
    translationAm: 'Ես ամեն օր իսպաներեն եմ սովորում։',
    translationRu: 'Я изучаю испанский каждый день.'
  },
  {
    id: 's2',
    difficulty: 'easy',
    theme: 'семья',
    scrambledWords: ['madre', 'mi', 'es', 'profesora', 'una'],
    correctSentence: 'Mi madre es una profesora',
    translationAm: 'Իմ մայրը ուսուցչուհի է։',
    translationRu: 'Моя мама — учительница.'
  },
  {
    id: 's3',
    difficulty: 'easy',
    theme: 'друзья',
    scrambledWords: ['juega', 'mi', 'fútbol', 'amigo', 'al'],
    correctSentence: 'Mi amigo juega al fútbol',
    translationAm: 'Իմ ընկերը ֆուտբոլ է խաղում։',
    translationRu: 'Мой друг играет в футбол.'
  },
  {
    id: 's4',
    difficulty: 'medium',
    theme: 'распорядок дня',
    scrambledWords: ['a', 'las', 'me', 'siete', 'levanto', 'mañana', 'de', 'la'],
    correctSentence: 'Me levanto a las siete de la mañana',
    translationAm: 'Ես արթնանում եմ առավոտյան ժամը յոթին։',
    translationRu: 'Я встаю в семь часов утра.'
  },
  {
    id: 's5',
    difficulty: 'medium',
    theme: 'еда',
    scrambledWords: ['me', 'manzanas', 'comer', 'gusta', 'rojas'],
    correctSentence: 'Me gusta comer manzanas rojas',
    translationAm: 'Ինձ դուր է գալիս ուտել կարմիր խնձորներ։',
    translationRu: 'Мне нравится есть красные яблоки.'
  },
  {
    id: 's6',
    difficulty: 'hard',
    theme: 'город',
    scrambledWords: ['está', 'museo', 'el', 'cerca', 'parque', 'del', 'grande'],
    correctSentence: 'El museo está cerca del parque grande',
    translationAm: 'Թանգարանը գտնվում է մեծ այգու մոտակայքում։',
    translationRu: 'Музей находится рядом с большим парком.'
  },
  {
    id: 's7',
    difficulty: 'hard',
    theme: 'транспорт',
    scrambledWords: ['vamos', 'autobús', 'en', 'escuela', 'a', 'la', 'nosotros'],
    correctSentence: 'Nosotros vamos a la escuela en autobús',
    translationAm: 'Մենք ավտոբուսով ենք գնում դպրոց։',
    translationRu: 'Мы едем в школу на автобусе.'
  },
  {
    id: 's8',
    difficulty: 'easy',
    theme: 'домашнее задание',
    scrambledWords: ['hago', 'deberes', 'los', 'tarde', 'la', 'por'],
    correctSentence: 'Hago los deberes por la tarde',
    translationAm: 'Ես տնային հանձնարարությունները կատարում եմ կեսօրից հետո։',
    translationRu: 'Я делаю домашнее задание днем.'
  },
  {
    id: 's9',
    difficulty: 'medium',
    theme: 'школьные предметы',
    scrambledWords: ['favorita', 'clase', 'mi', 'matemáticas', 'es'],
    correctSentence: 'Mi clase favorita es matemáticas',
    translationAm: 'Իմ ամենասիրելի դասը մաթեմատիկան է։',
    translationRu: 'Мой любимый класс — математика.'
  },
  {
    id: 's10',
    difficulty: 'hard',
    theme: 'школа',
    scrambledWords: ['tengo', 'que', 'libro', 'un', 'leer', 'biblioteca', 'la', 'de'],
    correctSentence: 'Tengo que leer un libro de la biblioteca',
    translationAm: 'Ես պետք է գրադարանից գիրք կարդամ։',
    translationRu: 'Мне нужно прочитать книгу из библиотеки.'
  }
];

// Procedural Sentence Generator to complete 30+ items
export function generateSentences(difficulty: Difficulty, count: number): SentenceTask[] {
  const wordsTemplates: { phraseEs: string; phraseAm: string; theme: string }[] = [
    { phraseEs: 'El profesor habla español muy bien', phraseAm: 'Ուսուցիչը շատ լավ խոսում է իսպաներեն։', theme: 'школа' },
    { phraseEs: 'Tengo muchos libros en mi mochila', phraseAm: 'Ես իմ պայուսակում շատ գրքեր ունեմ։', theme: 'школа' },
    { phraseEs: 'Mi hermano estudia en el colegio', phraseAm: 'Իմ եղբայրը սովորում է դպրոցում։', theme: 'семья' },
    { phraseEs: 'Nosotros jugamos al fútbol en el patio', phraseAm: 'Մենք բակում ֆուտբոլ ենք խաղում։', theme: 'футбол' },
    { phraseEs: 'Me gusta comer paella con pollo', phraseAm: 'Ինձ դուր է գալիս ուտել պայելյա հավի մսով։', theme: 'еда' },
    { phraseEs: 'El coche de mi padre es azul', phraseAm: 'Իմ հայրիկի մեքենան կապույտ է։', theme: 'транспорт' },
    { phraseEs: 'Hoy tengo un examen de matemáticas', phraseAm: 'Այսօր ես մաթեմատիկայի քննություն ունեմ։', theme: 'домашнее задание' },
    { phraseEs: 'Quiero comprar un cuaderno verde hoy', phraseAm: 'Ես ուզում եմ այսօր կանաչ տետր գնել։', theme: 'школьные предметы' },
    { phraseEs: 'La escuela empieza a las nueve', phraseAm: 'Դպրոցը սկսվում է ժամը իննին։', theme: 'распорядок дня' },
    { phraseEs: 'Mis amigos viven en Barcelona', phraseAm: 'Իմ ընկերները ապրում են Բարսելոնայում։', theme: 'друзья' },
    { phraseEs: 'El gato duerme en la cama', phraseAm: 'Կատուն քնած է մահճակալին։', theme: 'семья' },
    { phraseEs: 'Mañana vamos a visitar un museo', phraseAm: 'Վաղը մենք թանգարան ենք այցելելու։', theme: 'город' },
    { phraseEs: 'Escribo una carta a mi amigo', phraseAm: 'Ես նամակ եմ գրում ընկերոջս։', theme: 'друзья' },
    { phraseEs: 'El agua está fría hoy', phraseAm: 'Ջուրն այսօր սառն է։', theme: 'еда' },
    { phraseEs: 'La biblioteca tiene muchas mesas grandes', phraseAm: 'Գրադարանն ունի շատ մեծ սեղաններ։', theme: 'школа' },
    { phraseEs: 'Me gusta escuchar música de España', phraseAm: 'Ինձ դուր է գալիս լսել Իսպանիայի երաժշտություն։', theme: 'друзья' },
    { phraseEs: 'El metro es un transporte rápido', phraseAm: 'Մետրոն արագ տրանսպորտ է։', theme: 'транспорт' },
    { phraseEs: 'Yo tengo doce años de edad', phraseAm: 'Ես տասներկու տարեկան եմ։', theme: 'семья' },
    { phraseEs: 'Nosotros comemos fruta por la mañana', phraseAm: 'Մենք առավոտյան մրգեր ենք ուտում։', theme: 'еда' },
    { phraseEs: 'Mi clase favorita es la geografía', phraseAm: 'Իմ ամենասիրելի դասը աշխարհագրությունն է։', theme: 'школьные предметы' },
    { phraseEs: 'El estadio de fútbol es enorme', phraseAm: 'Ֆուտբոլի մարզադաշտը հսկայական է։', theme: 'футбол' },
    { phraseEs: 'Hago ejercicio todos los martes', phraseAm: 'Ես ամեն երեքշաբթի մարզվում եմ։', theme: 'распорядок дня' }
  ];

  return wordsTemplates.map((t, idx) => {
    const cleanSentence = t.phraseEs.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const words = cleanSentence.split(' ');
    // Scramble words
    const scrambled = [...words].sort(() => Math.random() - 0.5);
    return {
      id: `gen_s_${idx}`,
      difficulty,
      theme: t.theme,
      scrambledWords: scrambled,
      correctSentence: t.phraseEs,
      translationAm: t.phraseAm,
      translationRu: ''
    };
  });
}

// ==========================================
// 2. SPEED TRANSLATE TASKS (Переведи быстрее / Արագ թարգմանիր)
// ==========================================
export const speedTranslateTasks: SpeedTranslateTask[] = [
  {
    id: 't1',
    difficulty: 'easy',
    phraseAm: 'Ես գնում եմ դպրոց։',
    phraseRu: 'Я иду в школу.',
    options: ['Voy a la escuela', 'Tengo una escuela', 'La escuela va', 'Vivo en la escuela'],
    correctAnswer: 'Voy a la escuela',
    timeLimit: 15
  },
  {
    id: 't2',
    difficulty: 'easy',
    phraseAm: 'Իմ անունը Կառլոս է։',
    phraseRu: 'Меня зовут Карлос.',
    options: ['Me llamo Carlos', 'Tengo doce años', 'Soy un niño', 'Hola Carlos'],
    correctAnswer: 'Me llamo Carlos',
    timeLimit: 15
  },
  {
    id: 't3',
    difficulty: 'easy',
    phraseAm: 'Ինձ դուր է գալիս ֆուտբոլը։',
    phraseRu: 'Мне нравится футбол.',
    options: ['Me gusta el fútbol', 'Juego al tenis', 'No me gusta correr', 'Quiero un balón'],
    correctAnswer: 'Me gusta el fútbol',
    timeLimit: 15
  },
  {
    id: 't4',
    difficulty: 'medium',
    phraseAm: 'Ո՞րն է քո սիրելի առարկան։',
    phraseRu: 'Какой твой любимый предмет?',
    options: ['¿Cuál es tu asignatura favorita?', '¿Dónde está la clase?', '¿Tienes deberes?', '¿Qué hora es?'],
    correctAnswer: '¿Cuál es tu asignatura favorita?',
    timeLimit: 12
  },
  {
    id: 't5',
    difficulty: 'medium',
    phraseAm: 'Կարո՞ղ եք կրկնել, խնդրում եմ։',
    phraseRu: 'Можете повторить, пожалуйста?',
    options: ['¿Puede repetir, por favor?', '¿Puedo entrar?', 'No entiendo nada', 'Muchas gracias'],
    correctAnswer: '¿Puede repetir, por favor?',
    timeLimit: 12
  },
  {
    id: 't6',
    difficulty: 'hard',
    phraseAm: 'Ես պետք է ավարտեմ իմ տնային աշխատանքը։',
    phraseRu: 'Мне нужно закончить домашнее задание.',
    options: ['Tengo que terminar mis deberes', 'Tengo mucha tarea hoy', 'La clase ha terminado', 'Escribo en el cuaderno'],
    correctAnswer: 'Tengo que terminar mis deberes',
    timeLimit: 10
  }
];

export function generateSpeedTranslations(difficulty: Difficulty): SpeedTranslateTask[] {
  const database = [
    { am: 'Բարի լույս, ուսուցիչ։', es: 'Buenos días, profesor', bad: ['Buenas noches amigo', 'Hola chicos', 'Adiós profesor'] },
    { am: 'Ես տասներկու տարեկան եմ։', es: 'Tengo doce años', bad: ['Soy mayor de edad', 'Tengo diez años', 'Quiero doce lápices'] },
    { am: 'Այսօր երեքշաբթի է։', es: 'Hoy es martes', bad: ['Hoy es lunes', 'Mañana es viernes', 'Ayer fue domingo'] },
    { am: 'Որտե՞ղ է գրադարանը։', es: '¿Dónde está la biblioteca?', bad: ['¿Dónde está el baño?', '¿Qué es la biblioteca?', 'La biblioteca es grande'] },
    { am: 'Ես ուզում եմ ջուր խմել։', es: 'Quiero beber agua', bad: ['Quiero comer pan', 'Tengo frío', 'Me gusta la leche'] },
    { am: 'Իմ ընկերը շատ բարի է։', es: 'Mi amigo es muy amable', bad: ['Mi casa es muy grande', 'No tengo amigos', 'El profesor es inteligente'] },
    { am: 'Մաթեմատիկան դժվար է։', es: 'Las matemáticas son difíciles', bad: ['El español es fácil', 'Tengo clase de matemáticas', 'Me gusta sumar números'] },
    { am: 'Դասարանը շատ լուսավոր է։', es: 'La clase es muy luminosa', bad: ['La escuela está cerrada', 'El libro es de papel', 'Tengo un cuaderno azul'] },
    { am: 'Դուք ունե՞ք մատիտ։', es: '¿Tiene un lápiz?', bad: ['¿Tiene un libro?', '¿Dónde está el lápiz?', 'El lápiz es rojo'] },
    { am: 'Ես չգիտեմ պատասխանը։', es: 'No sé la respuesta', bad: ['Tengo la respuesta', 'No entiendo la pregunta', '¿Cuál es la respuesta?'] },
    { am: 'Դասամիջոցը սկսվում է հիմա։', es: 'El recreo empieza ahora', bad: ['La clase termina luego', 'No hay clase de música', 'Vamos al patio'] },
    { am: 'Գիրքը սեղանի վրա է։', es: 'El libro está sobre la mesa', bad: ['El lápiz está en el suelo', 'La mochila está abierta', 'Tengo tres libros'] },
    { am: 'Դուք հասկանո՞ւմ եք իսպաներեն։', es: '¿Entiende español?', bad: ['¿Habla inglés?', '¿Qué idioma es?', 'Me gusta el español'] },
    { am: 'Մենք սիրում ենք նկարել։', es: 'Nosotros nos gusta dibujar', bad: ['Nosotros cantamos bien', 'Tengo pinturas de colores', 'La clase de plástica'] },
    { am: 'Հայրս աշխատում է Մադրիդում։', es: 'Mi padre trabaja en Madrid', bad: ['Mi madre cocina rico', 'Vivo en Madrid', 'Voy a Madrid de vacaciones'] },
    { am: 'Իմ պայուսակը ծանր է։', es: 'Mi mochila es pesada', bad: ['Mi mochila es nueva', 'La mochila es pequeña', 'No tengo mochila'] },
    { am: 'Դուք կարո՞ղ եք օգնել ինձ։', es: '¿Puede ayudarme?', bad: ['¿Puedo ir al baño?', '¿Qué ayuda necesita?', 'Estoy muy cansado'] },
    { am: 'Տնային աշխատանքը հեշտ է։', es: 'La tarea es fácil', bad: ['No tengo tarea', 'La tarea es aburrida', 'Hago los deberes hoy'] },
    { am: 'Սա իմ նոր համակարգիչն է։', es: 'Este es mi nuevo ordenador', bad: ['Tengo un teléfono móvil', 'La pantalla está rota', '¿Dónde está la tablet?'] },
    { am: 'Մենք ապրում ենք Իսպանիայում։', es: 'Nosotros vivimos en España', bad: ['Queremos ir a España', 'Barcelona es bonita', 'Hablamos español en clase'] },
    { am: 'Դասերը վերջանում են ժամը երկուսին։', es: 'Las clases terminan a las dos', bad: ['La escuela abre a las ocho', 'Almuerzo a las tres', 'Tengo dos clases hoy'] },
    { am: 'Այսօր հիանալի օր է։', es: 'Hoy es un día excelente', bad: ['Hace frío hoy', 'No me gusta el clima', 'Mañana será mejor'] },
    { am: 'Ես սիրում եմ խնձորի հյութ։', es: 'Me gusta el zumo de manzana', bad: ['Quiero comer fruta', 'El zumo de naranja es dulce', 'No me gusta la manzana'] },
    { am: 'Գնդակը դաշտում է։', es: 'El balón está en el campo', bad: ['Quiero comprar un balón', 'Jugamos en el estadio', 'El portero para el balón'] },
    { am: 'Դռները փակ են։', es: 'Las puertas están cerradas', bad: ['La ventana está abierta', 'Abre la puerta por favor', 'No tengo la llave'] }
  ];

  return database.map((d, index) => {
    const opts = [d.es, ...d.bad].sort(() => Math.random() - 0.5);
    return {
      id: `gen_t_${index}`,
      difficulty,
      phraseAm: d.am,
      phraseRu: '',
      options: opts,
      correctAnswer: d.es,
      timeLimit: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 12 : 8
    };
  });
}

// ==========================================
// 3. BACKPACK ITEMS (Школьный рюкзак / Դպրոցական պայուսակ)
// ==========================================
export const backpackItems: BackpackItem[] = [
  { id: 'bp1', nameEs: 'un cuaderno', nameAm: 'տետր', nameRu: 'тетрадь', icon: '📓', isSchoolItem: true },
  { id: 'bp2', nameEs: 'un lápiz', nameAm: 'մատիտ', nameRu: 'карандаш', icon: '✏️', isSchoolItem: true },
  { id: 'bp3', nameEs: 'una regla', nameAm: 'քանոն', nameRu: 'линейка', icon: '📏', isSchoolItem: true },
  { id: 'bp4', nameEs: 'un libro', nameAm: 'գիրք', nameRu: 'книга', icon: '📖', isSchoolItem: true },
  { id: 'bp5', nameEs: 'un bolígrafo', nameAm: 'գրիչ', nameRu: 'ручка', icon: '🖊️', isSchoolItem: true },
  { id: 'bp6', nameEs: 'una goma de borrar', nameAm: 'ռետին', nameRu: 'ластик', icon: '🧼', isSchoolItem: true },
  { id: 'bp7', nameEs: 'un estuche', nameAm: 'գրչատուփ', nameRu: 'пенал', icon: '👝', isSchoolItem: true },
  { id: 'bp8', nameEs: 'un sacapuntas', nameAm: 'սրիչ', nameRu: 'точилка', icon: '⚙️', isSchoolItem: true },
  { id: 'bp9', nameEs: 'una pelota', nameAm: 'գնդակ', nameRu: 'мяч', icon: '⚽', isSchoolItem: false },
  { id: 'bp10', nameEs: 'una cuchara', nameAm: 'գդալ', nameRu: 'ложка', icon: '🥄', isSchoolItem: false },
  { id: 'bp11', nameEs: 'un teléfono', nameAm: 'հեռախոս', nameRu: 'телефон', icon: '📱', isSchoolItem: false },
  { id: 'bp12', nameEs: 'una manzana', nameAm: 'խնձոր', nameRu: 'яблоко', icon: '🍎', isSchoolItem: true }, // can put snack
  { id: 'bp13', nameEs: 'un juguete', nameAm: 'խաղալիք', nameRu: 'игрушка', icon: '🧸', isSchoolItem: false },
  { id: 'bp14', nameEs: 'unos auriculares', nameAm: 'ականջակալներ', nameRu: 'наушники', icon: '🎧', isSchoolItem: false },
  { id: 'bp15', nameEs: 'unas tijeras', nameAm: 'մկրատ', nameRu: 'ножницы', icon: '✂️', isSchoolItem: true }
];

export const backpackTasks: BackpackTask[] = [
  {
    id: 'bp_t1',
    difficulty: 'easy',
    instructionEs: 'Pon en la mochila un cuaderno, un lápiz y una regla.',
    instructionAm: 'Պայուսակի մեջ դիր տետր, մատիտ և քանոն։',
    requiredItemIds: ['bp1', 'bp2', 'bp3']
  },
  {
    id: 'bp_t2',
    difficulty: 'easy',
    instructionEs: 'Pon en la mochila un libro, un bolígrafo y un estuche.',
    instructionAm: 'Պայուսակի մեջ դիր գիրք, գրիչ և գրչատուփ։',
    requiredItemIds: ['bp4', 'bp5', 'bp7']
  },
  {
    id: 'bp_t3',
    difficulty: 'medium',
    instructionEs: 'Pon en la mochila un sacapuntas, una goma de borrar, un cuaderno y una manzana.',
    instructionAm: 'Պայուսակի մեջ դիր սրիչ, ռետին, տետր և խնձոր։',
    requiredItemIds: ['bp8', 'bp6', 'bp1', 'bp12']
  },
  {
    id: 'bp_t4',
    difficulty: 'medium',
    instructionEs: 'Pon en la mochila un libro, unas tijeras, un lápiz y un bolígrafo.',
    instructionAm: 'Պայուսակի մեջ դիր գիրք, մկրատ, մատիտ և գրիչ։',
    requiredItemIds: ['bp4', 'bp15', 'bp2', 'bp5']
  },
  {
    id: 'bp_t5',
    difficulty: 'hard',
    instructionEs: 'Pon en la mochila un estuche, un cuaderno, una regla, una goma de borrar y un sacapuntas.',
    instructionAm: 'Պայուսակի մեջ դիր գրչատուփ, տետր, քանոն, ռետին և սրիչ։',
    requiredItemIds: ['bp7', 'bp1', 'bp3', 'bp6', 'bp8']
  }
];

export function generateBackpackTasks(difficulty: Difficulty): BackpackTask[] {
  // Generate 30 custom variations
  const tasks: BackpackTask[] = [];
  const baseItems = backpackItems.filter(i => i.isSchoolItem);
  
  for (let i = 0; i < 30; i++) {
    // Pick 3, 4 or 5 items depending on difficulty
    const numItems = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
    const shuffled = [...baseItems].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numItems);
    const itemNamesEs = selected.map(item => item.nameEs);
    const itemNamesAm = selected.map(item => item.nameAm);
    
    // Create text lists
    const esList = itemNamesEs.slice(0, -1).join(', ') + ' y ' + itemNamesEs[itemNamesEs.length - 1];
    const amList = itemNamesAm.slice(0, -1).join(', ') + ' և ' + itemNamesAm[itemNamesAm.length - 1];

    tasks.push({
      id: `gen_bp_t_${difficulty}_${i}`,
      difficulty,
      instructionEs: `Pon en la mochila ${esList}.`,
      instructionAm: `Պայուսակի մեջ դիր ${amList}։`,
      requiredItemIds: selected.map(item => item.id)
    });
  }
  return tasks;
}

// ==========================================
// 4. SCHEDULE TASKS (Расписание уроков / Դասացուցակ)
// ==========================================
export const scheduleDays: ScheduleDay[] = [
  {
    dayNameEs: 'Lunes',
    dayNameAm: 'Երկուշաբթի',
    classes: [
      { time: '9:00', subjectEs: 'Matemáticas', subjectAm: 'Մաթեմատիկա' },
      { time: '10:00', subjectEs: 'Lengua', subjectAm: 'Լեզու (Իսպաներեն)' },
      { time: '11:00', subjectEs: 'Ciencias', subjectAm: 'Բնագիտություն' },
      { time: '12:00', subjectEs: 'Inglés', subjectAm: 'Անգլերեն' }
    ]
  },
  {
    dayNameEs: 'Martes',
    dayNameAm: 'Երեքշաբթի',
    classes: [
      { time: '9:00', subjectEs: 'Geografía', subjectAm: 'Աշխարհագրություն' },
      { time: '10:00', subjectEs: 'Historia', subjectAm: 'Պատմություն' },
      { time: '11:00', subjectEs: 'Plástica', subjectAm: 'Կերպարվեստ' },
      { time: '12:00', subjectEs: 'Educación Física', subjectAm: 'Ֆիզկուլտուրա' }
    ]
  },
  {
    dayNameEs: 'Miércoles',
    dayNameAm: 'Չորեքշաբթի',
    classes: [
      { time: '9:00', subjectEs: 'Matemáticas', subjectAm: 'Մաթեմատիկա' },
      { time: '10:00', subjectEs: 'Ciencias', subjectAm: 'Բնագիտություն' },
      { time: '11:00', subjectEs: 'Música', subjectAm: 'Երաժշտություն' },
      { time: '12:00', subjectEs: 'Lengua', subjectAm: 'Լեզու (Իսպաներեն)' }
    ]
  }
];

export const scheduleQuestions: ScheduleTask[] = [
  {
    id: 'sc1',
    difficulty: 'easy',
    questionEs: '¿Qué clase tienes el lunes a las nueve (9:00)?',
    questionAm: 'Ի՞նչ դաս ունես երկուշաբթի ժամը իննին (9:00):',
    options: ['Matemáticas', 'Lengua', 'Ciencias', 'Inglés'],
    correctAnswer: 'Matemáticas'
  },
  {
    id: 'sc2',
    difficulty: 'easy',
    questionEs: '¿A qué hora empieza la clase de Ciencias el miércoles?',
    questionAm: 'Չորեքշաբթի օրը ո՞ր ժամին է սկսվում Բնագիտության դասը:',
    options: ['9:00', '10:00', '11:00', '12:00'],
    correctAnswer: '10:00'
  },
  {
    id: 'sc3',
    difficulty: 'medium',
    questionEs: '¿Qué asignatura tienes después de Lengua el lunes?',
    questionAm: 'Երկուշաբթի Լեզվի (Lengua) դասից հետո ի՞նչ առարկա ունես:',
    options: ['Ciencias', 'Matemáticas', 'Inglés', 'Plástica'],
    correctAnswer: 'Ciencias'
  },
  {
    id: 'sc4',
    difficulty: 'medium',
    questionEs: '¿Qué clase tienes el martes a las doce (12:00)?',
    questionAm: 'Երեքշաբթի ժամը տասներկուսին (12:00) ի՞նչ դաս ունես:',
    options: ['Educación Física', 'Historia', 'Geografía', 'Plástica'],
    correctAnswer: 'Educación Física'
  },
  {
    id: 'sc5',
    difficulty: 'hard',
    questionEs: '¿Cuántas clases de Matemáticas hay en el horario en total?',
    questionAm: 'Ընդհանուր առմամբ քանի՞ Մաթեմատիկայի դաս կա դասացուցակում:',
    options: ['Una clase', 'Dos clases', 'Tres clases', 'Ninguna'],
    correctAnswer: 'Dos clases'
  }
];

export function generateScheduleTasks(difficulty: Difficulty): ScheduleTask[] {
  const baseQuestions = [
    { qEs: '¿Qué clase tienes el lunes a las diez (10:00)?', qAm: 'Ի՞նչ դաս ունես երկուշաբթի ժամը տասին (10:00):', ans: 'Lengua', opts: ['Matemáticas', 'Ciencias', 'Lengua', 'Inglés'] },
    { qEs: '¿Qué clase tienes el miércoles a las once (11:00)?', qAm: 'Ի՞նչ դաս ունես չորեքշաբթի ժամը տասնմեկին (11:00):', ans: 'Música', opts: ['Lengua', 'Música', 'Matemáticas', 'Ciencias'] },
    { qEs: '¿A qué hora empieza la clase de Historia el martes?', qAm: 'Երեքշաբթի օրը ո՞ր ժամին է սկսվում Պատմության դասը:', ans: '10:00', opts: ['9:00', '10:00', '11:00', '12:00'] },
    { qEs: '¿Qué asignatura tienes el martes a las nueve (9:00)?', qAm: 'Երեքշաբթի ժամը իննին (9:00) ի՞նչ առարկա ունես:', ans: 'Geografía', opts: ['Historia', 'Geografía', 'Plástica', 'Educación Física'] },
    { qEs: '¿Qué asignatura tienes después de Ciencias el miércoles?', qAm: 'Չորեքշաբթի Բնագիտությունից (Ciencias) հետո ի՞նչ առարկա ունես:', ans: 'Música', opts: ['Música', 'Lengua', 'Matemáticas', 'Inglés'] },
    { qEs: '¿Cuántas clases tienes el lunes en total?', qAm: 'Երկուշաբթի օրը ընդհանուր քանի՞ դաս ունես:', ans: 'Cuatro', opts: ['Tres', 'Cuatro', 'Cinco', 'Seis'] },
    { qEs: '¿Qué día de la semana tienes la clase de Historia?', qAm: 'Շաբաթվա ո՞ր օրն ունես Պատմության դաս:', ans: 'Martes', opts: ['Lunes', 'Martes', 'Miércoles', 'Jueves'] },
    { qEs: '¿Qué día de la semana tienes la clase de Música?', qAm: 'Շաբաթվա ո՞ր օրն ունես Երաժշտության դաս:', ans: 'Miércoles', opts: ['Lunes', 'Martes', 'Miércoles', 'Viernes'] }
  ];

  const list: ScheduleTask[] = [];
  for (let i = 0; i < 30; i++) {
    const q = baseQuestions[i % baseQuestions.length];
    list.push({
      id: `gen_sc_t_${difficulty}_${i}`,
      difficulty,
      questionEs: q.qEs + ` (${i + 1})`,
      questionAm: q.qAm,
      options: [...q.opts].sort(() => Math.random() - 0.5),
      correctAnswer: q.ans
    });
  }
  return list;
}

// ==========================================
// 5. TEACHER SAYS (Учитель говорит / Ուսուցիչն ասում է)
// ==========================================
export const teacherSaysTasks: TeacherSaysTask[] = [
  {
    id: 'ts1',
    difficulty: 'easy',
    commandEs: 'Abre el libro',
    commandAm: 'Բացի՛ր գիրքը',
    actionAm: 'Բացել գիրքը',
    explanationAm: '«Abre el libro» նշանակում է «Բացի՛ր գիրքը»։ «Abrir» նշանակում է բացել, իսկ «el libro»` գիրքը։',
    options: [
      { id: '1', textAm: 'Բացի՛ր գիրքը', textEs: 'Abre el libro', isCorrect: true },
      { id: '2', textAm: 'Փակի՛ր դուռը', textEs: 'Cierra la puerta', isCorrect: false },
      { id: '3', textAm: 'Գրի՛ր ամսաթիվը', textEs: 'Escribe la fecha', isCorrect: false },
      { id: '4', textAm: 'Կարդա՛ տեքստը', textEs: 'Lee el texto', isCorrect: false }
    ]
  },
  {
    id: 'ts2',
    difficulty: 'easy',
    commandEs: 'Cierra la puerta',
    commandAm: 'Փակի՛ր դուռը',
    actionAm: 'Փակել դուռը',
    explanationAm: '«Cierra la puerta» նշանակում է «Փակի՛ր դուռը»։ «Cerrar» նշանակում է փակել, իսկ «la puerta»` դուռը։',
    options: [
      { id: '1', textAm: 'Բարձրացրո՛ւ ձեռքդ', textEs: 'Levanta la mano', isCorrect: false },
      { id: '2', textAm: 'Փակի՛ր դուռը', textEs: 'Cierra la puerta', isCorrect: true },
      { id: '3', textAm: 'Կարդա՛ տեքստը', textEs: 'Lee el texto', isCorrect: false },
      { id: '4', textAm: 'Միացրո՛ւ համակարգիչը', textEs: 'Enciende el ordenador', isCorrect: false }
    ]
  },
  {
    id: 'ts3',
    difficulty: 'easy',
    commandEs: 'Escribe la fecha',
    commandAm: 'Գրի՛ր ամսաթիվը',
    actionAm: 'Գրել ամսաթիվը',
    explanationAm: '«Escribe la fecha» նշանակում է «Գրի՛ր ամսաթիվը»։ «Escribir» նշանակում է գրել, իսկ «la fecha»` ամսաթիվը։',
    options: [
      { id: '1', textAm: 'Կարդա՛ տեքստը', textEs: 'Lee el texto', isCorrect: false },
      { id: '2', textAm: 'Գծիր քանոնով', textEs: 'Dibuja con regla', isCorrect: false },
      { id: '3', textAm: 'Գրի՛ր ամսաթիվը', textEs: 'Escribe la fecha', isCorrect: true },
      { id: '4', textAm: 'Հանձնի՛ր աշխատանքը', textEs: 'Entrega la tarea', isCorrect: false }
    ]
  }
];

export function generateTeacherSays(difficulty: Difficulty): TeacherSaysTask[] {
  const instructions = [
    { es: 'Lee el texto', am: 'Կարդա՛ տեքստը', explanation: '«Lee el texto» նշանակում է «Կարդա՛ տեքստը»։' },
    { es: 'Subraya la palabra', am: 'Ընդգծի՛ր բառը', explanation: '«Subraya la palabra» նշանակում է «Ընդգծի՛ր բառը»։' },
    { es: 'Guarda el archivo', am: 'Պահպանի՛ր ֆայլը', explanation: '«Guarda el archivo» նշանակում է «Պահպանի՛ր ֆայլը»։' },
    { es: 'Entrega la tarea', am: 'Հանձնի՛ր տնային աշխատանքը', explanation: '«Entrega la tarea» նշանակում է «Հանձնի՛ր տնային աշխատանքը»։' },
    { es: 'Levanta la mano', am: 'Բարձրացրո՛ւ ձեռքդ', explanation: '«Levanta la mano» նշանակում է «Բարձրացրո՛ւ ձեռքդ»։' },
    { es: 'Escucha con atención', am: 'Լսի՛ր ուշադիր', explanation: '«Escucha con atención» նշանակում է «Լսի՛ր ուշադիր»։' },
    { es: 'Sentaos por favor', am: 'Նստե՛ք, խնդրում եմ', explanation: '«Sentaos por favor» նշանակում է «Նստե՛ք, խնդրում եմ»։' },
    { es: 'Ponte de pie', am: 'Կանգնի՛ր ոտքի', explanation: '«Ponte de pie» նշանակում է «Կանգնի՛ր ոտքի»։' },
    { es: 'Saca el lápiz', am: 'Հանի՛ր մատիտը', explanation: '«Saca el lápiz» նշանակում է «Հանի՛ր մատիտը»։' },
    { es: 'Silencio, por favor', am: 'Լռությո՛ւն, խնդրում եմ', explanation: '«Silencio, por favor» նշանակում է «Լռությո՛ւն, խնդրում եմ»։' }
  ];

  const results: TeacherSaysTask[] = [];
  for (let i = 0; i < 30; i++) {
    const item = instructions[i % instructions.length];
    const wrongItems = instructions.filter(x => x.es !== item.es).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [
      { id: 'correct', textAm: item.am, textEs: item.es, isCorrect: true },
      ...wrongItems.map((w, index) => ({ id: `wrong_${index}`, textAm: w.am, textEs: w.es, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    results.push({
      id: `gen_ts_t_${difficulty}_${i}`,
      difficulty,
      commandEs: item.es,
      commandAm: item.am,
      actionAm: item.am,
      explanationAm: item.explanation,
      options
    });
  }
  return results;
}

// ==========================================
// 6. SCHOOL SUBJECTS (Найди школьный предмет / Գտիր առարկան)
// ==========================================
export const schoolSubjectsTasks: SchoolSubjectTask[] = [
  {
    id: 'subj1',
    difficulty: 'easy',
    descriptionEs: 'En esta asignatura trabajamos con números.',
    descriptionAm: 'Այս առարկայի ժամանակ մենք աշխատում ենք թվերի հետ։',
    correctSubjectEs: 'Matemáticas',
    correctSubjectAm: 'Մաթեմատիկա',
    optionsEs: ['Matemáticas', 'Ciencias', 'Lengua', 'Geografía']
  },
  {
    id: 'subj2',
    difficulty: 'easy',
    descriptionEs: 'Estudiamos animales y plantas en la naturaleza.',
    descriptionAm: 'Մենք ուսումնասիրում ենք կենդանիներին և բույսերին բնության մեջ։',
    correctSubjectEs: 'Ciencias',
    correctSubjectAm: 'Բնագիտություն',
    optionsEs: ['Ciencias', 'Lengua', 'Plástica', 'Música']
  },
  {
    id: 'subj3',
    difficulty: 'medium',
    descriptionEs: 'Leemos libros de literatura, aprendemos reglas de ortografía y escribimos textos.',
    descriptionAm: 'Մենք կարդում ենք գրականության գրքեր, սովորում ենք ուղղագրության կանոններ և գրում տեքստեր։',
    correctSubjectEs: 'Lengua',
    correctSubjectAm: 'Լեզու (Իսպաներեն)',
    optionsEs: ['Lengua', 'Inglés', 'Historia', 'Religión']
  },
  {
    id: 'subj4',
    difficulty: 'medium',
    descriptionEs: 'Aprendemos sobre países, montañas, ríos y mapas del mundo.',
    descriptionAm: 'Մենք սովորում ենք երկրների, լեռների, գետերի և աշխարհի քարտեզների մասին։',
    correctSubjectEs: 'Geografía',
    correctSubjectAm: 'Աշխարհագրություն',
    optionsEs: ['Geografía', 'Historia', 'Plástica', 'Ciencias']
  },
  {
    id: 'subj5',
    difficulty: 'hard',
    descriptionEs: 'Dibujamos con lápices, pintamos con acuarelas y hacemos manualidades con papel.',
    descriptionAm: 'Մենք նկարում ենք մատիտներով, ներկում ջրաներկով և թղթից ձեռագործ աշխատանքներ պատրաստում։',
    correctSubjectEs: 'Plástica',
    correctSubjectAm: 'Կերպարվեստ',
    optionsEs: ['Plástica', 'Música', 'Tecnología', 'Educación Física']
  }
];

export function generateSchoolSubjects(difficulty: Difficulty): SchoolSubjectTask[] {
  const subjects = [
    { es: 'Educación Física', am: 'Ֆիզկուլտուրա', descEs: 'Hacemos ejercicio, corremos y jugamos a deportes en el gimnasio o patio.', descAm: 'Մենք մարզվում ենք, վազում և սպորտային խաղեր խաղում մարզադահլիճում կամ բակում:' },
    { es: 'Música', am: 'Երաժշտություն', descEs: 'Cantamos canciones, tocamos la flauta y aprendemos sobre compositores famosos.', descAm: 'Մենք երգում ենք երգեր, նվագում ֆլեյտա և սովորում հայտնի կոմպոզիտորների մասին:' },
    { es: 'Historia', am: 'Պատմություն', descEs: 'Estudiamos el pasado, los reyes antiguos, imperios y guerras de otros tiempos.', descAm: 'Մենք ուսումնասիրում ենք անցյալը, հին թագավորներին, կայսրությունները և հին ժամանակների պատերազմները:' },
    { es: 'Inglés', am: 'Անգլերեն', descEs: 'Aprendemos el idioma que se habla en Inglaterra y Estados Unidos.', descAm: 'Մենք սովորում ենք այն լեզուն, որով խոսում են Անգլիայում և Ամերիկայի Միացյալ Նահանգներում:' },
    { es: 'Tecnología', am: 'Տեխնոլոգիա', descEs: 'Trabajamos con ordenadores, aprendemos a programar y diseñar sistemas.', descAm: 'Մենք աշխատում ենք համակարգիչներով, սովորում ծրագրավորել և նախագծել համակարգեր:' }
  ];

  const list: SchoolSubjectTask[] = [];
  for (let i = 0; i < 30; i++) {
    const s = subjects[i % subjects.length];
    const wrong = subjects.filter(x => x.es !== s.es).map(x => x.es);
    const options = [s.es, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);

    list.push({
      id: `gen_subj_t_${difficulty}_${i}`,
      difficulty,
      descriptionEs: s.descEs,
      descriptionAm: s.descAm,
      correctSubjectEs: s.es,
      correctSubjectAm: s.am,
      optionsEs: options
    });
  }
  return list;
}

// ==========================================
// 7. MATH QUEST (Математический квест / Մաթեմատիկական քվեստ)
// ==========================================
export const mathQuestSteps: MathQuestStep[] = [
  {
    id: 'mq1',
    difficulty: 'easy',
    storyEs: 'Estás en el primer pasillo del colegio y encuentras una puerta misteriosa.',
    storyAm: 'Դու գտնվում ես դպրոցի առաջին միջանցքում և գտնում ես մի առեղծվածային դուռ:',
    questionEs: 'Tienes 12 lápices en tu mochila y das 4 a tu amigo. ¿Cuántos lápices te quedan?',
    questionAm: 'Դու պայուսակումդ ունես 12 մատիտ և 4-ը տալիս ես ընկերոջդ։ Քանի՞ մատիտ է մնում քեզ մոտ:',
    correctAnswer: '8',
    options: ['6', '8', '10', '16'],
    solutionAm: '12 - 4 = 8: Մնում է 8 մատիտ:'
  },
  {
    id: 'mq2',
    difficulty: 'easy',
    storyEs: 'Para abrir el cofre del tesoro del aula de matemáticas, necesitas resolver el código.',
    storyAm: 'Մաթեմատիկայի դասարանի գանձերի արկղը բացելու համար քեզ պետք է լուծել կոդը:',
    questionEs: 'En una clase hay 14 niños y 13 niñas. ¿Cuántos alumnos hay en total?',
    questionAm: 'Դասարանում կա 14 տղա և 13 աղջիկ։ Ընդհանուր քանի՞ աշակերտ կա դասարանում:',
    correctAnswer: '27',
    options: ['25', '26', '27', '28'],
    solutionAm: '14 + 13 = 27 աշակերտ:'
  },
  {
    id: 'mq3',
    difficulty: 'medium',
    storyEs: 'El profesor te pide calcular la cantidad de folios para el examen.',
    storyAm: 'Ուսուցիչը խնդրում է քեզ հաշվել քննության համար անհրաժեշտ թերթիկների քանակը:',
    questionEs: 'Si compras 3 cuadernos y cada uno cuesta 2 euros, ¿cuánto pagas en total?',
    questionAm: 'Եթե գնում ես 3 տետր, և յուրաքանչյուրն արժե 2 եվրո, ընդհանուր որքա՞ն ես վճարում:',
    correctAnswer: '6',
    options: ['4', '5', '6', '8'],
    solutionAm: '3 x 2 = 6 եվրո:'
  }
];

export function generateMathQuest(difficulty: Difficulty): MathQuestStep[] {
  const problems = [
    { qEs: 'Tienes 15 euros. Compras un estuche de 7 euros. ¿Cuántos euros te quedan?', qAm: 'Դու ունես 15 եվրո։ Գնում ես 7 եվրոյանոց գրչատուփ։ Քանի՞ եվրո է մնում քեզ մոտ:', ans: '8', opts: ['5', '7', '8', '9'], sol: '15 - 7 = 8 եվրո:' },
    { qEs: 'Hay 4 mesas en el aula. Cada mesa tiene 4 patas. ¿Cuántas patas hay en total?', qAm: 'Դասարանում կա 4 սեղան։ Յուրաքանչյուր սեղան ունի 4 ոտք։ Ընդհանուր քանի՞ ոտք կա:', ans: '16', opts: ['12', '14', '16', '18'], sol: '4 x 4 = 16 ոտք:' },
    { qEs: 'Un examen dura 45 minutos. Si empieza a las 9:00, ¿a qué hora termina?', qAm: 'Քննությունը տևում է 45 րոպե։ Եթե այն սկսվում է 9:00-ին, ո՞ր ժամին է ավարտվում:', ans: '9:45', opts: ['9:30', '9:45', '10:00', '10:15'], sol: '9:00 + 45 րոպե = 9:45:' },
    { qEs: 'Tienes 24 manzanas y quieres repartirlas entre 6 amigos. ¿Cuántas manzanas recibe cada uno?', qAm: 'Դու ունես 24 խնձոր և ուզում ես բաժանել 6 ընկերների միջև։ Քանի՞ խնձոր է ստանում յուրաքանչյուրը:', ans: '4', opts: ['3', '4', '5', '6'], sol: '24 ÷ 6 = 4 խնձոր:' },
    { qEs: 'El calendario marca el 10 de octubre. El examen es en 7 días. ¿Qué día es el examen?', qAm: 'Օրացույցը ցույց է տալիս հոկտեմբերի 10-ը։ Քննությունը 7 օրից է։ Ո՞ր օրն է քննությունը:', ans: '17', opts: ['15', '16', '17', '18'], sol: '10 + 7 = 17:' }
  ];

  const list: MathQuestStep[] = [];
  for (let i = 0; i < 30; i++) {
    const p = problems[i % problems.length];
    list.push({
      id: `gen_mq_t_${difficulty}_${i}`,
      difficulty,
      storyEs: `Estás en la etapa ${i + 1} del laberinto matemático del colegio.`,
      storyAm: `Դու գտնվում ես դպրոցի մաթեմատիկական լաբիրինթոսի ${i + 1}-րդ փուլում:`,
      questionEs: p.qEs,
      questionAm: p.qAm,
      correctAnswer: p.ans,
      options: [...p.opts].sort(() => Math.random() - 0.5),
      solutionAm: p.sol
    });
  }
  return list;
}

// ==========================================
// 8. SHOP ITEMS & TASKS (Магазин / Դպրոցական խանութ)
// ==========================================
export const shopItems: ShopItem[] = [
  { id: 'sh1', nameEs: 'un cuaderno', nameAm: 'տետր', price: 3 },
  { id: 'sh2', nameEs: 'un lápiz', nameAm: 'մատիտ', price: 1 },
  { id: 'sh3', nameEs: 'una mochila', nameAm: 'պայուսակ', price: 20 },
  { id: 'sh4', nameEs: 'una regla', nameAm: 'քանոն', price: 2 },
  { id: 'sh5', nameEs: 'un bolígrafo', nameAm: 'գրիչ', price: 2 },
  { id: 'sh6', nameEs: 'un estuche', nameAm: 'գրչատուփ', price: 5 },
  { id: 'sh7', nameEs: 'un sacapuntas', nameAm: 'սրիչ', price: 1 },
  { id: 'sh8', nameEs: 'una goma de borrar', nameAm: 'ռետին', price: 1 }
];

export const shopTasks: ShopTask[] = [
  {
    id: 'sh_t1',
    difficulty: 'easy',
    budget: 10,
    instructionEs: 'Tienes 10 euros. Compra dos cuadernos y una regla.',
    instructionAm: 'Դու ունես 10 եվրո։ Գնի՛ր երկու տետր և մեկ քանոն:',
    requiredItems: [
      { itemId: 'sh1', quantity: 2 },
      { itemId: 'sh4', quantity: 1 }
    ],
    questionEs: '¿Cuánto dinero te queda?',
    questionAm: 'Որքա՞ն գումար է քեզ մոտ մնում:',
    correctAnswer: '2 €',
    options: ['1 €', '2 €', '3 €', '4 €']
  },
  {
    id: 'sh_t2',
    difficulty: 'medium',
    budget: 15,
    instructionEs: 'Tienes 15 euros. Compra un estuche de 5 euros, un bolígrafo de 2 euros y tres lápices de 1 euro.',
    instructionAm: 'Դու ունես 15 եվրո։ Գնի՛ր մեկ գրչատուփ (5 €), մեկ գրիչ (2 €) և երեք մատիտ (1 €):',
    requiredItems: [
      { itemId: 'sh6', quantity: 1 },
      { itemId: 'sh5', quantity: 1 },
      { itemId: 'sh2', quantity: 3 }
    ],
    questionEs: '¿Cuál es el coste total de la compra?',
    questionAm: 'Որքա՞ն է կազմում գնումների ընդհանուր արժեքը:',
    correctAnswer: '10 €',
    options: ['8 €', '9 €', '10 €', '11 €']
  }
];

export function generateShopTasks(difficulty: Difficulty): ShopTask[] {
  const list: ShopTask[] = [];
  for (let i = 0; i < 30; i++) {
    // Generate custom budget and combinations
    const budget = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
    const item1 = shopItems[i % shopItems.length];
    const item2 = shopItems[(i + 2) % shopItems.length];
    
    const qty1 = 2;
    const qty2 = 1;
    const totalCost = (item1.price * qty1) + (item2.price * qty2);
    const balance = budget - totalCost;

    list.push({
      id: `gen_sh_t_${difficulty}_${i}`,
      difficulty,
      budget,
      instructionEs: `Tienes ${budget} euros. Compra ${qty1} de "${item1.nameEs}" (${item1.price} € c/u) y ${qty2} de "${item2.nameEs}" (${item2.price} € c/u).`,
      instructionAm: `Դու ունես ${budget} եվրո։ Գնի՛ր ${qty1} հատ "${item1.nameAm}" (յուրաքանչյուրը ${item1.price} €) և ${qty2} հատ "${item2.nameAm}" (յուրաքանչյուրը ${item2.price} €):`,
      requiredItems: [
        { itemId: item1.id, quantity: qty1 },
        { itemId: item2.id, quantity: qty2 }
      ],
      questionEs: '¿Cuánto dinero te queda de cambio?',
      questionAm: 'Որքա՞ն մանր է քեզ մնում:',
      correctAnswer: `${balance} €`,
      options: [`${balance - 2} €`, `${balance} €`, `${balance + 1} €`, `${balance + 3} €`].filter(o => !o.includes('-'))
    });
  }
  return list;
}

// ==========================================
// 9. TIME TELLING (Который час? / Ժամը քանիսն է՞)
// ==========================================
export const timeTasks: TimeTask[] = [
  {
    id: 'time1',
    difficulty: 'easy',
    hours: 8,
    minutes: 0,
    situationEs: 'La escuela empieza pronto.',
    situationAm: 'Դպրոցը շուտով սկսվելու է։',
    correctAnswerEs: 'Son las ocho',
    optionsEs: ['Son las ocho', 'Son las ocho y media', 'Son las nueve menos cuarto', 'Es la una']
  },
  {
    id: 'time2',
    difficulty: 'easy',
    hours: 8,
    minutes: 30,
    situationEs: 'Preparando el desayuno antes de las clases.',
    situationAm: 'Նախաճաշի պատրաստում դասերից առաջ։',
    correctAnswerEs: 'Son las ocho y media',
    optionsEs: ['Son las ocho y media', 'Son las nueve menos cuarto', 'Es la una', 'Son las diez y cuarto']
  },
  {
    id: 'time3',
    difficulty: 'medium',
    hours: 8,
    minutes: 45,
    situationEs: 'Falta poco para tocar el timbre.',
    situationAm: 'Քիչ ժամանակ է մնացել զանգի հնչելուն։',
    correctAnswerEs: 'Son las nueve menos cuarto',
    optionsEs: ['Son las nueve menos cuarto', 'Son las ocho y media', 'Son las nueve y cuarto', 'Son las diez en punto']
  }
];

export function generateTimeTasks(difficulty: Difficulty): TimeTask[] {
  const times = [
    { h: 9, m: 0, ans: 'Son las nueve', sitEs: 'La clase de matemáticas empieza a las nueve.', sitAm: 'Մաթեմատիկայի դասը սկսվում է ժամը իննին։', opts: ['Son las nueve', 'Son las nueve y cuarto', 'Son las diez', 'Son las nueve menos cuarto'] },
    { h: 11, m: 0, ans: 'Son las once', sitEs: 'El recreo es a las once.', sitAm: 'Դասամիջոցը ժամը տասնմեկին է։', opts: ['Son las once', 'Son las once y media', 'Es la una', 'Son las doce'] },
    { h: 14, m: 0, ans: 'Son las dos', sitEs: 'Termino las clases a las dos de la tarde.', sitAm: 'Դասերս ավարտում եմ ցերեկը ժամը երկուսին։', opts: ['Son las dos', 'Son las dos y media', 'Es la una', 'Son las tres'] },
    { h: 17, m: 0, ans: 'Son las cinco', sitEs: 'Hago los deberes de español a las cinco.', sitAm: 'Տնային հանձնարարություններս կատարում եմ ժամը հինգին։', opts: ['Son las cinco', 'Son las cinco y media', 'Son las cuatro', 'Son las seis menos cuarto'] },
    { h: 1, m: 0, ans: 'Es la una', sitEs: 'Almuerzo en la cafetería del colegio.', sitAm: 'Ճաշում եմ դպրոցի ճաշարանում։', opts: ['Es la una', 'Son las doce', 'Son las dos', 'Es la una y media'] }
  ];

  const list: TimeTask[] = [];
  for (let i = 0; i < 30; i++) {
    const t = times[i % times.length];
    list.push({
      id: `gen_time_t_${difficulty}_${i}`,
      difficulty,
      hours: t.h,
      minutes: t.m,
      situationEs: t.sitEs,
      situationAm: t.sitAm,
      correctAnswerEs: t.ans,
      optionsEs: [...t.opts].sort(() => Math.random() - 0.5)
    });
  }
  return list;
}

// ==========================================
// 10. CALENDAR TASKS (Календарь / Օրացույց)
// ==========================================
export const calendarTasks: CalendarTask[] = [
  {
    id: 'cal1',
    difficulty: 'easy',
    monthNameEs: 'Octubre',
    monthNameAm: 'Հոկտեմբեր',
    daysCount: 31,
    events: [
      { date: 12, titleEs: 'Día de la Hispanidad', titleAm: 'Իսպանական ժառանգության օր' },
      { date: 20, titleEs: 'Examen de Matemáticas', titleAm: 'Մաթեմատիկայի քննություն' }
    ],
    questionEs: '¿Qué evento hay el doce (12) de octubre?',
    questionAm: 'Ի՞նչ իրադարձություն կա հոկտեմբերի տասներկուսին (12):',
    options: ['Día de la Hispanidad', 'Examen de Matemáticas', 'Excursión al parque', 'Fin de clases'],
    correctAnswer: 'Día de la Hispanidad'
  }
];

export function generateCalendarTasks(difficulty: Difficulty): CalendarTask[] {
  const eventsData = [
    { day: 15, titleEs: 'Excursión al museo', titleAm: 'Էքսկուրսիա դեպի թանգարան', qEs: '¿Qué día de octubre es la excursión al museo?', qAm: 'Հոկտեմբերի ո՞ր օրն է էքսկուրսիան դեպի թանգարան:', ans: '15', opts: ['12', '15', '20', '25'] },
    { day: 24, titleEs: 'Día del Estudiante', titleAm: 'Ուսանողների օր', qEs: '¿Cuándo celebramos el Día del Estudiante?', qAm: 'Ե՞րբ ենք նշում Ուսանողների օրը:', ans: '24 de octubre', opts: ['10 de octubre', '15 de octubre', '24 de octubre', '30 de octubre'] },
    { day: 5, titleEs: 'Clase de Educación Física', titleAm: 'Ֆիզկուլտուրայի դաս', qEs: '¿Qué día tienes la primera clase de Educación Física?', qAm: 'Ո՞ր օրն ունես առաջին Ֆիզկուլտուրայի դասը:', ans: '5', opts: ['1', '5', '10', '15'] }
  ];

  const list: CalendarTask[] = [];
  for (let i = 0; i < 30; i++) {
    const ev = eventsData[i % eventsData.length];
    list.push({
      id: `gen_cal_t_${difficulty}_${i}`,
      difficulty,
      monthNameEs: 'Octubre',
      monthNameAm: 'Հոկտեմբեր',
      daysCount: 31,
      events: [
        { date: 12, titleEs: 'Día de la Hispanidad', titleAm: 'Իսպանական ժառանգության օր' },
        { date: 15, titleEs: 'Excursión al museo', titleAm: 'Էքսկուրսիա դեպի թանգարան' },
        { date: 20, titleEs: 'Examen de Matemáticas', titleAm: 'Մաթեմատիկայի քննություն' },
        { date: 24, titleEs: 'Día del Estudiante', titleAm: 'Ուսանողների օր' }
      ],
      questionEs: ev.qEs,
      questionAm: ev.qAm,
      options: [...ev.opts].sort(() => Math.random() - 0.5),
      correctAnswer: ev.ans
    });
  }
  return list;
}

// ==========================================
// 11. DIALOGUE TASKS (Диалог в школе / Դպրոցական երկխոսություն)
// ==========================================
export const dialogueTasks: DialogueTask[] = [
  {
    id: 'diag1',
    difficulty: 'easy',
    situationAm: 'Ուսուցչի հետ ողջույն դասարանում:',
    dialogueBefore: [
      { speaker: 'Profesor', text: 'Buenos días, alumnos.', translationAm: 'Բարի լույս, աշակերտներ։' }
    ],
    missingPhraseOptions: [
      'Buenos días, profesor.',
      'Hasta mañana.',
      'Tengo doce años.',
      'Me gusta el fútbol.'
    ],
    correctMissingPhrase: 'Buenos días, profesor.',
    dialogueAfter: [
      { speaker: 'Profesor', text: 'Abre el libro en la página diez, por favor.', translationAm: 'Բացե՛ք գիրքը տասներորդ էջում, խնդրում եմ։' }
    ]
  }
];

export function generateDialogueTasks(difficulty: Difficulty): DialogueTask[] {
  const dialogues = [
    {
      sit: 'Ծանոթություն դասընկերոջ հետ դպրոցի բակում:',
      before: [{ speaker: 'Carlos', text: 'Hola, me llamo Carlos. ¿Cómo te llamas?', translationAm: 'Ողջո՛ւյն, իմ անունը Կառլոս է։ Իսկ քո անո՞ւնն ինչ է։' }],
      opts: ['Me llamo Davit.', 'Tengo hambre.', '¿Dónde está el baño?', 'Adiós Carlos.'],
      ans: 'Me llamo Davit.',
      after: [{ speaker: 'Carlos', text: 'Encantado de conocerte, Davit. ¿Quieres jugar al fútbol?', translationAm: 'Ուրախ եմ ծանոթանալու համար, Դավիթ։ Ուզո՞ւմ ես ֆուտբոլ խաղալ։' }]
    },
    {
      sit: 'Խնդրանք ուսուցչին՝ դասարանից դուրս գալու համար:',
      before: [{ speaker: 'Alumno', text: 'Disculpe, profesor. Tengo una pregunta.', translationAm: 'Ներողություն, պարոն ուսուցիչ։ Ես հարց ունեմ։' }],
      opts: ['¿Puedo ir al baño, por favor?', 'Quiero comer una manzana.', 'Tengo un cuaderno rojo.', 'Hoy es lunes.'],
      ans: '¿Puedo ir al baño, por favor?',
      after: [{ speaker: 'Profesor', text: 'Sí, claro. Ve rápido y vuelve pronto.', translationAm: 'Այո՛, իհարկե։ Արագ գնա և շուտ վերադարձիր։' }]
    },
    {
      sit: 'Տնային աշխատանքի մասին հարցում դասընկերոջը:',
      before: [{ speaker: 'Ana', text: 'Hola, Juan. ¿Hiciste los deberes de español?', translationAm: 'Ողջո՛ւյն, Խուան։ Կատարեցի՞ր իսպաներենի տնայինը։' }],
      opts: ['Sí, son muy fáciles hoy.', 'No tengo bolígrafo.', 'Me gusta la paella.', 'Voy a Barcelona.'],
      ans: 'Sí, son muy fáciles hoy.',
      after: [{ speaker: 'Ana', text: '¡Genial! ¿Me puedes ayudar con la pregunta tres?', translationAm: 'Հրաշալի՛ է: Կարո՞ղ ես օգնել ինձ երրորդ հարցի հարցում:' }]
    },
    {
      sit: 'Ուշացում դասից և դիմում ուսուցչին:',
      before: [{ speaker: 'Alumno', text: 'Buenos días, profesor. Siento llegar tarde.', translationAm: 'Բարի լույս, պարոն ուսուցիչ։ Ցավում եմ ուշանալու համար։' }],
      opts: ['¿Puedo pasar, por favor?', 'Adiós, hasta luego.', '¿Cuánto cuesta el lápiz?', 'Me gusta estudiar.'],
      ans: '¿Puedo pasar, por favor?',
      after: [{ speaker: 'Profesor', text: 'Pasa y siéntate. Estamos en la página doce.', translationAm: 'Անցի՛ր և նստի՛ր։ Տասներկուերորդ էջում ենք։' }]
    }
  ];

  const list: DialogueTask[] = [];
  for (let i = 0; i < 30; i++) {
    const d = dialogues[i % dialogues.length];
    list.push({
      id: `gen_diag_t_${difficulty}_${i}`,
      difficulty,
      situationAm: d.sit,
      dialogueBefore: d.before,
      missingPhraseOptions: [...d.opts].sort(() => Math.random() - 0.5),
      correctMissingPhrase: d.ans,
      dialogueAfter: d.after
    });
  }
  return list;
}

// ==========================================
// 12. WHAT WOULD YOU SAY (Что ты скажешь? / Ի՞նչ կասես այս իրավիճակում)
// ==========================================
export const whatWouldYouSayTasks: WhatWouldYouSayTask[] = [
  {
    id: 'ws1',
    difficulty: 'easy',
    situationAm: 'Դու չես հասկացել ուսուցչի հարցը։ Ի՞նչ կասես։',
    optionsEs: [
      '¿Puede repetir, por favor?',
      'Quiero un bocadillo.',
      'Vivo en Madrid.',
      'Hoy es martes.'
    ],
    correctAnswerEs: '¿Puede repetir, por favor?',
    explanationAm: '«¿Puede repetir, por favor?» նշանակում է «Կարո՞ղ եք կրկնել, խնդրում եմ»։ Սա քաղաքավարի ձև է ուսուցչին դիմելու համար։'
  }
];

export function generateWhatWouldYouSay(difficulty: Difficulty): WhatWouldYouSayTask[] {
  const situations = [
    { sit: 'Դու մոռացել ես տետրդ տանը։ Ի՞նչ կասես ուսուցչին։', ans: 'He olvidado mi cuaderno en casa.', explanation: '«He olvidado mi cuaderno en casa» նշանակում է «Ես տետրս տանն եմ մոռացել»։', bad: ['Quiero un helado.', 'Tengo un cuaderno azul.', '¿Dónde está la regla?'] },
    { sit: 'Դու ուզում ես դասընկերոջիցդ մատիտ խնդրել։ Ի՞նչ կասես։', ans: '¿Me dejas un lápiz, por favor?', explanation: '«¿Me dejas un lápiz, por favor?» նշանակում է «Կտա՞ս ինձ մատիտ, խնդրում եմ»։', bad: ['Tengo un lápiz rojo.', 'No me gusta escribir.', '¿Qué hora tienes?'] },
    { sit: 'Դու վատ ես զգում և ուզում ես գնալ բուժկետ։ Ի՞նչ կասես ուսուցչին։', ans: 'No me siento bien, ¿puedo ir a la enfermería?', explanation: '«No me siento bien, ¿puedo ir a la enfermería?» նշանակում է «Ես ինձ լավ չեմ զգում, կարո՞ղ եմ բուժկետ գնալ»։', bad: ['Me gusta la clase.', 'Quiero jugar al fútbol.', '¿Tiene un caramelo?'] },
    { sit: 'Դու չգիտես ուսուցչի տված հարցի պատասխանը։ Ի՞նչ կասես։', ans: 'No sé la respuesta.', explanation: '«No sé la respuesta» նշանակում է «Ես չգիտեմ պատասխանը»։', bad: ['No quiero hablar.', 'La respuesta es fácil.', 'Tengo la tarea lista.'] },
    { sit: 'Դու ուզում ես դասարան մտնելու թույլտվություն խնդրել։ Ի՞նչ կասես։', ans: '¿Puedo pasar, por favor?', explanation: '«¿Puedo pasar, por favor?» նշանակում է «Կարո՞ղ եմ ներս մտնել, խնդրում եմ»։', bad: ['Adiós, profesor.', 'Voy a mi casa.', '¿Dónde vives?'] }
  ];

  const list: WhatWouldYouSayTask[] = [];
  for (let i = 0; i < 30; i++) {
    const s = situations[i % situations.length];
    const options = [s.ans, ...s.bad].sort(() => Math.random() - 0.5);
    list.push({
      id: `gen_ws_t_${difficulty}_${i}`,
      difficulty,
      situationAm: s.sit,
      optionsEs: options,
      correctAnswerEs: s.ans,
      explanationAm: s.explanation
    });
  }
  return list;
}

// ==========================================
// 13. TRUE OR FALSE (Правда или ложь / Ճիշտ է թե Սխալ)
// ==========================================
export const trueOrFalseTasks: TrueOrFalseTask[] = [
  {
    id: 'tf1',
    difficulty: 'easy',
    textEs: 'Carlos tiene doce años. Vive en Madrid y juega al fútbol los sábados.',
    textAm: 'Կառլոսը տասներկու տարեկան է։ Նա ապրում է Մադրիդում և շաբաթ օրերին ֆուտբոլ է խաղում։',
    statementEs: 'Carlos tiene trece años.',
    statementAm: 'Կառլոսը տասներեք տարեկան է։',
    isTrue: false
  },
  {
    id: 'tf2',
    difficulty: 'easy',
    textEs: 'Carlos tiene doce años. Vive en Madrid y juega al fútbol los sábados.',
    textAm: 'Կառլոսը տասներկու տարեկան է։ Նա ապրում է Մադրիդում և շաբաթ օրերին ֆուտբոլ է խաղում։',
    statementEs: 'Carlos vive en Madrid.',
    statementAm: 'Կառլոսը ապրում է Մադրիդում։',
    isTrue: true
  }
];

export function generateTrueOrFalse(difficulty: Difficulty): TrueOrFalseTask[] {
  const stories = [
    {
      txtEs: 'Sofía es de Barcelona. Estudia en una escuela grande y su asignatura favorita es la clase de Plástica. Ella dibuja muy bien.',
      txtAm: 'Սոֆիան Բարսելոնայից է։ Նա սովորում է մի մեծ դպրոցում, և իր ամենասիրելի առարկան Կերպարվեստն է։ Նա շատ լավ է նկարում։',
      queries: [
        { qEs: 'Sofía vive en Madrid.', qAm: 'Սոֆիան ապրում է Մադրիդում։', val: false },
        { qEs: 'A Sofía le gusta dibujar.', qAm: 'Սոֆիան սիրում է նկարել։', val: true },
        { qEs: 'Su asignatura favorita es Matemáticas.', qAm: 'Նրա սիրելի առարկան Մաթեմատիկան է։', val: false }
      ]
    },
    {
      txtEs: 'Davit come un bocadillo de jamón en el recreo de las once. Su amigo Alejandro come una manzana roja. Ellos hablan de fútbol.',
      txtAm: 'Դավիթը ժամը տասնմեկի դասամիջոցին խոզապուխտով սենդվիչ է ուտում։ Նրա ընկեր Ալեխանդրոն ուտում է կարմիր խնձոր։ Նրանք խոսում են ֆուտբոլի մասին։',
      queries: [
        { qEs: 'Davit come una manzana en el recreo.', qAm: 'Դավիթը դասամիջոցին խնձոր է ուտում։', val: false },
        { qEs: 'El recreo empieza a las once.', qAm: 'Դասամիջոցը սկսվում է ժամը տասնմեկին։', val: true },
        { qEs: 'Los amigos hablan de matemáticas.', qAm: 'Ընկերները խոսում են մաթեմատիկայի մասին։', val: false }
      ]
    }
  ];

  const list: TrueOrFalseTask[] = [];
  for (let i = 0; i < 30; i++) {
    const s = stories[i % stories.length];
    const q = s.queries[i % s.queries.length];
    list.push({
      id: `gen_tf_t_${difficulty}_${i}`,
      difficulty,
      textEs: s.txtEs,
      textAm: s.txtAm,
      statementEs: q.qEs,
      statementAm: q.qAm,
      isTrue: q.val
    });
  }
  return list;
}

// ==========================================
// 14. ERROR DETECTIVE (Детектив ошибок / Սխալների դետեկտիվ)
// ==========================================
export const errorDetectiveTasks: ErrorDetectiveTask[] = [
  {
    id: 'ed1',
    difficulty: 'easy',
    incorrectSentenceEs: 'Yo tiene doce años.',
    correctSentenceEs: 'Yo tengo doce años.',
    explanationAm: '«Tener» (ունենալ) բայի առաջին դեմքը (Yo) իսպաներենում «tengo»-ն է, ոչ թե «tiene» (նա ունի)։',
    options: ['Yo tiene doce años.', 'Yo tengo doce años.', 'Yo soy doce años.', 'Yo estar doce años.']
  },
  {
    id: 'ed2',
    difficulty: 'easy',
    incorrectSentenceEs: 'Mi hermana estudian español.',
    correctSentenceEs: 'Mi hermana estudia español.',
    explanationAm: 'Քանի որ «Mi hermana» (իմ քույրը) եզակի թիվ է (նա), բայը պետք է խոնարհվի եզակի թվով՝ «estudia», ոչ թե հոգնակի թվով` «estudian»:',
    options: ['Mi hermana estudian español.', 'Mi hermana estudias español.', 'Mi hermana estudia español.', 'Mi hermana estudiar español.']
  }
];

export function generateErrorDetective(difficulty: Difficulty): ErrorDetectiveTask[] {
  const errors = [
    { bad: 'La problema es difícil.', good: 'El problema es difícil.', exp: 'Իսպաներենում «problema» բառը արական սեռի է, ուստի պետք է օգտագործել «el» հոդը՝ «El problema»:', opts: ['La problema es difícil.', 'El problema es difícil.', 'Un problema son difícil.', 'La problema está difícil.'] },
    { bad: 'Nosotros va a la escuela.', good: 'Nosotros vamos a la escuela.', exp: '«Ir» (գնալ) բայի հոգնակի առաջին դեմքը (Nosotros) «vamos»-ն է:', opts: ['Nosotros va a la escuela.', 'Nosotros vamos a la escuela.', 'Nosotros van a la escuela.', 'Nosotros ir a la escuela.'] },
    { bad: 'Me gusta los libros.', good: 'Me gustan los libros.', exp: 'Քանի որ «los libros» (գրքերը) հոգնակի է, «gustar» բայը պետք է լինի հոգնակի թվով` «gustan»:', opts: ['Me gusta los libros.', 'Me gustas los libros.', 'Me gustan los libros.', 'Me gusto los libros.'] },
    { bad: 'El agua está frío.', good: 'El agua está fría.', exp: 'Չնայած «agua» բառն ունի «el» արական հոդ (սկսվող հնչյունի պատճառով), այն իգական սեռի բառ է, ուստի ածականը պետք է լինի իգական՝ «fría»:', opts: ['El agua está frío.', 'El agua está fría.', 'La agua es frío.', 'El agua son fría.'] },
    { bad: 'Él es en la escuela hoy.', good: 'Él está en la escuela hoy.', exp: 'Գտնվելու վայր արտահայտելու համար միշտ օգտագործում ենք «estar» բայը (está), ոչ թե «ser» բայը (es):', opts: ['Él es en la escuela hoy.', 'Él está en la escuela hoy.', 'Él son en la escuela hoy.', 'Él tiene en la escuela hoy.'] }
  ];

  const list: ErrorDetectiveTask[] = [];
  for (let i = 0; i < 30; i++) {
    const e = errors[i % errors.length];
    list.push({
      id: `gen_ed_t_${difficulty}_${i}`,
      difficulty,
      incorrectSentenceEs: e.bad,
      correctSentenceEs: e.good,
      explanationAm: e.exp,
      options: [...e.opts].sort(() => Math.random() - 0.5)
    });
  }
  return list;
}

// ==========================================
// 15. ODD ONE OUT (Лишнее слово / Ավելորդ բառը)
// ==========================================
export const oddOneOutTasks: OddOneOutTask[] = [
  {
    id: 'ooo1',
    difficulty: 'easy',
    wordsEs: [
      { word: 'cuaderno', category: 'school' },
      { word: 'lápiz', category: 'school' },
      { word: 'regla', category: 'school' },
      { word: 'plátano', category: 'food' }
    ],
    oddWordEs: 'plátano',
    explanationAm: '«plátano»-ն (բանան) ավելորդ է, որովհետև մնացած բառերը դպրոցական պիտույքներ են։'
  }
];

export function generateOddOneOut(difficulty: Difficulty): OddOneOutTask[] {
  const categories = [
    {
      words: [{ word: 'madre', category: 'family' }, { word: 'padre', category: 'family' }, { word: 'hermano', category: 'family' }, { word: 'coche', category: 'transport' }],
      odd: 'coche', exp: '«coche»-ն (մեքենա) ավելորդ է, որովհետև մնացածը ընտանիքի անդամներ են:'
    },
    {
      words: [{ word: 'autobús', category: 'transport' }, { word: 'tren', category: 'transport' }, { word: 'metro', category: 'transport' }, { word: 'manzana', category: 'food' }],
      odd: 'manzana', exp: '«manzana»-ն (խնձոր) ավելորդ է, որովհետև մնացածը տրանսպորտի միջոցներ են:'
    },
    {
      words: [{ word: 'manzana', category: 'food' }, { word: 'naranja', category: 'food' }, { word: 'plátano', category: 'food' }, { word: 'pizarra', category: 'school' }],
      odd: 'pizarra', exp: '«pizarra»-ն (գրատախտակ) ավելորդ է, որովհետև մնացածը մրգեր են:'
    },
    {
      words: [{ word: 'lunes', category: 'days' }, { word: 'martes', category: 'days' }, { word: 'miércoles', category: 'days' }, { word: 'colegio', category: 'school' }],
      odd: 'colegio', exp: '«colegio»-ն (դպրոց) ավելորդ է, որովհետև մնացածը շաբաթվա օրեր են:'
    }
  ];

  const list: OddOneOutTask[] = [];
  for (let i = 0; i < 30; i++) {
    const c = categories[i % categories.length];
    list.push({
      id: `gen_ooo_t_${difficulty}_${i}`,
      difficulty,
      wordsEs: [...c.words].sort(() => Math.random() - 0.5),
      oddWordEs: c.odd,
      explanationAm: c.exp
    });
  }
  return list;
}

// ==========================================
// 16. MATCH PAIRS (Соедини пары / Գտիր համապատասխան զույգը)
// ==========================================
export const matchPairsTasks: MatchPairsTask[] = [
  {
    id: 'mp1',
    difficulty: 'easy',
    pairs: [
      { id: '1', left: 'la pizarra', right: 'գրատախտակ' },
      { id: '2', left: 'el recreo', right: 'դասամիջոց' },
      { id: '3', left: 'la tarea', right: 'տնային աշխատանք' },
      { id: '4', left: 'el horario', right: 'դասացուցակ' }
    ]
  }
];

export function generateMatchPairs(difficulty: Difficulty): MatchPairsTask[] {
  const dictionary = [
    { es: 'la pizarra', am: 'գրատախտակ' },
    { es: 'el recreo', am: 'դասամիջոց' },
    { es: 'la tarea', am: 'տնային աշխատանք' },
    { es: 'el horario', am: 'դասացուցակ' },
    { es: 'el examen', am: 'քննություն' },
    { es: 'la asignatura', am: 'առարկա' },
    { es: 'el bolígrafo', am: 'գրիչ' },
    { es: 'la mochila', am: 'պայուսակ' },
    { es: 'el profesor', am: 'ուսուցիչ' },
    { es: 'la biblioteca', am: 'գրադարան' },
    { es: 'la escuela', am: 'դպրոց' },
    { es: 'el cuaderno', am: 'տետր' }
  ];

  const list: MatchPairsTask[] = [];
  for (let i = 0; i < 30; i++) {
    // Select 4 random unique pairs
    const shuffled = [...dictionary].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);
    list.push({
      id: `gen_mp_t_${difficulty}_${i}`,
      difficulty,
      pairs: selected.map((s, idx) => ({ id: `p_${idx}`, left: s.es, right: s.am }))
    });
  }
  return list;
}

// ==========================================
// 17. WHO AM I? (Кто я? / Ո՞վ եմ ես)
// ==========================================
export const whoAmITasks: WhoAmITask[] = [
  {
    id: 'wai1',
    difficulty: 'easy',
    descriptionEs: 'Trabajo en una escuela y enseño a los alumnos.',
    descriptionAm: 'Ես աշխատում եմ դպրոցում և սովորեցնում եմ աշակերտներին:',
    correctJobEs: 'profesor',
    correctJobAm: 'ուսուցիչ',
    optionsEs: ['profesor', 'médico', 'cocinero', 'policía']
  }
];

export function generateWhoAmI(difficulty: Difficulty): WhoAmITask[] {
  const jobs = [
    { es: 'médico', am: 'բժիշկ', descEs: 'Trabajo en un hospital y ayudo a las personas enfermas.', descAm: 'Ես աշխատում եմ հիվանդանոցում և օգնում եմ հիվանդ մարդկանց:' },
    { es: 'futbolista', am: 'ֆուտբոլիստ', descEs: 'Juego en un equipo, marco goles y corro en el estadio de fútbol.', descAm: 'Ես խաղում եմ թիմում, գոլեր եմ խփում և վազում ֆուտբոլի մարզադաշտում:' },
    { es: 'cocinero', am: 'խոհարար', descEs: 'Trabajo en un restaurante y preparo comidas deliciosas como paella.', descAm: 'Ես աշխատում եմ ռեստորանում և համեղ ուտեստներ եմ պատրաստում, օրինակ` պայելյա:' },
    { es: 'bibliotecario', am: 'գրադարանավար', descEs: 'Trabajo en la biblioteca, organizo los libros y ayudo a los lectores.', descAm: 'Ես աշխատում եմ գրադարանում, կազմակերպում եմ գրքերը և օգնում ընթերցողներին:' },
    { es: 'director', am: 'տնօրեն', descEs: 'Soy el jefe de la escuela y organizo todo el colegio.', descAm: 'Ես դպրոցի ղեկավարն եմ և կազմակերպում եմ ամբողջ դպրոցի աշխատանքը:' }
  ];

  const list: WhoAmITask[] = [];
  for (let i = 0; i < 30; i++) {
    const j = jobs[i % jobs.length];
    const wrong = jobs.filter(x => x.es !== j.es).map(x => x.es);
    const options = [j.es, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);

    list.push({
      id: `gen_wai_t_${difficulty}_${i}`,
      difficulty,
      descriptionEs: j.descEs,
      descriptionAm: j.descAm,
      correctJobEs: j.es,
      correctJobAm: j.am,
      optionsEs: options
    });
  }
  return list;
}

// ==========================================
// 18. FOOTBALL QUIZ (Футбольная викторина / Ֆուտբոլային վիկտորինա)
// ==========================================
export const footballQuizTasks: FootballQuizTask[] = [
  {
    id: 'fb1',
    difficulty: 'easy',
    questionEs: 'El jugador que protege la portería es...',
    questionAm: 'Այն խաղացողը, ով պաշտպանում է դարպասը, ... է:',
    optionsEs: ['el portero', 'el delantero', 'el árbitro', 'el entrenador'],
    correctAnswerEs: 'el portero',
    commentaryTemplate: '¡Qué gran parada del portero!'
  }
];

export function generateFootballQuiz(difficulty: Difficulty): FootballQuizTask[] {
  const quiz = [
    { qEs: 'El jugador que mete los goles en el equipo es...', qAm: 'Այն խաղացողը, ով գոլեր է խփում թիմում, ... է:', ans: 'el delantero', opts: ['el portero', 'el delantero', 'el defensa', 'el árbitro'] },
    { qEs: 'La persona que controla las reglas del partido es...', qAm: 'Այն անձը, ով վերահսկում է խաղի կանոնները, ... է:', ans: 'el árbitro', opts: ['el árbitro', 'el entrenador', 'el defensa', 'el centrocampista'] },
    { qEs: 'El líder que dirige y entrena al equipo es...', qAm: 'Այն առաջնորդը, ով ղեկավարում և մարզում է թիմը, ... է:', ans: 'el entrenador', opts: ['el delantero', 'el entrenador', 'el portero', 'el defensa'] },
    { qEs: '¿Cómo se dice "marcar un gol" en español?', qAm: 'Ինչպե՞ս կասեք "գոլ խփել" իսպաներենով:', ans: 'marcar un gol', opts: ['pasar el balón', 'marcar un gol', 'ganar el partido', 'perder el balón'] },
    { qEs: 'Cuando los dos equipos tienen el mismo número de goles, el resultado es...', qAm: 'Երբ երկու թիմերն էլ ունեն նույն քանակությամբ գոլեր, արդյունքը ... է:', ans: 'empate', opts: ['ganar', 'perder', 'empate', 'marcar'] }
  ];

  const list: FootballQuizTask[] = [];
  for (let i = 0; i < 30; i++) {
    const q = quiz[i % quiz.length];
    list.push({
      id: `gen_fb_t_${difficulty}_${i}`,
      difficulty,
      questionEs: q.qEs,
      questionAm: q.qAm,
      optionsEs: [...q.opts].sort(() => Math.random() - 0.5),
      correctAnswerEs: q.ans,
      commentaryTemplate: '¡Increíble jugada en el campo!'
    });
  }
  return list;
}

// ==========================================
// 19. WORD LABYRINTH (Лабиринт слов / Բառերի լաբիրինթոս)
// ==========================================
export const wordLabyrinthTasks: WordLabyrinthTask[] = [
  {
    id: 'lab1',
    difficulty: 'easy',
    instructionAm: 'Գտի՛ր միայն բայերը (verbs)։ Անցիր վանդակներով, որոնցում գրված են գործողություն ցույց տվող բառեր։',
    instructionEs: 'Encuentra solo los verbos. Muévete por las celdas con acciones.',
    criteria: 'verbos',
    startRow: 0,
    startCol: 0,
    endRow: 2,
    endCol: 2,
    grid: [
      [
        { wordEs: 'comer', wordAm: 'ուտել', isValid: true },
        { wordEs: 'casa', wordAm: 'տուն', isValid: false },
        { wordEs: 'libro', wordAm: 'գիրք', isValid: false }
      ],
      [
        { wordEs: 'vivir', wordAm: 'ապրել', isValid: true },
        { wordEs: 'estudiar', wordAm: 'սովորել', isValid: true },
        { wordEs: 'mesa', wordAm: 'սեղան', isValid: false }
      ],
      [
        { wordEs: 'manzana', wordAm: 'խնձոր', isValid: false },
        { wordEs: 'jugar', wordAm: 'խաղալ', isValid: true },
        { wordEs: 'correr', wordAm: 'վազել', isValid: true }
      ]
    ]
  }
];

export function generateLabyrinthTasks(difficulty: Difficulty): WordLabyrinthTask[] {
  // Generate 30 custom variations of labyrinth grid
  const list: WordLabyrinthTask[] = [];
  for (let i = 0; i < 30; i++) {
    const isVerb = i % 2 === 0;
    const crit = isVerb ? 'verbos' : 'femeninos';
    const instrAm = isVerb 
      ? 'Գտի՛ր միայն բայերը (verbs): Անցիր միայն գործողություն արտահայտող բառերով:'
      : 'Գտի՛ր միայն իգական սեռի գոյականները (feminine nouns - "la"):';
    const instrEs = isVerb
      ? 'Encuentra solo los verbos para cruzar el laberinto.'
      : 'Encuentra solo los sustantivos femeninos ("la").';

    const cellTrue1 = isVerb ? { wordEs: 'hablar', wordAm: 'խոսել', isValid: true } : { wordEs: 'la casa', wordAm: 'տունը', isValid: true };
    const cellTrue2 = isVerb ? { wordEs: 'escribir', wordAm: 'գրել', isValid: true } : { wordEs: 'la mochila', wordAm: 'պայուսակը', isValid: true };
    const cellTrue3 = isVerb ? { wordEs: 'leer', wordAm: 'կարդալ', isValid: true } : { wordEs: 'la regla', wordAm: 'քանոնը', isValid: true };
    const cellTrue4 = isVerb ? { wordEs: 'pintar', wordAm: 'նկարել', isValid: true } : { wordEs: 'la mesa', wordAm: 'սեղանը', isValid: true };

    const cellFalse1 = isVerb ? { wordEs: 'el lápiz', wordAm: 'մատիտը', isValid: false } : { wordEs: 'el libro', wordAm: 'գիրքը', isValid: false };
    const cellFalse2 = isVerb ? { wordEs: 'el coche', wordAm: 'մեքենան', isValid: false } : { wordEs: 'el cuaderno', wordAm: 'տետրը', isValid: false };
    const cellFalse3 = isVerb ? { wordEs: 'la clase', wordAm: 'դասարանը', isValid: !isVerb } : { wordEs: 'el bolígrafo', wordAm: 'գրիչը', isValid: false };
    const cellFalse4 = isVerb ? { wordEs: 'el colegio', wordAm: 'դպրոցը', isValid: false } : { wordEs: 'el sol', wordAm: 'արևը', isValid: false };

    list.push({
      id: `gen_lab_t_${difficulty}_${i}`,
      difficulty,
      instructionAm: instrAm,
      instructionEs: instrEs,
      criteria: crit,
      startRow: 0,
      startCol: 0,
      endRow: 2,
      endCol: 2,
      grid: [
        [cellTrue1, cellFalse1, cellFalse2],
        [cellTrue2, cellTrue3, cellFalse3],
        [cellFalse4, cellTrue4, { wordEs: isVerb ? 'saltar' : 'la pizarra', wordAm: isVerb ? 'ցատկել' : 'գրատախտակը', isValid: true }]
      ]
    });
  }
  return list;
}

// ==========================================
// 21. FIRST DAY MISSION (Миссия: первый день в школе / Առաջին օրը դպրոցում)
// ==========================================
export const firstDayMissionSteps: FirstDayMissionStep[] = [
  {
    id: 'fd1',
    titleAm: 'Արթնանալ',
    titleEs: 'Despertarse',
    descriptionAm: 'Դու արթնանում ես առավոտյան ժամը 7:30-ին։ Ի՞նչ կասես մայրիկիդ։',
    questionEs: 'Por la mañana, saludas a tu madre:',
    questionAm: 'Առավոտյան ողջունում ես մայրիկիդ.',
    options: ['¡Buenos días, mamá!', '¡Buenas noches, mamá!', '¡Adiós, mamá!', '¡Muchas gracias!'],
    correctAnswer: '¡Buenos días, mamá!',
    feedbackSuccessAm: 'Ճի՛շտ է: «¡Buenos días, mamá!» նշանակում է «Բարի լույս, մայրի՛կ»։',
    feedbackSuccessEs: '¡Correcto! "¡Buenos días, mamá!" es la forma adecuada por la mañana.'
  },
  {
    id: 'fd2',
    titleAm: 'Պայուսակի հավաքում',
    titleEs: 'Preparar la mochila',
    descriptionAm: 'Այժմ ժամանակն է հավաքել դպրոցական պայուսակը։ Ի՞նչ առարկա է անհրաժեշտ գրելու համար։',
    questionEs: '¿Qué usas para escribir en tu cuaderno?',
    questionAm: 'Ի՞նչ ես օգտագործում տետրումդ գրելու համար:',
    options: ['un lápiz o un bolígrafo', 'una regla de plástico', 'una manzana roja', 'una pelota de fútbol'],
    correctAnswer: 'un lápiz o un bolígrafo',
    feedbackSuccessAm: 'Գերազանց է: «un lápiz o un bolígrafo» նշանակում է «մատիտ կամ գրիչ»։',
    feedbackSuccessEs: '¡Muy bien! Usamos un lápiz o bolígrafo para escribir.'
  },
  {
    id: 'fd3',
    titleAm: 'Որոշել ժամը',
    titleEs: 'Saber la hora',
    descriptionAm: 'Դու նայում ես ժամացույցին: Սլաքները ցույց են տալիս 8:15: Դասերը սկսվում են 9:00-ին:',
    questionEs: '¿Qué hora es si el reloj marca las 8:15?',
    questionAm: 'Ժամը քանիսն է, եթե ժամացույցը ցույց է տալիս 8:15?',
    options: ['Son las ocho y cuarto', 'Son las ocho menos cuarto', 'Son las nueve en punto', 'Es la una y cuarto'],
    correctAnswer: 'Son las ocho y quarter', // Match the spelling son las ocho y cuarto
    feedbackSuccessAm: 'Ճի՛շտ է: «Son las ocho y cuarto» նշանակում է «Ութն անց տասնհինգ/ութն անց քառորդ»։',
    feedbackSuccessEs: '¡Exacto! Son las ocho y cuarto.'
  },
  {
    id: 'fd4',
    titleAm: 'Ճանապարհ դեպի դպրոց',
    titleEs: 'Ir al colegio',
    descriptionAm: 'Դու տնից դուրս ես գալիս և գնում դպրոցական ավտոբուսի կանգառ:',
    questionEs: '¿Cómo vas al colegio si usas el transporte escolar?',
    questionAm: 'Ինչպե՞ս ես գնում դպրոց, եթե օգտվում ես դպրոցական տրանսպորտից:',
    options: ['Voy en autobús', 'Voy en tren', 'Voy en avión', 'Voy a pie'],
    correctAnswer: 'Voy en autobús',
    feedbackSuccessAm: 'Հիանալի՛ է: «Voy en autobús» նշանակում է «Գնում եմ ավտոբուսով»։',
    feedbackSuccessEs: '¡Estupendo! El autobús escolar es muy seguro.'
  },
  {
    id: 'fd5',
    titleAm: 'Ծանոթություն',
    titleEs: 'Presentación',
    descriptionAm: 'Դասարանում դու նստում ես նոր սեղանի շուրջ և ողջունում հարևանիդ։',
    questionEs: '¿Cómo le dices tu nombre a un nuevo compañero?',
    questionAm: 'Ինչպե՞ս ես հայտնում անունդ նոր դասընկերոջը:',
    options: ['Hola, me llamo Davit. ¿Y tú?', 'Hola, tengo doce años.', '¿Dónde está la clase?', 'Buenos días, profesor.'],
    correctAnswer: 'Hola, me llamo Davit. ¿Y tú?',
    feedbackSuccessAm: 'Ճի՛շտ է: «Hola, me llamo Davit» նշանակում է «Ողջույն, իմ անունը Դավիթ է»։',
    feedbackSuccessEs: '¡Fantástico! Una presentación muy amistosa.'
  },
  {
    id: 'fd6',
    titleAm: 'Ուսուցչի հրահանգը',
    titleEs: 'Instrucción del profesor',
    descriptionAm: 'Ուսուցիչը մտնում է դասարան և խնդրում բացել գրքերը:',
    questionEs: 'El profesor dice: "Abre el libro, por favor". ¿Qué debes hacer?',
    questionAm: 'Ուսուցիչն ասում է. "Abre el libro, por favor": Ի՞նչ պետք է անես:',
    options: ['Открыть книгу', 'Закрыть книгу', 'Сдать домашнее задание', 'Поднять руку'],
    correctAnswer: 'Открыть книгу',
    feedbackSuccessAm: 'Ճի՛շտ է: «Открыть книгу» (Բացել գիրքը):',
    feedbackSuccessEs: '¡Correcto! "Abrir el libro" significa abrirlo para leer.'
  },
  {
    id: 'fd7',
    titleAm: 'Մաթեմատիկայի դաս',
    titleEs: 'Clase de Matemáticas',
    descriptionAm: 'Սկսվում է առաջին դասը: Ուսուցիչը տալիս է մաթեմատիկական խնդիր:',
    questionEs: 'Tienes 15 lápices y regalas 5 a tu compañero. ¿Cuántos te quedan?',
    questionAm: 'Դու ունես 15 մատիտ և 5-ը նվիրում ես դասընկերոջդ: Քանի՞սն է մնում:',
    options: ['diez lápices', 'cinco lápices', 'quince lápices', 'veinte lápices'],
    correctAnswer: 'diez lápices',
    feedbackSuccessAm: 'Ճի՛շտ է: «diez lápices» նշանակում է «տասը մատիտ»։ (15 - 5 = 10)',
    feedbackSuccessEs: '¡Excelente cálculo! Te quedan diez lápices.'
  },
  {
    id: 'fd8',
    titleAm: 'Դպրոցական ճաշարան',
    titleEs: 'Comida en la cafetería',
    descriptionAm: 'Դասամիջոցին դու գնում ես ճաշարան և պատվիրում սենդվիչ ու ջուր։',
    questionEs: '¿Cómo pides un bocadillo y agua de forma educada?',
    questionAm: 'Ինչպե՞ս կխնդրես սենդվիչ և ջուր քաղաքավարի ձևով:',
    options: ['Un bocadillo y agua, por favor', 'Dame un bocadillo ahora', 'No quiero comer nada', 'Tengo diez euros'],
    correctAnswer: 'Un bocadillo y agua, por favor',
    feedbackSuccessAm: 'Ճի՛շտ է: «Un bocadillo y agua, por favor» (Սենդվիչ և ջուր, խնդրում եմ)։',
    feedbackSuccessEs: '¡Muy bien! Siempre hay que pedir con educación.'
  },
  {
    id: 'fd9',
    titleAm: 'Օրագրի գրառում',
    titleEs: 'Anotar los deberes',
    descriptionAm: 'Դասերի վերջում դու գրում ես տնային հանձնարարությունները:',
    questionEs: '¿Qué frase significa "deberes para mañana"?',
    questionAm: 'Ո՞ր արտահայտությունն է նշանակում "տնային աշխատանք վաղվա համար":',
    options: ['deberes para mañana', 'clase de plástica hoy', 'fin de curso escolar', 'vacaciones de verano'],
    correctAnswer: 'deberes para mañana',
    feedbackSuccessAm: 'Հրաշալի՛ է: «deberes para mañana» (տնային աշխատանք վաղվա համար)։',
    feedbackSuccessEs: '¡Perfecto! Ya tienes anotados tus deberes.'
  },
  {
    id: 'fd10',
    titleAm: 'Վերադարձ տուն',
    titleEs: 'Volver a casa',
    descriptionAm: 'Դպրոցական առաջին օրն ավարտվեց: Դու հրաժեշտ ես տալիս ընկերներիդ և ուսուցչին։',
    questionEs: '¿Cómo te despides hasta el día siguiente?',
    questionAm: 'Ինչպե՞ս ես հրաժեշտ տալիս մինչև հաջորդ օրը:',
    options: ['¡Hasta mañana!', '¡Buenos días!', '¡Hola amigo!', '¡Mucho gusto!'],
    correctAnswer: '¡Hasta mañana!',
    feedbackSuccessAm: 'Հիանալի՛ է: «¡Hasta mañana!» նշանակում է «Մինչ վաղը»։',
    feedbackSuccessEs: '¡Bravo! Has completado con éxito tu primer día en España.'
  }
];

// Clean exact answer option match helper for fd3
firstDayMissionSteps[2].options = ['Son las ocho y cuarto', 'Son las ocho menos cuarto', 'Son las nueve en punto', 'Es la una y cuarto'];
firstDayMissionSteps[2].correctAnswer = 'Son las ocho y cuarto';

// ==========================================
// 22. ERROR MONSTER (Победи монстра ошибок / Հաղթի՛ր սխալների հրեշին)
// ==========================================
export const errorMonsterTasks: ErrorMonsterTask[] = [
  {
    id: 'em1',
    difficulty: 'easy',
    topic: 'ser/estar',
    sentenceEs: 'El alumno ___ en la clase de geografía.',
    questionAm: 'Ընտրի՛ր ճիշտ բայը գտնվելու վայրի համար.',
    optionsEs: ['es', 'está', 'son', 'están'],
    correctAnswerEs: 'está',
    explanationAm: 'Գտնվելու վայրի (դասարանում լինելու) համար օգտագործվում է «estar» բայը (está), իսկ «es»-ը (ser) օգտագործվում է մշտական հատկանիշների համար։'
  },
  {
    id: 'em2',
    difficulty: 'easy',
    topic: 'tener',
    sentenceEs: 'Nosotros ___ doce años.',
    questionAm: 'Ընտրի՛ր «ունենալ» (tener) բայի ճիշտ ձևը.',
    optionsEs: ['tenemos', 'tienen', 'tengo', 'tiene'],
    correctAnswerEs: 'tenemos',
    explanationAm: '«Nosotros»-ի (մենք) համար «tener» բայի ճիշտ խոնարհումն է «tenemos»:'
  }
];

export function generateErrorMonsterTasks(difficulty: Difficulty): ErrorMonsterTask[] {
  const dataset = [
    { topic: 'hay', sentence: 'En la clase ___ una pizarra grande.', am: 'Ընտրի՛ր ճիշտ ձևը "կա/կան" իմաստով.', ans: 'hay', opts: ['hay', 'es', 'está', 'tiene'], exp: '«Hay» նշանակում է «կա/կան» (գոյություն ունի)։' },
    { topic: 'articles', sentence: '___ mochila de Davit es azul.', am: 'Ընտրի՛ր ճիշտ որոշյալ հոդը «mochila» (իգական սեռ) բառի համար.', ans: 'La', opts: ['El', 'La', 'Los', 'Las'], exp: '«Mochila»-ն իգական սեռի եզակի բառ է, ուստի հոդը կլինի «La»:' },
    { topic: 'verbs', sentence: 'Ellos ___ español en la escuela.', am: 'Ընտրի՛ր «estudiar» (սովորել) բայի ճիշտ ձևը «ellos»-ի համար.', ans: 'estudian', opts: ['estudio', 'estudias', 'estudia', 'estudian'], exp: '«Ellos» (նրանք) դերանվան համար «estudiar» բայի խոնարհումն է «estudian»:' },
    { topic: 'school', sentence: 'Escribo en el ___ nuevo.', am: 'Ո՞ր դպրոցական պիտույքի մեջ ենք գրում.', ans: 'cuaderno', opts: ['cuaderno', 'sacapuntas', 'borrador', 'regla'], exp: 'Գրում ենք տետրի («cuaderno») մեջ:' },
    { topic: 'math', sentence: 'Diez más cinco son ___.', am: 'Լուծի՛ր մաթեմատիկական արտահայտությունը (10 + 5).', ans: 'quince', opts: ['doce', 'trece', 'catorce', 'quince'], exp: '10 + 5 = 15 («quince»)։' },
    { topic: 'ser/estar', sentence: 'Madrid ___ la capital de España.', am: 'Մադրիդը Իսպանիայի մայրաքաղաքն է (մշտական հատկանիշ):', ans: 'es', opts: ['es', 'está', 'son', 'están'], exp: 'Մայրաքաղաք լինելը մշտական հատկանիշ է, ուստի օգտագործվում է «ser» բայը (es):' },
    { topic: 'articles', sentence: '___ libros están en la mesa.', am: 'Ընտրի՛ր ճիշտ հոդը «libros» (արական հոգնակի) բառի համար.', ans: 'Los', opts: ['El', 'La', 'Los', 'Las'], exp: '«Libros»-ը հոգնակի արական բառ է, ուստի հոդը «Los»-ն է:' }
  ];

  const list: ErrorMonsterTask[] = [];
  for (let i = 0; i < 30; i++) {
    const item = dataset[i % dataset.length];
    list.push({
      id: `gen_em_t_${difficulty}_${i}`,
      difficulty,
      topic: item.topic,
      sentenceEs: item.sentence,
      questionAm: item.am,
      optionsEs: [...item.opts].sort(() => Math.random() - 0.5),
      correctAnswerEs: item.ans,
      explanationAm: item.exp
    });
  }
  return list;
}

// ==========================================
// 24. DUEL TASKS (Дуэль для двух игроков / Երկու խաղացողի դուել)
// ==========================================
export const duelQuestions: DuelTask[] = [
  {
    category: 'vocabulario',
    questionAm: 'Ինչպե՞ս է իսպաներեն «գրատախտակ» բառը։',
    options: ['la pizarra', 'el pupitre', 'la tiza', 'el borrador'],
    correctAnswer: 'la pizarra'
  },
  {
    category: 'vocabulario',
    questionAm: 'Ինչպե՞ս է իսպաներեն «դասամիջոց» բառը։',
    options: ['el recreo', 'la clase', 'el horario', 'la tarea'],
    correctAnswer: 'el recreo'
  },
  {
    category: 'frases',
    questionAm: 'Ի՞նչ է նշանակում «¿Puedo ir al baño?» արտահայտությունը։',
    options: ['Կարո՞ղ եմ դուրս գալ զուգարան։', 'Կարո՞ղ եմ գիրքս բացել։', 'Կարո՞ղ եմ ջուր խմել։', 'Կարո՞ղ եմ տետրս վերցնել։'],
    correctAnswer: 'Կարո՞ղ եմ դուրս գալ զուգարան։'
  },
  {
    category: 'matematicas',
    questionAm: 'Որքա՞ն է «diez más siete» (տասը գումարած յոթ)։',
    options: ['quince (15)', 'diecisiete (17)', 'diecinueve (19)', 'veinte (20)'],
    correctAnswer: 'diecisiete (17)'
  },
  {
    category: 'errores',
    questionAm: 'Ո՞րն է ճիշտ տարբերակը «Yo ___ doce años» նախադասության համար։',
    options: ['tengo', 'tiene', 'soy', 'estoy'],
    correctAnswer: 'tengo'
  }
];

export function generateDuelQuestions(): DuelTask[] {
  const pool = [
    { cat: 'Առարկաներ', q: 'Ինչպե՞ս է իսպաներեն «պայուսակ» բառը:', ans: 'la mochila', opts: ['el cuaderno', 'la mochila', 'el estuche', 'la regla'] },
    { cat: 'Առարկաներ', q: 'Ինչպե՞ս է իսպաներեն «տետր» բառը:', ans: 'el cuaderno', opts: ['el cuaderno', 'el libro', 'el lápiz', 'la goma'] },
    { cat: 'Առարկաներ', q: 'Ինչպե՞ս է իսպաներեն «քանոն» բառը:', ans: 'la regla', opts: ['la regla', 'el sacapuntas', 'el bolígrafo', 'la pizarra'] },
    { cat: 'Խոսակցական', q: 'Ի՞նչ է նշանակում «¡Buenos días!» արտահայտությունը:', ans: 'Բարի լույս', opts: ['Բարի լույս', 'Բարի երեկո', 'Ցտեսություն', 'Հաջողություն'] },
    { cat: 'Խոսակցական', q: 'Ի՞նչ է նշանակում «¡Hasta mañana!» արտահայտությունը:', ans: 'Մինչ վաղը', opts: ['Բարի լույս', 'Մինչ վաղը', 'Բարի գալուստ', 'Շնորհակալություն'] },
    { cat: 'Մաթեմատիկա', q: 'Որքա՞ն է «quince menos cinco» (15 - 5):', ans: 'diez (10)', opts: ['cinco (5)', 'diez (10)', 'quince (15)', 'veinte (20)'] },
    { cat: 'Մաթեմատիկա', q: 'Որքա՞ն է «dos por seis» (2 x 6):', ans: 'doce (12)', opts: ['diez (10)', 'doce (12)', 'catorce (14)', 'dieciséis (16)'] },
    { cat: 'Սխալներ', q: 'Ո՞րն է ճիշտ նախադասությունը:', ans: 'El libro está en la mesa', opts: ['El libro está en la mesa', 'El libro es en la mesa', 'La libro está en la mesa', 'El libro tener en la mesa'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «ընտանիք» բառը:', ans: 'la familia', opts: ['la familia', 'la clase', 'la escuela', 'la casa'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «եղբայր» բառը:', ans: 'el hermano', opts: ['el padre', 'la madre', 'el hermano', 'la hermana'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «ուտել» բայը:', ans: 'comer', opts: ['beber', 'comer', 'vivir', 'estudiar'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «խաղալ» բայը:', ans: 'jugar', opts: ['correr', 'jugar', 'cantar', 'escribir'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «կատու» բառը:', ans: 'el gato', opts: ['el perro', 'el gato', 'el pájaro', 'el caballo'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «կարմիր» գույնը:', ans: 'rojo', opts: ['azul', 'verde', 'rojo', 'amarillo'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «կանաչ» գույնը:', ans: 'verde', opts: ['verde', 'azul', 'blanco', 'negro'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «մեքենա» բառը:', ans: 'el coche', opts: ['el tren', 'el metro', 'el coche', 'el autobús'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «երեքշաբթի» օրը:', ans: 'martes', opts: ['lunes', 'martes', 'miércoles', 'jueves'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «ուրբաթ» օրը:', ans: 'viernes', opts: ['martes', 'jueves', 'viernes', 'sábado'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «ֆուտբոլիստ» բառը:', ans: 'el futbolista', opts: ['el futbolista', 'el portero', 'el árbitro', 'el entrenador'] },
    { cat: 'Բառապաշար', q: 'Ինչպե՞ս է իսպաներեն «սենդվիչ» բառը:', ans: 'el bocadillo', opts: ['el bocadillo', 'la manzana', 'el agua', 'la paella'] }
  ];

  const results: DuelTask[] = [];
  for (let i = 0; i < 40; i++) {
    const item = pool[i % pool.length];
    results.push({
      category: item.cat,
      questionAm: item.q,
      options: [...item.opts].sort(() => Math.random() - 0.5),
      correctAnswer: item.ans
    });
  }
  return results;
}

// ==========================================
// 25. STORY ELEMENTS (Создай свою историю / Ստեղծի՛ր քո պատմությունը)
// ==========================================
export const storyOptions: StoryOption[] = [
  { character: 'Carlos (Կառլոս)', place: 'en la escuela (դպրոցում)', action: 'encuentra (գտնում է)', time: 'por la mañana (առավոտյան)', item: 'una mochila (մի պայուսակ)' },
  { character: 'Sofía (Սոֆիա)', place: 'en el parque (այգում)', action: 'juega con (խաղում է ... հետ)', time: 'por la tarde (կեսօրից հետո)', item: 'un balón de fútbol (ֆուտբոլի գնդակ)' },
  { character: 'El profesor (Ուսուցիչը)', place: 'en la biblioteca (գրադարանում)', action: 'lee (կարդում է)', time: 'a las diez (ժամը տասին)', item: 'un libro interesante (մի հետաքրքիր գիրք)' },
  { character: 'Davit (Դավիթը)', place: 'en la cafetería (ճաշարանում)', action: 'come (ուտում է)', time: 'en el recreo (դասամիջոցին)', item: 'un bocadillo de queso (պանրով սենդվիչ)' },
  { character: 'Mi amigo (Իմ ընկերը)', place: 'en el campo de juego (խաղադաշտում)', action: 'compra (գնում է)', time: 'los sábados (շաբաթ օրերին)', item: 'un cuaderno verde (կանաչ տետր)' }
];

// Helper to bundle all structured data requests dynamically
export function getQuestionsForGame(gameId: string, difficulty: Difficulty): any[] {
  switch (gameId) {
    case 'sentences':
      return [...sentenceTasks, ...generateSentences(difficulty, 30)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'speed-translate':
      return [...speedTranslateTasks, ...generateSpeedTranslations(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'backpack':
      return [...backpackTasks, ...generateBackpackTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'schedule':
      return [...scheduleQuestions, ...generateScheduleTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'teacher-says':
      return [...teacherSaysTasks, ...generateTeacherSays(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'school-subject':
      return [...schoolSubjectsTasks, ...generateSchoolSubjects(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'math-quest':
      return [...mathQuestSteps, ...generateMathQuest(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'shop':
      return [...shopTasks, ...generateShopTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'time':
      return [...timeTasks, ...generateTimeTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'calendar':
      return [...calendarTasks, ...generateCalendarTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'dialogue':
      return [...dialogueTasks, ...generateDialogueTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'what-would-you-say':
      return [...whatWouldYouSayTasks, ...generateWhatWouldYouSay(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'true-false':
      return [...trueOrFalseTasks, ...generateTrueOrFalse(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'error-detective':
      return [...errorDetectiveTasks, ...generateErrorDetective(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'odd-one-out':
      return [...oddOneOutTasks, ...generateOddOneOut(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'match-pairs':
      return [...matchPairsTasks, ...generateMatchPairs(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'who-am-i':
      return [...whoAmITasks, ...generateWhoAmI(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'football-quiz':
      return [...footballQuizTasks, ...generateFootballQuiz(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'word-labyrinth':
      return [...wordLabyrinthTasks, ...generateLabyrinthTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    case 'error-monster':
      return [...errorMonsterTasks, ...generateErrorMonsterTasks(difficulty)].filter(t => t.difficulty === difficulty || t.id.startsWith('gen_'));
    default:
      return [];
  }
}
