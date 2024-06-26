FROM node:18-bullseye-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build


