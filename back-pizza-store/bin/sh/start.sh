#!/bin/sh
# start.sh
# Executar migrações
npm run migrate

# Iniciar o servidor
node src/server.js