# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm i
COPY . /app
RUN  npm run build -w=fe

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/fe/dist/ /usr/share/nginx/html