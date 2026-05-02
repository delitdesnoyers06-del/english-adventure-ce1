<script>
  import { gameStore } from '../stores/gameStore';
  import { getQuestionsForTheme } from '../utils/gameData';

  const levels = [
    { id: 1, theme: 'animals', name: "Île des Animaux", emoji: "🐶", description: "Apprends les animaux en anglais", color: "#4CAF50", unlocked: true },
    { id: 2, theme: 'colors', name: "Île des Couleurs", emoji: "🎨", description: "Débloque cette île en terminant la précédente", color: "#FF9800", unlocked: false },
    { id: 3, theme: 'numbers', name: "Île des Nombres", emoji: "123", description: "Débloque cette île en terminant la précédente", color: "#E91E63", unlocked: false },
    { id: 4, theme: 'family', name: "Île de la Famille", emoji: "👨‍👩‍👧‍👦", description: "Débloque cette île en terminant la précédente", color: "#9C27B0", unlocked: false },
    { id: 5, theme: 'clothes', name: "Île des Vêtements", emoji: "👕", description: "Débloque cette île en terminant la précédente", color: "#00BCD4", unlocked: false },
    { id: 6, theme: 'food', name: "Île de la Nourriture", emoji: "🍎", description: "Débloque cette île en terminant la précédente", color: "#8BC34A", unlocked: false },
    { id: 7, theme: 'actions', name: "Île des Actions", emoji: "🏃", description: "Débloque cette île en terminant la précédente", color: "#FF5722", unlocked: false }
  ];

  const startLevel = (theme) => {
    const questions = getQuestionsForTheme(theme, 5);
    gameStore.startGame(theme, questions);
  };

  $: progress = gameStore.subscribe(state => state.progress);
</script>

<div class="screen map-screen">
  <h1>Carte du Monde</h1>
  <p>Choisis une île à explorer :</p>
  <div class="islands">
    {#each levels as level (level.id)}
      <div 
        class="island {level.unlocked || $progress[level.theme]?.unlocked ? '' : 'locked'}"
        on:click={() => level.unlocked || $progress[level.theme]?.unlocked ? startLevel(level.theme) : null}
        style="border-color: {level.color}; background-color: {level.unlocked || $progress[level.theme]?.unlocked ? level.color + '20' : '#F5F5F5'}"
      >
        <h3>{level.emoji} {level.name}</h3>
        <p>{level.description}</p>
        {#if $progress[level.theme]?.stars > 0}
          <div class="stars">
            {#each Array(3) as _, i}
              <span>{$progress[level.theme]?.stars > i ? '⭐' : '☆'}</span>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
  <button on:click={() => gameStore.navigateTo('home')} class="back-btn">
    Retour
  </button>
</div>
