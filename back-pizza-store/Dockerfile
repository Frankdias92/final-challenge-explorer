FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /src/app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expor a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para rodar o script de inicialização
CMD ["npm", "start"]