FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy the compiled files to the Nginx content directory
COPY --from=build /app/dist /usr/share/nginx/html

# Port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
