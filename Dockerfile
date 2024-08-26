# Etapa 1: Construcción
FROM node:20-slim AS builder

# Instala curl y otras dependencias necesarias para instalar Meteor
RUN apt-get update && apt-get install -y curl && \
    curl https://install.meteor.com/ | sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Crear un usuario no root
RUN useradd -m meteoruser

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto con los permisos adecuados
COPY --chown=meteoruser:meteoruser . .

# Permite que Meteor se ejecute como root estableciendo la variable de entorno
ENV METEOR_ALLOW_SUPERUSER=true

# Cambiar a usuario no root
USER meteoruser

# Instala dependencias del proyecto y construye la aplicación
RUN meteor npm install --allow-superuser && \
    meteor build --directory /build --server-only --allow-superuser

# Etapa 2: Imagen ligera para producción
FROM node:20-slim

# Crear un usuario no root para la imagen final
RUN useradd -m appuser

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /build /app

# Establecer permisos adecuados
RUN chown -R appuser:appuser /app && \
    chmod -R 755 /app

# Cambiar a usuario no root
USER appuser

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "main.js"]
