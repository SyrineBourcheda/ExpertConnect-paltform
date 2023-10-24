# Stade de construction (builder)
FROM node:16-alpine AS builder
WORKDIR /app
COPY . /app
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration=production

# Stade final
FROM nginx:alpine
COPY --from=builder /app/dist/ci-project /usr/share/nginx/html






