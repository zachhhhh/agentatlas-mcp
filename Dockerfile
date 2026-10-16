FROM node:22-alpine
WORKDIR /app
COPY package.json index.mjs ./
ENTRYPOINT ["node", "index.mjs"]
