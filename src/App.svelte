<script>
  import { onMount } from 'svelte';
  
  // Initialisation de l'application
  let currentScreen = 'home'; // Écrans possibles : 'home', 'map', 'level', 'journal'
  
  onMount(() => {
    // Vérifier si l'application est installée en tant que PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('Application installée en mode PWA');
    }
    
    // Charger les données de progression depuis LocalStorage
    const savedProgress = localStorage.getItem('englishAdventureProgress');
    if (savedProgress) {
      console.log('Progression chargée :', JSON.parse(savedProgress));
    }
  });

  // Navigation entre les écrans
  const navigateTo = (screen) => {
    currentScreen = screen;
  };
</script>

<main>
  {#if currentScreen === 'home'}
    <div class="screen home-screen">
      <h1>English Adventure CE1</h1>
      <p>Bienvenue dans ton aventure pour apprendre l'anglais !</p>
      <div class="buttons">
        <button on:click={() => navigateTo('map')} class="primary-btn">
          Jouer
        </button>
        <button on:click={() => navigateTo('journal')} class="secondary-btn">
          Mon Journal
        </button>
        <button class="secondary-btn">
          À propos
        </button>
      </div>
    </div>
  {:else if currentScreen === 'map'}
    <div class="screen map-screen">
      <h1>Carte du Monde</h1>
      <p>Choisis une île à explorer :</p>
      <div class="islands">
        <div class="island" on:click={() => navigateTo('level')}>
          <h3>🐶 Île des Animaux</h3>
          <p>Apprends les animaux en anglais</p>
        </div>
        <div class="island locked">
          <h3>🎨 Île des Couleurs</h3>
          <p>Débloque cette île en terminant la précédente</p>
        </div>
        <div class="island locked">
          <h3>123 Île des Nombres</h3>
          <p>Débloque cette île en terminant la précédente</p>
        </div>
      </div>
      <button on:click={() => navigateTo('home')} class="back-btn">
        Retour
      </button>
    </div>
  {:else if currentScreen === 'level'}
    <div class="screen level-screen">
      <h1>Niveau : Les Animaux</h1>
      <p>Trouve le bon animal !</p>
      <div class="game-area">
        <div class="question">
          <p>Où est le <strong>cat</strong> ?</p>
        </div>
        <div class="options">
          <button class="option">🐶</button>
          <button class="option">🐱</button>
          <button class="option">🐦</button>
          <button class="option">🐷</button>
        </div>
      </div>
      <button on:click={() => navigateTo('map')} class="back-btn">
        Retour à la carte
      </button>
    </div>
  {:else if currentScreen === 'journal'}
    <div class="screen journal-screen">
      <h1>Mon Journal</h1>
      <p>Voici tes progrès :</p>
      <table class="progress-table">
        <thead>
          <tr>
            <th>Thème</th>
            <th>Étoiles</th>
            <th>Badges</th>
            <th>Temps joué</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Animaux</td>
            <td>⭐⭐⭐</td>
            <td>🏆</td>
            <td>12 min</td>
          </tr>
          <tr>
            <td>Couleurs</td>
            <td>⭐⭐</td>
            <td>-</td>
            <td>8 min</td>
          </tr>
          <tr>
            <td>Nombres</td>
            <td>⭐</td>
            <td>-</td>
            <td>5 min</td>
          </tr>
        </tbody>
      </table>
      <button on:click={() => navigateTo('home')} class="back-btn">
        Retour
      </button>
    </div>
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
  }

  .island:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .island.locked {
    background-color: #F5F5F5;
    border-color: #CCC;
    color: #999;
    cursor: not-allowed;
  }

  .game-area {
    margin: 30px 0;
  }

  .question {
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-family: 'Open Sans', sans-serif;
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
    transition: background-color 0.3s;
    font-family: 'Open Sans', sans-serif;
  }

  .option:hover {
    background-color: #D4EDDA;
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
</style>
