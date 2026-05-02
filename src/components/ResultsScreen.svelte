<script>
  import { gameStore } from '../stores/gameStore';
  import { formatTime, formatScore, calculatePercentage } from '../utils/gameData';

  const playAgain = () => {
    gameStore.resetGame();
    gameStore.navigateTo('map');
  };

  const goToHome = () => {
    gameStore.resetGame();
    gameStore.navigateTo('home');
  };

  $: state = gameStore.subscribe(state => state);
  $: percentage = $state.questions.length > 0 ? calculatePercentage($state.score, $state.questions.length) : 0;
</script>

<div class="screen results-screen">
  <h1>Félicitations !</h1>
  
  <div class="results-container">
    <div class="score-display">
      <h2>Ton Score</h2>
      <div class="score-circle">
        <span class="score-value">{$state.score}</span>
        <span class="score-max">/ {$state.questions.length}</span>
      </div>
      <div class="percentage">{percentage}%</div>
    </div>
    
    <div class="stats">
      <div class="stat">
        <span class="stat-label">Temps joué:</span>
        <span class="stat-value">{formatTime($state.timeSpent)}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Niveau:</span>
        <span class="stat-value">{$state.currentLevel === 'animals' ? 'Animaux' : $state.currentLevel === 'colors' ? 'Couleurs' : $state.currentLevel === 'numbers' ? 'Nombres' : $state.currentLevel}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Étoiles gagnées:</span>
        <span class="stat-value">
          {#each Array(3) as _, i}
            <span>{Math.floor(($state.score / $state.questions.length) * 3) > i ? '⭐' : '☆'}</span>
          {/each}
        </span>
      </div>
    </div>
    
    <div class="feedback-message">
      {#if percentage >= 80}
        <p>🌟 Excellent travail ! Tu es un vrai champion !</p>
      {:else if percentage >= 60}
        <p>👍 Bien joué ! Continue comme ça !</p>
      {:else if percentage >= 40}
        <p>😊 Pas mal ! Un peu plus d'entraînement et tu seras parfait !</p>
      {:else}
        <p>💪 Ne te décourage pas ! Essaie encore, tu vas y arriver !</p>
      {/if}
    </div>
    
    <div class="buttons">
      <button on:click={playAgain} class="primary-btn">
        Rejouer
      </button>
      <button on:click={goToHome} class="secondary-btn">
        Retour à l'accueil
      </button>
    </div>
  </div>
</div>
