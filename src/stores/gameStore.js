import { writable, derived } from 'svelte/store';

// Store pour gérer l'état du jeu
function createGameStore() {
  const { subscribe, set, update } = writable({
    currentScreen: 'home',
    currentLevel: null,
    currentQuestionIndex: 0,
    questions: [],
    score: 0,
    timeSpent: 0,
    gameStartedAt: null,
    selectedAnswer: null,
    isAnswerCorrect: null,
    showFeedback: false,
    gameHistory: [],
    progress: {
      animals: { stars: 0, badges: [], timePlayed: 0, unlocked: true },
      colors: { stars: 0, badges: [], timePlayed: 0, unlocked: false },
      numbers: { stars: 0, badges: [], timePlayed: 0, unlocked: false },
      family: { stars: 0, badges: [], timePlayed: 0, unlocked: false },
      clothes: { stars: 0, badges: [], timePlayed: 0, unlocked: false },
      food: { stars: 0, badges: [], timePlayed: 0, unlocked: false },
      actions: { stars: 0, badges: [], timePlayed: 0, unlocked: false }
    }
  });

  return {
    subscribe,
    navigateTo: (screen) => update(state => ({ ...state, currentScreen: screen })),
    startGame: (level, questions) => update(state => ({
      ...state,
      currentScreen: 'level',
      currentLevel: level,
      currentQuestionIndex: 0,
      questions: questions,
      score: 0,
      timeSpent: 0,
      gameStartedAt: Date.now(),
      selectedAnswer: null,
      isAnswerCorrect: null,
      showFeedback: false
    })),
    selectAnswer: (answer, correctAnswer) => update(state => ({
      ...state,
      selectedAnswer: answer,
      isAnswerCorrect: answer === correctAnswer,
      showFeedback: true
    })),
    nextQuestion: () => update(state => {
      const newIndex = state.currentQuestionIndex + 1;
      if (newIndex >= state.questions.length) {
        return { ...state, currentScreen: 'results' };
      }
      return {
        ...state,
        currentQuestionIndex: newIndex,
        selectedAnswer: null,
        isAnswerCorrect: null,
        showFeedback: false
      };
    }),
    incrementScore: () => update(state => ({
      ...state,
      score: state.score + 1
    })),
    updateTime: () => update(state => ({
      ...state,
      timeSpent: state.gameStartedAt ? Math.floor((Date.now() - state.gameStartedAt) / 1000) : 0
    })),
    saveGameResult: (levelTheme) => update(state => {
      const newResult = {
        date: new Date().toISOString(),
        level: levelTheme,
        score: state.score,
        totalQuestions: state.questions.length,
        timeSpent: state.timeSpent,
        timestamp: Date.now()
      };
      
      // Mettre à jour l'historique
      const updatedHistory = [newResult, ...state.gameHistory].slice(0, 20);
      
      // Mettre à jour la progression
      const starsEarned = Math.floor((state.score / state.questions.length) * 3);
      const updatedProgress = {
        ...state.progress,
        [levelTheme]: {
          ...state.progress[levelTheme],
          stars: Math.max(state.progress[levelTheme].stars, starsEarned),
          timePlayed: state.progress[levelTheme].timePlayed + state.timeSpent
        }
      };
      
      // Déverrouiller le niveau suivant si assez d'étoiles
      const levelsOrder = ['animals', 'colors', 'numbers', 'family', 'clothes', 'food', 'actions'];
      const currentIndex = levelsOrder.indexOf(levelTheme);
      if (currentIndex >= 0 && currentIndex < levelsOrder.length - 1) {
        const nextLevel = levelsOrder[currentIndex + 1];
        if (updatedProgress[levelTheme].stars >= 3 && !updatedProgress[nextLevel].unlocked) {
          updatedProgress[nextLevel].unlocked = true;
        }
      }
      
      return {
        ...state,
        gameHistory: updatedHistory,
        progress: updatedProgress,
        currentScreen: 'results'
      };
    }),
    resetGame: () => update(state => ({
      ...state,
      currentLevel: null,
      currentQuestionIndex: 0,
      questions: [],
      score: 0,
      timeSpent: 0,
      gameStartedAt: null,
      selectedAnswer: null,
      isAnswerCorrect: null,
      showFeedback: false
    })),
    loadFromLocalStorage: () => {
      if (typeof window !== 'undefined') {
        const savedState = localStorage.getItem('englishAdventureState');
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            set(parsed);
          } catch (e) {
            console.error('Error loading state from localStorage:', e);
          }
        }
      }
    },
    saveToLocalStorage: () => {
      if (typeof window !== 'undefined') {
        subscribe(state => {
          localStorage.setItem('englishAdventureState', JSON.stringify(state));
        })();
      }
    }
  };
}

export const gameStore = createGameStore();

// Store dérivé pour obtenir la question actuelle
export const currentQuestion = derived(
  gameStore,
  $gameStore => $gameStore.questions[$gameStore.currentQuestionIndex] || null
);

// Store dérivé pour obtenir le niveau actuel
export const currentLevel = derived(
  gameStore,
  $gameStore => $gameStore.currentLevel
);

// Store dérivé pour vérifier si le jeu est en cours
export const isGameInProgress = derived(
  gameStore,
  $gameStore => $gameStore.currentScreen === 'level' && $gameStore.questions.length > 0
);
