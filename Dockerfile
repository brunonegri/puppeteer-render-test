FROM grafana/docker-puppeteer

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./

RUN sudo service dbus start
RUN npm ci

COPY . .
CMD [ "node", "index.js" ]

