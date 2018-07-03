FROM node:8.8

WORKDIR /src

# Copy package.json && install dependencies
# Prevents dependencies re-install for every image re-build
# So this stage is only re-run if package.json is updated
COPY package.json /src

RUN npm install

RUN npm install -g nodemon

COPY . /src

# Mount a volume on the the node_modules directory to bind it at run time
VOLUME ["/src/node_modules"]

EXPOSE 8080

CMD [ "node", "index.js" ]
