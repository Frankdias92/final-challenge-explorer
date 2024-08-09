#!/bin/sh
echo "Iniciando o servidor..."

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