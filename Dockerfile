FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm ci && npm cache clean --force

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]