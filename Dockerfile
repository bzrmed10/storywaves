FROM bitnami/node:18.20.4-debian-12-r12 as build
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app 
RUN npm run build --prod

FROM nginx:stable-perl
COPY --from=build /app/dist/google-ai-gemini-angular /usr/share/nginx/html