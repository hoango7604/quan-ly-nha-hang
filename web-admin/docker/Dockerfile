# Multi-stage Build. See: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#use-multi-stage-builds
FROM node:8-alpine as build

# Install tools required for project
RUN apk add --update --virtual .dev-dep git openssh build-base ca-certificates python perl openssh-client gnupg netcat-openbsd

# This layer is only re-built when package.json is updated
RUN mkdir -m 777 -p /usr/src
COPY package.json /usr/src
WORKDIR /usr/src
RUN yarn global add tiny-cdn --production --ignore-engines && yarn cache clean

# Copy the entire project
# This layer is rebuilt when a file changes in the project directory
COPY build .

# Uninstall development dependencies and clear caches to keep the image tiny.
RUN rm -rf /var/lib/apk/lists/* && \
		rm /var/cache/apk/* && \
		apk del .dev-dep

# This results in a single layer image
FROM node:8-alpine
COPY --from=build /usr/src /usr/src
CMD ["tiny-cdn", "run", "-e", "-c", "-p=80", "-s=./", "-d=/usr/tmp"]