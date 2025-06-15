FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh .

RUN chmod +x wait-for-it.sh

EXPOSE 3000

CMD ["npm", "start"]