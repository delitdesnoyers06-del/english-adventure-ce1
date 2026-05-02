<script>
  import { onMount } from 'svelte';
  import { gameStore } from './stores/gameStore';
  import HomeScreen from './components/HomeScreen.svelte';
  import MapScreen from './components/MapScreen.svelte';
  import LevelScreen from './components/LevelScreen.svelte';
  import ResultsScreen from './components/ResultsScreen.svelte';
  import JournalScreen from './components/JournalScreen.svelte';
  import AboutScreen from './components/AboutScreen.svelte';

  onMount(() => {
    // Charger l'état depuis localStorage au démarrage
    gameStore.loadFromLocalStorage();
    
    // Vérifier si l'application est installée en tant que PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('Application installée en mode PWA');
    }
  });

  // Sauvegarder l'état dans localStorage à chaque changement
  $: {
    if (typeof window !== 'undefined') {
      const state = gameStore.subscribe(state => state);
      localStorage.setItem('englishAdventureState', JSON.stringify($state));
    }
  }

  $: currentScreen = gameStore.subscribe(state => state.currentScreen);
</script>

<main>
  {#if $currentScreen === 'home'}
    <HomeScreen />
  {:else if $currentScreen === 'map'}
    <MapScreen />
  {:else if $currentScreen === 'level'}
    <LevelScreen />
  {:else if $currentScreen === 'results'}
    <ResultsScreen />
  {:else if $currentScreen === 'journal'}
    <JournalScreen />
  {:else if $currentScreen === 'about'}
    <AboutScreen />
  {/if}
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fredoka One', cursive, sans-serif;
  }

  :global(body) {
    background-color: #F5F5F5;
    color: #333;
    min-height: 100vh;
    padding: 20px;
  }

  .screen {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h1 {
    color: #4CAF50;
    margin-bottom: 20px;
    font-size: 2rem;
  }

  h2 {
    color: #4CAF50;
    margin: 20px 0 15px;
    font-size: 1.5rem;
    font-family: 'Fredoka One', cursive, sans-serif;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #555;
    font-family: 'Open Sans', sans-serif;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
  }

  .primary-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Open Sans', sans-serif;
  }

  .primary-btn:hover {
    background-color: #45a049;
  }

  .secondary-btn {
    background-color: #FF9800;
    color: white;
    border: none;
    padding: 12px 25px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Open Sans', sans-serif;
  }

  .secondary-btn:hover {
    background-color: #e68a00;
  }

  .back-btn {
    margin-top: 20px;
    background-color: #E91E63;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Open Sans', sans-serif;
  }

  .back-btn:hover {
    background-color: #c2185b;
  }

  .clear-btn {
    margin-top: 20px;
    background-color: #F44336;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Open Sans', sans-serif;
  }

  .clear-btn:hover {
    background-color: #d32f2f;
  }

  .next-btn {
    background-color: #2196F3;
    color: white;
    border: none;
    padding: 12px 25px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Open Sans', sans-serif;
    margin-top: 15px;
  }

  .next-btn:hover {
    background-color: #0b7dda;
  }

  /* Game Area Styles */
  .game-area {
    margin: 30px 0;
  }

  .progress-bar {
    height: 20px;
    background-color: #E8F5E8;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: #4CAF50;
    border-radius: 10px;
    transition: width 0.3s ease;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    font-size: 0.9rem;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
  }

  .score-time {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-family: 'Open Sans', sans-serif;
  }

  .score, .time {
    padding: 8px 15px;
    background-color: #E8F5E8;
    border-radius: 20px;
    font-weight: bold;
  }

  .question {
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-family: 'Open Sans', sans-serif;
    min-height: 60px;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
  }

  .option {
    background-color: #E8F5E8;
    border: 2px solid #4CAF50;
    border-radius: 8px;
    padding: 20px;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Open Sans', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .option:hover:not(:disabled) {
    background-color: #D4EDDA;
    transform: scale(1.05);
  }

  .option:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .option.correct {
    background-color: #D4EDDA;
    border-color: #4CAF50;
    animation: correctPulse 0.5s;
  }

  .option.incorrect {
    background-color: #FFEBEE;
    border-color: #F44336;
    animation: incorrectShake 0.5s;
  }

  .option-text {
    font-size: 1rem;
    color: #555;
    font-family: 'Open Sans', sans-serif;
  }

  @keyframes correctPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @keyframes incorrectShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .feedback {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Open Sans', sans-serif;
    animation: slideIn 0.3s ease;
  }

  .correct-feedback {
    background-color: #D4EDDA;
    border: 2px solid #4CAF50;
    color: #2E7D32;
  }

  .incorrect-feedback {
    background-color: #FFEBEE;
    border: 2px solid #F44336;
    color: #C62828;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Results Screen Styles */
  .results-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .score-display {
    margin-bottom: 30px;
  }

  .score-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #4CAF50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto 15px;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
  }

  .score-value {
    font-size: 3rem;
    font-weight: bold;
    color: white;
    line-height: 1;
  }

  .score-max {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1;
  }

  .percentage {
    font-size: 1.5rem;
    color: #4CAF50;
    font-weight: bold;
    font-family: 'Fredoka One', cursive, sans-serif;
  }

  .stats {
    background-color: #F5F5F5;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .stat {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #E0E0E0;
    font-family: 'Open Sans', sans-serif;
  }

  .stat:last-child {
    border-bottom: none;
  }

  .stat-label {
    font-weight: bold;
    color: #555;
  }

  .stat-value {
    color: #4CAF50;
    font-weight: bold;
  }

  .feedback-message {
    margin: 20px 0;
    padding: 15px;
    background-color: #E8F5E8;
    border-radius: 8px;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.1rem;
  }

  /* Journal Screen Styles */
  .tabs {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    gap: 10px;
  }

  .tab-btn {
    padding: 10px 20px;
    background-color: #E8F5E8;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Open Sans', sans-serif;
    transition: all 0.3s;
  }

  .tab-btn:hover {
    background-color: #D4EDDA;
  }

  .tab-btn.active {
    background-color: #4CAF50;
    color: white;
  }

  .tab-content {
    display: none;
  }

  .tab-content:first-child {
    display: block;
  }

  .empty-state {
    text-align: center;
    padding: 40px;
    color: #999;
    font-family: 'Open Sans', sans-serif;
  }

  .history-list {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .history-item {
    background-color: #F5F5F5;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s;
    border-left: 4px solid #4CAF50;
  }

  .history-item:hover {
    background-color: #E8F5E8;
    transform: translateX(5px);
  }

  .history-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-family: 'Open Sans', sans-serif;
  }

  .history-date {
    font-weight: bold;
    color: #4CAF50;
  }

  .history-level {
    color: #666;
  }

  .history-details {
    display: flex;
    justify-content: space-between;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.9rem;
    color: #555;
  }

  .history-score {
    font-weight: bold;
    color: #4CAF50;
  }

  .history-time {
    color: #666;
  }

  .history-percentage {
    font-weight: bold;
  }

  .progress-table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
    font-family: 'Open Sans', sans-serif;
  }

  .progress-table th,
  .progress-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #DDD;
  }

  .progress-table th {
    background-color: #4CAF50;
    color: white;
  }

  .progress-table tr:nth-child(even) {
    background-color: #F9F9F9;
  }

  /* Islands Styles */
  .islands {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }

  .island {
    background-color: #E8F5E8;
    border: 2px solid #4CAF50;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    text-align: center;
  }

  .island:hover:not(.locked) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .island.locked {
    background-color: #F5F5F5;
    border-color: #CCC;
    color: #999;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .stars {
    margin-top: 10px;
    font-size: 1.2rem;
  }

  /* About Screen Styles */
  .about-content {
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
  }

  .about-section {
    margin-bottom: 30px;
  }

  .about-section h2 {
    color: #4CAF50;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }

  .about-section p,
  .about-section ul,
  .about-section ol {
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 10px;
  }

  .about-section ul,
  .about-section ol {
    padding-left: 20px;
  }

  .about-section li {
    margin-bottom: 5px;
  }

  .about-section a {
    color: #2196F3;
    text-decoration: none;
  }

  .about-section a:hover {
    text-decoration: underline;
  }

  /* Loading State */
  .loading {
    padding: 40px;
    text-align: center;
    color: #999;
    font-family: 'Open Sans', sans-serif;
  }

  /* Responsive Design */
  @media (max-width: 600px) {
    .screen {
      padding: 15px;
    }

    h1 {
      font-size: 1.5rem;
    }

    .options {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .option {
      padding: 15px;
      font-size: 1.5rem;
    }

    .islands {
      grid-template-columns: 1fr;
    }

    .score-circle {
      width: 120px;
      height: 120px;
    }

    .score-value {
      font-size: 2.5rem;
    }

    .score-max {
      font-size: 1.2rem;
    }
  }
</style>
