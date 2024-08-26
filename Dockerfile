# Etapa 1: Construcción
FROM node:20-slim AS builder

# Instala dependencias necesarias para Meteor y limpia después
RUN apt-get update && apt-get install -y --no-install-recommends curl && \
    curl https://install.meteor.com/ | sh && \
    apt-get purge --auto-remove -y curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Añadir Meteor al PATH usando la ruta donde se instala
ENV PATH="/root/.meteor:$PATH"

# Crear un usuario no root
RUN useradd -m -d /home/meteoruser meteoruser

# Establece el directorio de trabajo
WORKDIR /home/meteoruser/app

# Copia los archivos necesarios con el usuario correcto
COPY --chown=meteoruser:meteoruser . .

# Cambiar a usuario no root
USER meteoruser

# Instala dependencias y compila la aplicación
RUN /root/.meteor/meteor npm install --allow-superuser && \
    /root/.meteor/meteor build --directory /build --server-only --allow-superuser && \
    rm -rf /home/meteoruser/app

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
