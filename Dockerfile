FROM node:lts-buster
RUN apt-get update && apt-get install -y ffmpeg imagemagick webp
RUN apt-get upgrade -y
RUN rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json .
RUN npm ci
RUN npm install -g qrcode-terminal
COPY . .
EXPOSE 5000
CMD ["pm2 start", "src/index.js"]