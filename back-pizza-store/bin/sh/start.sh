#!/bin/sh
echo "Iniciando o servidor..."

# Iniciar o contêiner do PostgreSQL
docker run -d --name db \
  -e POSTGRES_USER=${POSTGRES_USER} \
  -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
  -e POSTGRES_DB=${POSTGRES_DB} \
  -p 5432:5432 \
  postgres:16.2-alpine3.19

# Esperar pelo PostgreSQL estar disponível
until nc -z -v -w30 db 5432
do
  echo "Postgres está indisponível - aguardando"
  sleep 5
done
echo "Postgres está disponível - continuando"


npm run migrate
npm start
node src/server.js

tail -f /dev/null