# Base Image
FROM node:20

# Working Directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Expose application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]