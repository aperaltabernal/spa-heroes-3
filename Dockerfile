ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}

ENV PORT_PROD=5050

WORKDIR /react-heroes

COPY package*.json ./
COPY index.html ./
COPY vite.config.js ./
COPY ./public ./public
COPY ./src ./src

RUN npm install \ 
    && npm install vite \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

EXPOSE $PORT_PROD

CMD serve -l $PORT_PROD dist