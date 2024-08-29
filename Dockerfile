# Usa la imagen base oficial de Node.js versión 16
# Esta imagen contiene Node.js y npm, que son necesarios para la instalación de dependencias del proyecto.
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
# Todas las acciones subsiguientes (RUN, COPY, etc.) se ejecutarán desde este directorio.
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) al directorio de trabajo
# Se copian antes que el código fuente para aprovechar la caché de Docker en instalaciones repetidas.
COPY package*.json ./

# Instala las dependencias definidas en package.json
# Esto incluye dependencias de Node.js necesarias para el proyecto.
RUN npm install

# Instala Meteor versión 2.12
# Se utiliza el script oficial de instalación de Meteor mediante curl.
RUN curl https://install.meteor.com/\?release\=2.12 | sh

# Copia todo el código fuente del proyecto al directorio de trabajo
# Esto incluye archivos de aplicación, configuraciones, etc.
COPY . .

# Expone el puerto 8080 en el contenedor
# Permite que las solicitudes externas accedan al puerto en el que la aplicación estará escuchando.
EXPOSE 8080

# Comando de inicio de la aplicación
# Ejecuta Meteor en modo de desarrollo en el puerto 8080 con permisos de superusuario permitidos.
CMD ["meteor", "run", "--port", "8080", "--allow-superuser"]
