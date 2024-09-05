# Usa la imagen base oficial de Node.js versión 14
# Node.js 14 es compatible con Meteor 2.12 y proporciona un entorno de ejecución estable y soportado para aplicaciones Meteor.
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
# Este directorio será el contexto donde se ejecutarán todos los comandos subsiguientes.
WORKDIR /app

# Instala Meteor versión 2.12
# Descarga e instala Meteor usando un script de shell proporcionado por Meteor. 
# Se especifica la versión 2.12 para asegurar la compatibilidad con Node.js 14.
RUN curl https://install.meteor.com/\?release\=2.12 | sh

# Copia los archivos de dependencias (package.json y package-lock.json) al directorio de trabajo
# Copiar estos archivos primero permite aprovechar la caché de Docker y acelerar la construcción del contenedor si no han cambiado las dependencias.
COPY package*.json ./

# Instala las dependencias definidas en package.json
# Utiliza `meteor npm ci --production` para instalar dependencias en modo de producción, garantizando un entorno limpio y reproducible.
RUN meteor npm ci --production

# Copia todo el código fuente del proyecto al directorio de trabajo
# Esta instrucción copia el código fuente de la aplicación al contenedor. Es crucial para la construcción y ejecución del proyecto.
COPY . .

# Construye la aplicación de Meteor para producción
# Compila la aplicación Meteor en el directorio /app/build en modo "server-only" (solo servidor) y permite el uso de superusuario.
# Esto prepara la aplicación para ejecutarse en un entorno de producción.
RUN meteor build --directory /app/build --server-only --allow-superuser

# Establece el directorio de trabajo a la carpeta de compilación
# Cambia el contexto de trabajo al directorio donde se encuentra el código compilado de la aplicación.
WORKDIR /app/build/bundle

# Instala dependencias de la aplicación compilada
# Navega al directorio 'programs/server' dentro de la carpeta compilada y ejecuta `npm ci --production` para instalar las dependencias necesarias en modo producción.
RUN cd programs/server && npm ci --production

# Expone el puerto en el que la aplicación escuchará
# Abre el puerto 8080 para permitir que el tráfico externo acceda a la aplicación. Este puerto debe coincidir con la configuración del archivo fly.toml.
EXPOSE 8080

# Comando de inicio de la aplicación utilizando Node.js
# Inicia la aplicación ejecutando el archivo `main.js` utilizando Node.js. Este es el punto de entrada para la aplicación compilada.
CMD ["node", "main.js"]
