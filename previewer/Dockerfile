FROM node:19-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts;
RUN npm run build
CMD ["npm", "start"]