<script>
  import { gameStore } from '../stores/gameStore';
  import { formatDate, formatTime, formatScore } from '../utils/gameData';

  $: state = gameStore.subscribe(state => state);

  const getLevelName = (theme) => {
    const names = {
      'animals': 'Animaux',
      'colors': 'Couleurs',
      'numbers': 'Nombres',
      'family': 'Famille',
      'clothes': 'Vêtements',
      'food': 'Nourriture',
      'actions': 'Actions'
    };
    return names[theme] || theme;
  };

  const viewDetails = (game) => {
    // Pour l'instant, on affiche juste un message
    alert(`Détails de la partie:\n\nDate: ${formatDate(game.date)}\nNiveau: ${getLevelName(game.level)}\nScore: ${game.score}/${game.totalQuestions}\nTemps: ${formatTime(game.timeSpent)}`);
  };

  const clearHistory = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
      gameStore.update(state => ({
        ...state,
        gameHistory: []
      }));
      gameStore.saveToLocalStorage();
    }
  };
</script>

<div class="screen journal-screen">
  <h1>Mon Journal</h1>
  <p>Voici tes progrès et ton historique de jeu :</p>
  
  <div class="tabs">
    <button class="tab-btn active">Historique</button>
    <button class="tab-btn">Progression</button>
  </div>
  
  <div class="tab-content">
    <h2>Historique des parties</h2>
    
    {#if $state.gameHistory.length === 0}
      <div class="empty-state">
        <p>📖 Tu n'as pas encore joué de partie.</p>
        <p>Commence une partie pour voir ton historique ici !</p>
      </div>
    {:else}
      <div class="history-list">
        {#each $state.gameHistory as game, index (game.timestamp)}
          <div class="history-item" on:click={() => viewDetails(game)}>
            <div class="history-header">
              <span class="history-date">{formatDate(game.date)}</span>
              <span class="history-level">{getLevelName(game.level)}</span>
            </div>
            <div class="history-details">
              <span class="history-score">{game.score}/{game.totalQuestions}</span>
              <span class="history-time">{formatTime(game.timeSpent)}</span>
              <span class="history-percentage">
                {Math.round((game.score / game.totalQuestions) * 100)}%
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  <div class="tab-content">
    <h2>Progression par thème</h2>
    <table class="progress-table">
      <thead>
        <tr>
          <th>Thème</th>
          <th>Étoiles</th>
          <th>Temps joué</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>🐶 Animaux</td>
          <td>
            {#each Array(3) as _, i}
              <span>{$state.progress.animals.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </td>
          <td>{formatTime($state.progress.animals.timePlayed)}</td>
          <td>{$state.progress.animals.unlocked ? '✅ Débloqué' : '🔒 Verrouillé'}</td>
        </tr>
        <tr>
          <td>🎨 Couleurs</td>
          <td>
            {#each Array(3) as _, i}
              <span>{$state.progress.colors.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </td>
          <td>{formatTime($state.progress.colors.timePlayed)}</td>
          <td>{$state.progress.colors.unlocked ? '✅ Débloqué' : '🔒 Verrouillé'}</td>
        </tr>
        <tr>
          <td>123 Nombres</td>
          <td>
            {#each Array(3) as _, i}
              <span>{$state.progress.numbers.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </td>
          <td>{formatTime($state.progress.numbers.timePlayed)}</td>
          <td>{$state.progress.numbers.unlocked ? '✅ Débloqué' : '🔒 Verrouillé'}</td>
        </tr>
        <tr>
          <td>👨‍👩‍👧‍👦 Famille</td>
          <td>
            {#each Array(3) as _, i}
              <span>{$state.progress.family.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </td>
          <td>{formatTime($state.progress.family.timePlayed)}</td>
          <td>{$state.progress.family.unlocked ? '✅ Débloqué' : '🔒 Verrouillé'}</td>
        </tr>
        <tr>
          <td>👕 Vêtements</td>
          <td>
            {#each Array(3) as _, i}
              <span>{$state.progress.clothes.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </td>
          <td>{formatTime($state.progress.clothes.timePlayed)}</td>
          <td>{$state.progress.clothes.unlocked ? '✅ Débloqué' : '🔒 Verrouillé'}</td>
        </tr>
        <tr>
          <td>🍎 Nourriture</td>
          <td>
            {#each Array(3) as _, i}
              <span>{$state.progress.food.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </td>
          <td>{formatTime($state.progress.food.timePlayed)}</td>
          <td>{$state.progress.food.unlocked ? '✅ Débloqué' : '🔒 Verrouillé'}</td>
        </tr>
        <tr>
          <td>🏃 Actions</td>
          <td>
            {#each Array(3) as _, i}
              <span>{$state.progress.actions.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </td>
          <td>{formatTime($state.progress.actions.timePlayed)}</td>
          <td>{$state.progress.actions.unlocked ? '✅ Débloqué' : '🔒 Verrouillé'}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  {#if $state.gameHistory.length > 0}
    <button on:click={clearHistory} class="clear-btn">
      Effacer l'historique
    </button>
  {/if}
  
  <button on:click={() => gameStore.navigateTo('home')} class="back-btn">
    Retour
  </button>
</div>
