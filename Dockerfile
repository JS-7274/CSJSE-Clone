# Start with a base Node image
FROM node:20-alpine

# Copy package.json and package-lock.json before other files and paste into app folder (inside container)
COPY package*.json /csjse-app/
# Copy client directory into app folder (inside container)
COPY csjse-app/client /csjse-app/
# Copy server directory into app folder (inside container)
COPY csjse-app/server /csjse-app/

# Set the working directory
WORKDIR /CSJSE-Senior-Project

# Install dependencies
#RUN npm install

# Copy over the rest of the app files
#COPY . .

# Build for production
#RUN npm run build

# Expose the port the app runs on
#EXPOSE 3000 

# Set the command to start the node server
CMD ["node", "server.js"]
