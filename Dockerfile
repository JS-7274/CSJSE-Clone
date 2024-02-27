# Start with a base Node image
FROM node:latest AS build

# Set the working directory
WORKDIR /build

# Copy package.json and package-lock.json before other files and paste into app folder (inside container)
COPY package.json package.json
COPY package-lock.json package-lock.json

COPY csjse-app/client/package.json client/package.json
COPY csjse-app/client/package-lock.json client/package-lock.json

COPY csjse-app/server/package.json server/package.json
COPY csjse-app/server/package-lock.json server/package-lock.json

# 
RUN npm ci

COPY csjse-app/client/public/ client/public
COPY csjse-app/client/src/ client/src

COPY csjse-app/server/public/ server/public
COPY csjse-app/server/src/ server/src

RUN npm run build
FROM nginx:alpine

#COPY --from=build /build/build /usr/share/nginx/html