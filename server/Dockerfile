FROM node:18-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN if [ "$NODE_ENV" = "development" ] && [ -f .env.local ]; then cp .env.local .env; fi && \
    npm install --legacy-peer-deps


COPY . .

RUN npx prisma generate

EXPOSE 8000

CMD ["npm", "run", "start"]