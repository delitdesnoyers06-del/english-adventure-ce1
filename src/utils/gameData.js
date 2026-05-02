// Données des questions pour le jeu
import animalsData from '../data/themes/animals.json';

// Générer des questions à partir des données des animaux
export function generateAnimalQuestions(count = 5) {
  const questions = [];
  const words = animalsData.words;
  
  // Mélanger les mots
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffledWords.length); i++) {
    const correctWord = shuffledWords[i];
    
    // Trouver 3 autres options aléatoires
    const otherOptions = shuffledWords
      .filter(word => word.en !== correctWord.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [correctWord, ...otherOptions];
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    questions.push({
      id: i + 1,
      question: `Où est le ${correctWord.en} ?`,
      questionFr: `Où est le ${correctWord.fr} ?`,
      correctAnswer: correctWord.en,
      options: shuffledOptions.map(opt => opt.en),
      emojis: shuffledOptions.map(opt => {
        const emojiMap = {
          'cat': '🐱',
          'dog': '🐶',
          'bird': '🐦',
          'pig': '🐷',
          'cow': '🐄',
          'sheep': '🐑',
          'horse': '🐴',
          'rabbit': '🐰'
        };
        return emojiMap[opt.en] || '❓';
      }),
      image: correctWord.image,
      audio: correctWord.audio,
      type: 'multiple_choice'
    });
  }
  
  return questions;
}

// Générer des questions pour d'autres thèmes
export function generateColorQuestions(count = 5) {
  const colorWords = [
    { en: 'red', fr: 'rouge', emoji: '🔴' },
    { en: 'blue', fr: 'bleu', emoji: '🔵' },
    { en: 'green', fr: 'vert', emoji: '🟢' },
    { en: 'yellow', fr: 'jaune', emoji: '🟡' },
    { en: 'orange', fr: 'orange', emoji: '🟠' },
    { en: 'purple', fr: 'violet', emoji: '🟣' },
    { en: 'pink', fr: 'rose', emoji: '🟤' },
    { en: 'black', fr: 'noir', emoji: '⚫' },
    { en: 'white', fr: 'blanc', emoji: '⚪' },
    { en: 'brown', fr: 'marron', emoji: '🟤' }
  ];
  
  const questions = [];
  const shuffled = [...colorWords].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const correctWord = shuffled[i];
    const otherOptions = shuffled
      .filter(word => word.en !== correctWord.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [correctWord, ...otherOptions];
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    questions.push({
      id: i + 1,
      question: `Which color is ${correctWord.emoji}?`,
      questionFr: `Quelle est la couleur ${correctWord.emoji} ?`,
      correctAnswer: correctWord.en,
      options: shuffledOptions.map(opt => opt.en),
      emojis: shuffledOptions.map(opt => opt.emoji),
      type: 'multiple_choice'
    });
  }
  
  return questions;
}

export function generateNumberQuestions(count = 5) {
  const numberWords = [
    { en: 'one', fr: 'un', value: 1 },
    { en: 'two', fr: 'deux', value: 2 },
    { en: 'three', fr: 'trois', value: 3 },
    { en: 'four', fr: 'quatre', value: 4 },
    { en: 'five', fr: 'cinq', value: 5 },
    { en: 'six', fr: 'six', value: 6 },
    { en: 'seven', fr: 'sept', value: 7 },
    { en: 'eight', fr: 'huit', value: 8 },
    { en: 'nine', fr: 'neuf', value: 9 },
    { en: 'ten', fr: 'dix', value: 10 }
  ];
  
  const questions = [];
  const shuffled = [...numberWords].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const correctWord = shuffled[i];
    const otherOptions = shuffled
      .filter(word => word.en !== correctWord.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [correctWord, ...otherOptions];
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    questions.push({
      id: i + 1,
      question: `What is ${correctWord.value} in English?`,
      questionFr: `Comment dit-on ${correctWord.value} en anglais ?`,
      correctAnswer: correctWord.en,
      options: shuffledOptions.map(opt => opt.en),
      emojis: shuffledOptions.map(opt => String.fromCodePoint(0x1F1E6 + opt.value - 1) || '❓'),
      type: 'multiple_choice'
    });
  }
  
  return questions;
}

// Obtenir les questions pour un thème donné
export function getQuestionsForTheme(theme, count = 5) {
  switch (theme) {
    case 'animals':
      return generateAnimalQuestions(count);
    case 'colors':
      return generateColorQuestions(count);
    case 'numbers':
      return generateNumberQuestions(count);
    default:
      return generateAnimalQuestions(count);
  }
}

// Obtenir les niveaux depuis levels.json
export async function getLevels() {
  try {
    const response = await fetch('/src/data/levels.json');
    if (!response.ok) throw new Error('Failed to load levels');
    const data = await response.json();
    return data.levels;
  } catch (error) {
    console.error('Error loading levels:', error);
    // Retourner des niveaux par défaut
    return [
      { id: 1, theme: 'animals', name: "Île des Animaux", emoji: "🐶", unlocked: true },
      { id: 2, theme: 'colors', name: "Île des Couleurs", emoji: "🎨", unlocked: false },
      { id: 3, theme: 'numbers', name: "Île des Nombres", emoji: "123", unlocked: false }
    ];
  }
}

// Formatage du temps
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} min ${secs} sec`;
}

// Formatage de la date
export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Formatage du score
export function formatScore(score, total) {
  return `${score}/${total}`;
}

// Calcul du pourcentage
export function calculatePercentage(score, total) {
  return Math.round((score / total) * 100);
}
