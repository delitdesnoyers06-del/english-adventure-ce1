<script>
  import { gameStore, currentQuestion } from '../stores/gameStore';
  import { onMount, afterUpdate } from 'svelte';

  let timerInterval;

  onMount(() => {
    // Démarrer le timer
    timerInterval = setInterval(() => {
      gameStore.updateTime();
    }, 1000);
    
    return () => clearInterval(timerInterval);
  });

  afterUpdate(() => {
    // Si on passe à une nouvelle question, faire défiler vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const selectAnswer = (answer) => {
    const question = $currentQuestion;
    if (question && !gameStore.showFeedback) {
      gameStore.selectAnswer(answer, question.correctAnswer);
      
      // Si la réponse est correcte, incrémenter le score
      if (answer === question.correctAnswer) {
        gameStore.incrementScore();
      }
    }
  };

  const nextQuestion = () => {
    gameStore.nextQuestion();
  };

  const finishGame = () => {
    const state = gameStore.subscribe(state => state);
    gameStore.saveGameResult(state.currentLevel);
    gameStore.saveToLocalStorage();
  };

  $: state = gameStore.subscribe(state => state);
</script>

<div class="screen level-screen">
  <h1>Niveau : {$state.currentLevel === 'animals' ? 'Les Animaux' : $state.currentLevel === 'colors' ? 'Les Couleurs' : $state.currentLevel === 'numbers' ? 'Les Nombres' : $state.currentLevel}</h1>
  
  {#if $currentQuestion}
    <div class="game-area">
      <div class="progress-bar">
        <div class="progress-fill" style="width: {($state.currentQuestionIndex + 1) / $state.questions.length * 100}%">
        </div>
        <span class="progress-text">Question {($state.currentQuestionIndex + 1)} / {$state.questions.length}</span>
      </div>
      
      <div class="score-time">
        <span class="score">Score: {$state.score}</span>
        <span class="time">Temps: {$state.timeSpent} sec</span>
      </div>
      
      <div class="question">
        <p>{$currentQuestion.questionFr}</p>
      </div>
      
      <div class="options">
        {#each $currentQuestion.options as option, index}
          <button 
            class="option {($state.selectedAnswer === option && $state.isAnswerCorrect) ? 'correct' : ($state.selectedAnswer === option && !$state.isAnswerCorrect) ? 'incorrect' : ''}"
            on:click={() => selectAnswer(option)}
            disabled={$state.showFeedback}
          >
            {$currentQuestion.emojis[index] || option}
            <span class="option-text">{option}</span>
          </button>
        {/each}
      </div>
      
      {#if $state.showFeedback}
        <div class="feedback {($state.isAnswerCorrect) ? 'correct-feedback' : 'incorrect-feedback'}">
          {#if $state.isAnswerCorrect}
            <p>✅ Bravo ! C'est la bonne réponse !</p>
          {:else}
            <p>❌ Presque ! La bonne réponse était : {$currentQuestion.correctAnswer}</p>
          {/if}
          
          {#if $state.currentQuestionIndex < $state.questions.length - 1}
            <button on:click={nextQuestion} class="next-btn">
              Question suivante →
            </button>
          {:else}
            <button on:click={finishGame} class="next-btn">
              Terminer le niveau
            </button>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <div class="loading">
      <p>Chargement des questions...</p>
    </div>
  {/if}
  
  <button on:click={() => gameStore.navigateTo('map')} class="back-btn">
    Retour à la carte
  </button>
</div>
