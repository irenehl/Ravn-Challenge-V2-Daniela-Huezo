FROM node:19-alpine3.16
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npx prisma generate

RUN chmod +x ./scripts/wait-for-pg.sh
