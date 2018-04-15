FROM node:9

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

RUN yarn build || true

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start:node"]
