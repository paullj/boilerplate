# Build stage 1.
# This state builds our app and produces an intermediate Docker image containing the compiled JavaScript code.
FROM mhart/alpine-node:12

WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
ENV NODE_ENV=production
RUN yarn run build

# Build stage 2.
# This stage pulls the compiled JavaScript code from the stage 1 intermediate image.
# This stage builds the final Docker image that we'll use in production.
FROM mhart/alpine-node:12

WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=0 app/public public/
EXPOSE 5000
CMD yarn start --host 0.0.0.0