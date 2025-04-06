# Use uma imagem base do Node
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale TODAS as dependências (incluindo devDependencies)
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Gere o Prisma Client (se já não fizer parte do postinstall ou build)
RUN npx prisma generate

# Exponha a porta que a aplicação usa
EXPOSE 3000

# Comando padrão para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]