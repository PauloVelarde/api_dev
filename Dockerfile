# Imagen base de Node.js 20
FROM node:20-slim AS builder

# Instalar dependencias necesarias para Meteor
RUN apt-get update && apt-get install -y curl && \
    curl https://install.meteor.com/ | sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Verificar la instalación de Meteor
RUN echo "Verificando instalación de Meteor..." && \
    which meteor && \
    ls -la /root/.meteor || echo "/root/.meteor no encontrado" && \
    chmod +x /root/.meteor/meteor

# Crear un usuario no root
RUN useradd -m -d /home/meteoruser meteoruser

# Establecer el directorio de trabajo
WORKDIR /home/meteoruser/app

# Copiar los archivos del proyecto con los permisos correctos
COPY --chown=meteoruser:meteoruser . .

# Cambiar a usuario no root
USER meteoruser

# Instalar dependencias y construir la aplicación
RUN meteor npm install --allow-superuser && \
    meteor build --directory /build --server-only --allow-superuser

# Imagen final para producción
FROM node:20-alpine

# Crear un usuario no root para la imagen final
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos construidos desde la etapa anterior
COPY --from=builder /build/bundle /app

# Establecer permisos adecuados
RUN chown -R appuser:appgroup /app && chmod -R 755 /app

# Cambiar a usuario no root
USER appuser

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "main.js"]
