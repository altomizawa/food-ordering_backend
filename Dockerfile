# Dockerfile para food-ordering_backend
# Usa imagem oficial do Node.js como base
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta padrão (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]
