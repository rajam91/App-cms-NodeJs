#### App CMS

L'objectif de ce test technique est de créer une application web qui récupère des articles d'un CMS qui comprends un système de création de compte et d'authentification.

Le back end à été fait en NodeJs avec express.

On commence par le téléchargement de Node, si vous êtes utilisateur mac, télécharger homebrew sur votre mac puis faites 
```
brew install node
```

Vous pouvez également télécharger depuis  https://nodejs.org/.

Pour vérifier si le téléchargement a été fait correctement :
node -v
npm -v

Sur windows, on peut télécharger WSL.
Pour les utilisateur linux :
sudo apt update
sudo apt install nodejs
sudo apt install npm

Ensuite on télécharge les bibliothèque nécéssaire pour ce projet avec :

```
npm i <nom-de-la-bibliotheque>
```