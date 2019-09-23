# Le blog hakathon :running:

Bon le temps est venu de mettre en pratique la formation en créant un [blog](http://blog.julienmoulis.io).

## Installation

- Cloner le repo `blog` from [gitLab](https://gitlab.com/integration_team/blog)
- A partir de la racine exécuter `npm install`
- Pour démarrer votre server exécuter `npm start`

## Description de la structure projet

1. Dossier `back`: (optionnel)

   - Ce dossier intègre le serveur de donnée local. Dans le cas où vous souhaitez développer sans connexion internet.
   - Installer NodeJs.
   - Installer MongoDB.
   - Ajouter un fichier à la racine `.env.developpment` et ajouter la valeur suivante `REACT_APP_ROOT_API=http://localhost:7000`
   - A partir du dossier `back/` exécuter `npm install`
   - Démarrer le server à partir du dossier `back` `npm start`

2. Dossier `src`:

- Ce dossier comprend dores et déjà les dossier suivants:
  - `components` ce dossier devra compendre l'ensemble des composants relatifs à votre travail.
  - `store` dans lequel est stocké l'ensemble des fichiers relatif à redux et middleware api (`store/middlewares/api`). Ne faisant pas parti de l'exercice j'ai intégré l'aspect Autorisation et Authentification (`store/middlewares/api/`) ainsi que des fichiers d'examples.
  - `services` dans lequel se trouve un fichier de méthodes d'aide pour gérer le localStorage

3. Dossier `styles`:

- Ce dossier comprends quelques fichiers de style type nécessaire à l'utilisation de la librairie emotionJs

## L'objectif

L'objectif principal de cet exercice est de réussir à `Créer, Afficher, Etider et Supprimer un post`. Vous pourrez mettre en pratique l'ensemble des compétences étudiées lors de la formation. React-router, redux, React (useState, useEffect)...
Le CSS viendra dans un second temps ce n'est pas l'objectif principal.
Voici le lien vers la maquette sur laquelle vous pourrez baser votre travail [blog](http://blog.julienmoulis.io).

> Pour être sure de ne pas vous demander l'impossible je me suis mis à votre place et ai produit le blog vendredi aprèm. Donc si j'y arrive vous pourrez aussi :muscle:

## Fin 🏆

Nous ferons une démo ensemble de votre travail mercredi 25. (via le partage d'écran de teams)
