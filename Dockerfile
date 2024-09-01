# Utiliser une image Node.js comme base
FROM node:18 AS build-stage

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet
COPY . .

# Construire l'application Vue.js
RUN npm run build

# Utiliser une image Nginx pour le serveur web
FROM nginx:stable-alpine AS production-stage

# Copier les fichiers construits vers le répertoire Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposer le port sur lequel Nginx fonctionne
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
