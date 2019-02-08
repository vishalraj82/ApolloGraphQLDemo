FROM node:11.9.0-alpine

# ARG INSTALL_DIR=/apollo/graphql/server
ARG INSTALL_DIR

RUN mkdir -p $INSTALL_DIR

WORKDIR $INSTALL_DIR

COPY package.json $INSTALL_DIR/

RUN npm install --quiet --prefix $INSTALL_DIR

COPY . $INSTALL_DIR

# CMD [ "npm", "run", "start" ]
