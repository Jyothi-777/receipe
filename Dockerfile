# 1. Use official Node.js image
FROM node:18

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy rest of the app source code
COPY . .

# 5. Expose the port your app runs on
EXPOSE 3000

# 6. Start the React app
CMD ["npm", "start"]
