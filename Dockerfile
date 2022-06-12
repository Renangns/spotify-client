FROM node:lts as angular

WORKDIR /home/node/spotify-client

COPY package.json /home/node/spotify-client

RUN chown node:node /home/node/spotify-client

RUN npm install
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list
RUN apt-get update && apt-get install --no-install-recommends -y google-chrome-stable
RUN npm install -g @angular/cli

USER node
EXPOSE 4200
EXPOSE 9876

CMD ["npm", "start"]
