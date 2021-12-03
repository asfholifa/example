FROM docker.art.lmru.tech/img-base-node:node-12 as react-build
WORKDIR /app
COPY . ./
#COPY ../../yarn.lock ./yarn.lock
ARG REACT_APP_HOST
ARG REACT_APP_AUTH_URL
ENV REACT_APP_HOST=$REACT_APP_HOST
ENV REACT_APP_AUTH_URL=$REACT_APP_AUTH_URL
ENV YARN_VERSION 1.22.5
RUN yarn
RUN yarn build