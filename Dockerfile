# Imagen base de Node.js 20.16
FROM node:20.16-slim AS builder

# Instalar dependencias necesarias para Meteor 2.12
RUN apt-get update && apt-get install -y curl --no-install-recommends && \
    curl https://install.meteor.com/?release=2.12 | sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Crear el directorio /build y ajustar permisos
RUN mkdir -p /build && chmod 777 /build

# Cambiar a usuario no root
RUN useradd -m -d /home/meteoruser meteoruser
USER meteoruser

# Establecer el directorio de trabajo
WORKDIR /home/meteoruser/app

# Copiar los archivos del proyecto con los permisos correctos
COPY --chown=meteoruser:meteoruser . .

# Instalar dependencias y construir la aplicación
RUN meteor npm install --allow-superuser && \
    meteor build --directory /build --server-only --allow-superuser

# Imagen final para producción con Node.js 20.16
FROM node:20.16-alpine

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