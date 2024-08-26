# Etapa 1: Construcción
FROM node:20-slim AS builder

# Instala dependencias necesarias para Meteor y limpia después
RUN apt-get update && apt-get install -y --no-install-recommends curl && \
    curl https://install.meteor.com/ | sh && \
    apt-get purge --auto-remove -y curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Añadir Meteor al PATH usando la ruta donde se instala automáticamente
ENV PATH="$HOME/.meteor:$PATH"

# Crear un usuario no root
RUN useradd -m meteoruser

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios con el usuario correcto
COPY --chown=meteoruser:meteoruser .meteor /app/.meteor
COPY --chown=meteoruser:meteoruser package*.json /app/

# Cambiar a usuario no root
USER meteoruser

# Instala dependencias y compila la aplicación
RUN meteor npm install --allow-superuser && \
    meteor build --directory /build --server-only --allow-superuser && \
    rm -rf /app

# Etapa 2: Imagen ligera para producción
FROM node:20-alpine

# Crear un usuario no root para la imagen final
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos construidos desde la etapa anterior
COPY --from=builder /build/bundle /app

# Establecer permisos adecuados
RUN chown -R appuser:appgroup /app && \
    chmod -R 755 /app

# Cambiar a usuario no root
USER appuser

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "main.js"]
