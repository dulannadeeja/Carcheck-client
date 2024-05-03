# step 1 - build the react app
FROM node:alpine3.18 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# Install TypeScript globally
RUN npm install -g typescript
RUN npm run build

# step 2 - build the nginx server
FROM nginx:1.23-alpine as prod
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]