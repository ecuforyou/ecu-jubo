FROM ghcr.io/puppeteer/puppeteer:19.9.0
USER root
WORKDIR /app
# ARG NODE_VERSION=19
# RUN apt-get update -y && \
#     apt-get upgrade -y && \
#     apt-get install -y && \
#     curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - && \
#     apt-get install -y nodejs

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

CMD ["npm", "start"]
