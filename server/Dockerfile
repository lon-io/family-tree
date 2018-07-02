FROM node:8.8

WORKDIR /src

ADD package.json /src

RUN npm install

RUN npm install -g nodemon

COPY . /src

CMD [ "node server.js" ]
