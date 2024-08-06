# Usar uma imagem oficial do Node.js como a base
FROM node:22.5.1

# Definir o diretório de trabalho no container
WORKDIR /src/app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para o diretório de trabalho
COPY . .

# Tornar o script executável
RUN chmod +x bin/sh/start.sh

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar o script de inicialização
CMD ["sh", "./bin/sh/start.sh"]