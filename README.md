# English Adventure CE1 🌍

> **Un jeu éducatif PWA pour réviser l'anglais en CE1 (7 ans) de manière ludique et autonome.**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://delitdesnoyers06-del.github.io/english-adventure-ce1)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue)](https://web.dev/progressive-web-apps/)

---

## 🎮 **Concept**

**English Adventure CE1** est une **application web progressive (PWA)** installable sur mobile, tablette ou PC, conçue pour aider les enfants de **7 ans (niveau CE1)** à réviser les bases de l'anglais à travers une **aventure narrative interactive**.

L’enfant incarne un explorateur qui voyage à travers des îles thématiques (animaux, couleurs, nombres, etc.) et résout des énigmes linguistiques pour progresser.

✅ **100% gratuit** | ✅ **Hors ligne** | ✅ **Sans publicité** | ✅ **Sans backend**

---

## 📚 **Contenu Pédagogique (MVP)**

| **Thème**       | **Compétences**                          | **Mini-jeux**                          |
|------------------|------------------------------------------|----------------------------------------|
| 🐶 Animaux       | Vocabulaire (cat, dog, bird...)          | Appariement image/mot, mémoire         |
| 🎨 Couleurs       | Noms des couleurs (red, blue, green...) | Quiz audio, classification             |
| 123 Nombres      | 1-20 (one, two, three...)                | Compter des objets, séquence           |
| 👨‍👩‍👧‍👦 Famille   | Mots (mother, father, brother...)        | QCM, association                        |
| 👕 Vêtements     | Vocabulaire (hat, shirt, shoes...)      | Trouver l’intrus, puzzle                |
| 🍎 Nourriture     | Fruits, légumes, plats (apple, bread...) | Classer par catégorie                   |
| 🏃 Actions        | Verbes (run, jump, eat, drink...)        | Mimer l’action (via icônes)            |

---

## 🎯 **Fonctionnalités**

### 🎮 **Gameplay**
- **Aventure linéaire** : 5-10 niveaux (îles) à débloquer.
- **Mini-jeux variés** :
  - Appariement image/mot
  - Quiz audio (écouter → cliquer sur la bonne réponse)
  - Mémoire (retourner des cartes)
  - Classification (ex: trier les couleurs)
- **Système de récompenses** :
  - ⭐ 1-3 étoiles par niveau (selon le score)
  - 🏆 Badges (ex: "Champion des animaux")
- **Feedback immédiat** : Animations et sons (✅/❌ + "Well done!").

### 📊 **Suivi des Progrès**
- **Sauvegarde locale** (LocalStorage) :
  - Niveau atteint
  - Étoiles et badges obtenus
  - Temps passé par thème
- **Journal de bord** : Écran récapitulatif pour l’enfant et les parents.

### 🔊 **Accessibilité**
- **Textes lus à voix haute** (Web Speech API + fallback MP3).
- **Polices larges** (min. 24px) et **contrastes élevés**.
- **Boutons tactiles** (44x44px minimum).
- **Navigation simplifiée** (flèches + touches ESPACE/ENTRÉE).

### 📱 **Technique**
- **PWA** : Installable sur tous les appareils (icône, nom, mode hors ligne).
- **Hors ligne** : Cache des assets (images, sons) via Service Worker.
- **Responsive** : Adapté mobile (portrait), tablette et desktop.
- **100% client-side** : Pas de backend, pas de base de données.

---

## 🛠 **Stack Technique**

| **Couche**       | **Technologie**               | **Rôle**                                  |
|------------------|-------------------------------|-------------------------------------------|
| **Frontend**     | [Svelte](https://svelte.dev/) | Framework léger et réactif.               |
| **Build**        | [Vite](https://vitejs.dev/)   | Bundler rapide + plugin PWA.              |
| **PWA**          | [Workbox](https://developers.google.com/web/tools/workbox) | Gestion du cache hors ligne.       |
| **Storage**      | LocalStorage                  | Sauvegarde des progrès.                   |
| **Audio**        | Web Speech API + MP3          | Prononciation des mots.                  |
| **Styles**       | CSS custom                    | Design coloré et enfantin.                |

---

## 🚀 **Installation & Déploiement**

### **Prérequis**
- Node.js ≥ 18
- npm ou pnpm

### **Installation locale**
```bash
# Cloner le dépôt
git clone https://github.com/delitdesnoyers06-del/english-adventure-ce1.git
cd english-adventure-ce1

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

### **Déploiement sur GitHub Pages**
1. Pousser le code sur la branche `main`.
2. Activer GitHub Pages dans les paramètres du dépôt (dossier `/dist`).
3. Le site sera disponible à : `https://delitdesnoyers06-del.github.io/english-adventure-ce1/`

> ⚠️ **Note** : Le déploiement automatique via GitHub Actions sera configuré ultérieurement.

---

## 📂 **Structure du Projet**

```
english-adventure-ce1/
├── public/                  # Assets statiques
│   ├── audio/               # Fichiers MP3 (prononciations)
│   ├── images/              # Images (SVG/PNG optimisés)
│   └── favicon.ico          # Icône du site
│
├── src/                     # Code source
│   ├── components/          # Composants Svelte (boutons, cartes, etc.)
│   ├── data/                # Données JSON (thèmes, questions)
│   │   ├── themes/          # Fichiers par thème (animals.json, colors.json...)
│   │   └── levels.json      # Structure des niveaux
│   ├── stores/              # Stores Svelte (état global)
│   ├── styles/              # Feuille de style globale
│   ├── App.svelte           # Composant racine
│   └── main.js              # Point d'entrée
│
├── .github/                 # Configuration GitHub
│   └── workflows/           # GitHub Actions (CI/CD)
│
├── .gitignore
├── package.json
├── vite.config.js           # Configuration Vite + PWA
├── manifest.json            # Manifest PWA
└── README.md
```

---

## 🎨 **Design & Assets**

### **Charte Graphique**
- **Couleurs** :
  - Primaire : `#4CAF50` (vert)
  - Secondaire : `#FF9800` (orange)
  - Accent : `#E91E63` (rose)
  - Fond : `#F5F5F5` (gris clair)
- **Polices** :
  - Titre : `Fredoka One` (Google Fonts)
  - Texte : `Open Sans` (Google Fonts).

### **Assets à Créer**
- [ ] **Personnage** : Explorateur (SVG, 2-3 poses).
- [ ] **Décors** : Îles thématiques (1 par thème).
- [ ] **Icônes** : Pour les mini-jeux et le menu.
- [ ] **Sons** : 
  - Prononciations des mots (MP3, ~1-2s chacun).
  - Effets sonores (✅, ❌, victoire, etc.).

---

## 📋 **Roadmap**

### **MVP (Version 1.0)**
- [ ] Structure de base (Svelte + Vite + PWA)
- [ ] 3 thèmes complets (animaux, couleurs, nombres)
- [ ] 2 types de mini-jeux (appariement, quiz audio)
- [ ] Système de sauvegarde locale
- [ ] Journal de bord basique
- [ ] Design responsive
- [ ] Déploiement sur GitHub Pages

### **Post-MVP**
- [ ] Ajout des 7 thèmes restants
- [ ] Mini-jeux supplémentaires (mémoire, classification)
- [ ] Mode "facile" (aides visuelles)
- [ ] **Français** : Même mécanique pour réviser le français
- [ ] Personnalisation de l’avatar
- [ ] Export des progrès en PDF
- [ ] Mode multi-joueurs local (2 enfants)

---

## 🤝 **Contribuer**

Les contributions sont les bienvenues ! Voici comment aider :

1. **Forker** le dépôt.
2. Créer une branche (`git checkout -b feature/ma-fonctionnalité`).
3. Commiter vos changements (`git commit -m 'Ajout de X'`).
4. Pousser vers la branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrir une **Pull Request**.

### **Besoin d’Idées ?**
- [ ] Créer des **niveaux supplémentaires** (nouveaux thèmes).
- [ ] Améliorer le **design** (CSS, animations).
- [ ] Ajouter des **effets sonores**.
- [ ] Traduire l’interface en **autres langues**.

---

## 📜 **Licence**

Ce projet est sous licence **MIT** – libre d’utilisation, modification et distribution.

---

## 🙏 **Remerciements**

- Inspiré par les jeux éducatifs comme **Duolingo Kids** et **Pepi House**.
- Merci aux contributeurs et à la communauté open-source !

---

## 📬 **Contact**

Pour toute question ou suggestion, ouvrez une **Issue** ou contactez-nous via [GitHub Discussions](https://github.com/delitdesnoyers06-del/english-adventure-ce1/discussions).
