FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .
RUN npm install && npm install -g pm2

COPY . .

EXPOSE 5000

CMD ["pm2-runtime", "pm2.config.js"]
