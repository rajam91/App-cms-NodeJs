# App CMS

## BackEnd

L'objectif de ce test technique est de créer une application web qui récupère des articles d'un CMS qui comprends un système de création de compte et d'authentification. 

Le back end à été fait en NodeJs avec express.

#### Téléchargement
On commence par le téléchargement de Node, si vous êtes utilisateur mac, télécharger homebrew sur votre mac puis faites 
```
brew install node
```

Vous pouvez également télécharger depuis  https://nodejs.org/.

Pour vérifier si le téléchargement a été fait correctement :
```node -v``` 

```npm -v```

Sur windows, on peut télécharger WSL.
Pour les utilisateur linux :
```sudo apt update```
```sudo apt install nodejs```
```sudo apt install npm```

Ensuite on télécharge les bibliothèque nécéssaire pour ce projet avec :

```
npm i <nom-de-la-bibliotheque>
```

Nous aurons besoin de télécharger : bcrypt,ts-node,nodemon,express,dotenv, cookie-parser

On doit également télécharger Postgresql pour la base de donnée.

#### Téléchargement de Postgresql

Sur mac on install avec Hombrew de la manière suivante :

```
brew install postgresql

```
Pour les utilisateur windows : https://www.postgresql.org/download/windows/.


#### Petites Explications... 

Le projet n'a pas aboutit et malgré mes erreurs,comme on le dit en anglais "Every day is a school day", j'ai pu apprendre beaucoup de choses, même si je n'ai pas pu le finir en trois jour je vais sûrement le continuer. 

Je vous envoie tout de même ce qui à été fait.

J'ai architecturer mon projet de sorte à avoir un code plus facile à modifier et avoir une structure plus logique.

```Index.js``` étant le fichier d'application.

Le dossier routes contient deux fichiers qui sont responsable de la définition de routes pour l'authentification et gestion d'utilisateur.

Le fichier ```db.js``` contient l'importation de 'pool' de la bibliothèque de psql. On l'utilise pour gérer les connexions à la base de donnée.

On commence par l'importation de la bibliothèque 'pg', c'est ce qui fournit des fonctionnalités pour intéragir avec une database.


#### Mot de la fin 

J'ai pris énormément de temps à me documenter et plus de 2j/3 sur le back end malgré les deadlines que je me suis imposée.