
ARG NODE_VERSION
FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./Frontend/ ./

RUN npm install
RUN npm run build

CMD npm run start-prod
