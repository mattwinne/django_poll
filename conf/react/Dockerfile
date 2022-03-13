FROM node:14-alpine

WORKDIR /tmp
COPY front/package.json /tmp/

ENV NODE_ENV=development
RUN npm config set unsafe-perm true

RUN npm install yarn && \
    yarn global add webpack@5.70.0 && \
    yarn global add webpack-dev-server@4.7.4 && \
    yarn global add eslint@5.16.0 && \
    yarn install

RUN mv /tmp/node_modules /
ENV NODE_PATH=/node_modules

WORKDIR /app

# So docker is not being run as a root user
RUN chown -R node:node /app

COPY /front/package.json /app/
COPY /front/.eslintrc.json /app/

COPY /conf/react/webpack.dev.js /app/
COPY /conf/react/webpack.common.js /app/