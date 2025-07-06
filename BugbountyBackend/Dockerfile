# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy source files
COPY . .

# Expose port (adjust as per your server’s config)
EXPOSE 3001

# Run server
CMD ["npm", "start"]
