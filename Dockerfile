FROM node:9-alpine

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

RUN yarn build || true

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start:node"]
