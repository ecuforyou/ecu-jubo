FROM node:19-alpine
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build
CMD ["npm", "start"]