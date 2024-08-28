# Etapa de construcción
FROM node:14 AS builder

# Establecer variables de entorno necesarias
ENV NODE_ENV=production

# Instalar dependencias necesarias para Meteor
RUN apt-get update && \
    apt-get install -y curl --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar npm 6.x
RUN npm install -g npm@6

# Crear un usuario no root
RUN useradd -m -d /home/meteoruser meteoruser

# Cambiar a usuario no root
USER meteoruser

# Establecer el directorio de trabajo
WORKDIR /home/meteoruser/app

# Descargar e instalar Meteor 2.12
RUN curl -sSL https://install.meteor.com/?release=2.12 | sh

# Añadir Meteor al PATH
ENV PATH="/home/meteoruser/.meteor:${PATH}"

# Verificar la instalación de Meteor
RUN echo "PATH: $PATH" && \
    echo "Meteor Directory Contents:" && \
    ls -la /home/meteoruser/.meteor && \
    echo "Meteor Binary:" && \
    which meteor && \
    meteor --version || (echo "Meteor installation failed" && exit 1)

# Copiar los archivos del proyecto
COPY --chown=meteoruser:meteoruser . .

# Crear el directorio de salida para la construcción
RUN mkdir -p /home/meteoruser/build

# Instalar dependencias y construir la aplicación
RUN meteor npm install --production --allow-superuser && \
    meteor build --directory /home/meteoruser/build --server-only --allow-superuser

# Imagen final para producción con Node.js 14.x
FROM node:14-alpine

# Establecer el entorno de producción
ENV NODE_ENV=production

# Crear un usuario no root para la imagen final
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos construidos desde la etapa anterior
COPY --from=builder /home/meteoruser/build/bundle /app

# Establecer permisos adecuados
RUN chown -R appuser:appgroup /app && chmod -R 755 /app

# Cambiar a usuario no root
USER appuser

# Exponer el puerto usado en Fly.io (8080 por defecto)
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "main.js"]
