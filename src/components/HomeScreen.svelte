<script>
  import { gameStore } from '../stores/gameStore';

  const navigateTo = (screen) => {
    gameStore.navigateTo(screen);
  };
</script>

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
    <button on:click={() => navigateTo('about')} class="secondary-btn">
      À propos
    </button>
  </div>
</div>
