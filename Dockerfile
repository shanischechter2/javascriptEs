
FROM node:14

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

