# Usar uma imagem oficial do Node.js como a base
FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /src/app

# Instalar dependências do sistema (incluindo netcat)
RUN apt-get update && apt-get install -y netcat-traditional

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para o diretório de trabalho
COPY . .

# Tornar o script executável
RUN chmod +x bin/sh/start.sh

# Expor a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para rodar o script de inicialização
CMD ["sh", "./bin/sh/start.sh"]