<script>
  import { gameStore } from '../stores/gameStore';
</script>

<div class="screen about-screen">
  <h1>À propos de English Adventure CE1</h1>
  
  <div class="about-content">
    <div class="about-section">
      <h2>📚 Qu'est-ce que English Adventure CE1 ?</h2>
      <p>
        English Adventure CE1 est un jeu éducatif conçu pour aider les enfants de CE1 (environ 7 ans) 
        à apprendre l'anglais de manière ludique et interactive.
      </p>
    </div>
    
    <div class="about-section">
      <h2>🎯 Objectifs du jeu</h2>
      <ul>
        <li>Apprendre le vocabulaire anglais de base (animaux, couleurs, nombres, etc.)</li>
        <li>Développer la reconnaissance visuelle et auditive des mots</li>
        <li>S'amuser tout en apprenant grâce à des mini-jeux interactifs</li>
        <li>Suivre sa progression et gagner des récompenses</li>
      </ul>
    </div>
    
    <div class="about-section">
      <h2>🏆 Fonctionnalités</h2>
      <ul>
        <li>7 îles thématiques à explorer (Animaux, Couleurs, Nombres, Famille, Vêtements, Nourriture, Actions)</li>
        <li>Des questions interactives avec feedback immédiat</li>
        <li>Un système de score et d'étoiles pour mesurer tes progrès</li>
        <li>Un journal pour suivre ton historique et tes performances</li>
        <li>Des badges à débloquer en complétant les niveaux</li>
        <li>Un système de déverrouillage progressif des niveaux</li>
      </ul>
    </div>
    
    <div class="about-section">
      <h2>🎮 Comment jouer ?</h2>
      <ol>
        <li>Clique sur "Jouer" pour accéder à la carte du monde</li>
        <li>Choisis une île thématique (la première est toujours débloquée)</li>
        <li>Réponds aux questions en cliquant sur la bonne réponse</li>
        <li>Gagne des étoiles en fonction de ton score</li>
        <li>Débloque de nouvelles îles en obtenant assez d'étoiles</li>
        <li>Consulte ton journal pour voir ta progression</li>
      </ol>
    </div>
    
    <div class="about-section">
      <h2>💡 Conseils pour les parents</h2>
      <p>
        English Adventure CE1 est conçu pour être utilisé de manière autonome par les enfants. 
        Cependant, nous vous encourageons à :
      </p>
      <ul>
        <li>Jouer avec votre enfant pour l'encourager</li>
        <li>L'aider à comprendre les consignes si nécessaire</li>
        <li>Célébrer ses progrès et ses réussites</li>
        <li>Limiter les sessions à 15-20 minutes pour maintenir la concentration</li>
      </ul>
    </div>
    
    <div class="about-section">
      <h2>📱 Fonctionnalités techniques</h2>
      <p>
        Ce jeu est une <strong>Progressive Web App (PWA)</strong>, ce qui signifie que :
      </p>
      <ul>
        <li>Tu peux l'installer sur ton téléphone ou tablette comme une application native</li>
        <li>Il fonctionne hors ligne une fois installé</li>
        <li>Tes progrès sont sauvegardés localement sur ton appareil</li>
        <li>Il s'adapte à tous les types d'écrans (mobile, tablette, ordinateur)</li>
      </ul>
    </div>
    
    <div class="about-section">
      <h2>🔒 Vie privée et sécurité</h2>
      <p>
        English Adventure CE1 respecte ta vie privée :
      </p>
      <ul>
        <li>Aucune donnée personnelle n'est collectée</li>
        <li>Toutes les données de jeu sont stockées localement sur ton appareil</li>
        <li>Aucune connexion internet n'est requise pour jouer (sauf pour la première installation)</li>
        <li>Le jeu ne contient aucune publicité</li>
      </ul>
    </div>
    
    <div class="about-section">
      <h2>📧 Contact et support</h2>
      <p>
        Si tu as des questions, des suggestions ou si tu rencontres un problème, 
        n'hésite pas à contacter le développeur via GitHub.
      </p>
      <p>
        <strong>Développeur :</strong> delitdesnoyers06-del<br>
        <strong>Repository :</strong> <a href="https://github.com/delitdesnoyers06-del/english-adventure-ce1" target="_blank">english-adventure-ce1</a>
      </p>
    </div>
    
    <div class="about-section">
      <h2>📜 Licence</h2>
      <p>
        English Adventure CE1 est un logiciel open source sous licence MIT. 
        Tu es libre de l'utiliser, le modifier et le partager selon les termes de cette licence.
      </p>
    </div>
  </div>
  
  <button on:click={() => gameStore.navigateTo('home')} class="back-btn">
    Retour
  </button>
</div>
