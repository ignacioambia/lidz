# Build the docker image with `npx nx docker-build landing-page`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t landing-page`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system landing && \
          adduser --system -G landing landing

#Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# COPY dist/apps/landing-page landing-page/
COPY dist/landing landing/
COPY package.json landing/
RUN chown -R landing:landing .

# Install serve globally to serve static files
RUN npm install -g serve

# Serve the static files from the browser directory
CMD [ "serve", "-s", "landing/browser", "-l", "3000" ]