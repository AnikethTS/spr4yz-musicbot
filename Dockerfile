# Use latest Node LTS
FROM node:22

# Install Python (needed for yt-dlp-exec)
RUN apt-get update && apt-get install -y python3 python3-pip

# Install ffmpeg
RUN apt-get install -y ffmpeg

# Set working directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port (for keep-alive express server)
EXPOSE 3000

# Start the bot
CMD ["npm", "start"]