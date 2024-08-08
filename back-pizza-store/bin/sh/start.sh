#!/bin/sh
echo "Iniciando os serviços Docker..."
docker-compose up -d --build

# Esperar pelo PostgreSQL estar disponível
until nc -z -v -w30 db 5432
do
  echo "Postgres está indisponível - aguardando"
  sleep 5
done
echo "Postgres está disponível - continuando"

# Executar migrações
npm run migrate

# Iniciar o servidor
node src/server.js