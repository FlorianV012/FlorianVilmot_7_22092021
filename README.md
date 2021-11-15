# Groupomania

Ce dépôt a été réalisée pour le projet n°7 du parcours développeur Web d’Openclassrooms.

## Prérequis

Vous devez avoir NodeJS et MySQL installés localement sur votre machine, ainsi que les droits en lecture et écritures sur la base de données.
Avoir cloné ce repository.

## Partie Front-end

Pour installer la partie Front-End, lancez les commandes suivantes :

```
cd frontend
npm install
mkdir images
```

Vous pouvez ensuite démarrer le serveur avec `npm run serve`.
Le serveur doit fonctionner sur localhost avec le port par défaut `8080` :
http://localhost:8080/.

## Partie Back-end

Pour installer la partie Back-End, lancez les commandes suivantes :

```
cd frontend
npm install
```

Copier le fichier `.env.example`, le renommer en `.env` puis l'éditer en remplaçant les valeurs des clés suivantes :

- MySQL_DB par le nom de la base de données
- MySQL_DB_user par nom du compte ayant les droits sur la base de données
- MySQL_DB_password par le mot de passe du compte ayant les droits sur la base de données

Vous pouvez ensuite démarrer le serveur avec la commande `Node server`.
Le serveur doit fonctionner sur localhost avec le port par défaut `3000`.
