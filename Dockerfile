FROM node:20-slim

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
CMD ["node", "index.js"]