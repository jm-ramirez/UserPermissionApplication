# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y yarn.lock (si existe)
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el código fuente de la aplicación
COPY . .

# Construye la aplicación de React
RUN yarn build

# Expon el puerto en el que se ejecutará la aplicación (por defecto 3000)
EXPOSE 3000

# Inicia la aplicación
CMD ["yarn", "start"]