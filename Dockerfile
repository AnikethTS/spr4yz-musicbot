# Use Node 22 (required for @discordjs/voice)
FROM node:22

# Install Python + build tools + FFmpeg
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-is-python3 \
    ffmpeg \
    make \
    g++ \
    && apt-get clean

# Set working directory
WORKDIR /app

# Install dependencies (do this before copying full project)
COPY package*.json ./
RUN npm install

# Copy rest of project
COPY . .

EXPOSE 3000

CMD ["npm", "start"]