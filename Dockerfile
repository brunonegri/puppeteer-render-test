FROM ghcr.io/puppeteer/puppeteer:19.7.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
RUN apt-get update -y \ && apt-get -y install xvfb \ && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
COPY . .
CMD [ "node", "index.js" ]

