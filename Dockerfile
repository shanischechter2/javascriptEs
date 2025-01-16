# Use a lightweight Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the Node.js server
CMD ["node", "server.js"]

