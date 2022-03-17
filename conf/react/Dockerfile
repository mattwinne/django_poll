FROM node:14-alpine as dev

WORKDIR /tmp
COPY front/package.json /tmp/

ENV NODE_ENV=development
RUN npm config set unsafe-perm true

RUN npm install yarn && \
    yarn global add webpack@5.70.0 && \
    yarn global add webpack-dev-server@4.7.4 && \
    yarn global add eslint@8.11.0 && \
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

FROM dev as serve

ENV NODE_ENV=production

COPY ./front /app/
COPY /conf/react/nginx.conf /app/
COPY /conf/react/webpack.prod.js /app/

RUN yarn run build:prod

FROM nginx:1.21.6-alpine as prod

COPY --from=serve /app/build /app/
COPY --from=serve /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]