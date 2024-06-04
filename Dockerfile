FROM node:lts-alpine3.20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install 
# Copy the rest of the application code
COPY . .
# Generate Prisma Client code
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "start:migrate:prod" ]