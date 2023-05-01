FROM ghcr.io/puppeteer/puppeteer:19.9.1

USER root

RUN apt-get update
RUN apt-get install -y ca-certificates fonts-liberation libasound2 \
  libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 \
  libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
  libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
  libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
  lsb-release wget xdg-utils \
  libfontenc1 xfonts-encodings xfonts-utils xfonts-base xfonts-75dpi \
  fonts-nanum fonts-nanum-coding fonts-nanum-extra

WORKDIR /home/pptruser

COPY package.json package-lock.json tsconfig.json ./
RUN npm install
RUN node node_modules/puppeteer/install.js
RUN mkdir public
COPY . .

RUN npm run build
CMD ["npm", "start"]
