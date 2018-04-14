FROM node:9-alpine

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./
# If we have the modules, lets copy instead of downloading
COPY .gitignore node_modules ./node_modules/
RUN yarn

COPY . .

RUN yarn build || true

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start:node"]
