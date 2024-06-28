FROM node:latest

USER root:root

WORKDIR /usr/src/app

COPY --chown=root:root ./ ./

WORKDIR .

RUN npm install

ENV NODE_ENV=production

ENV NODE_CONFIG_ENV=prod

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
