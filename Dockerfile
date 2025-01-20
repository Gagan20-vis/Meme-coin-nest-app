FROM node:20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile
RUN yarn prisma:generate

COPY . .

RUN yarn build

FROM node:20

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
