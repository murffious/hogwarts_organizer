# base image
FROM node:9.2

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn
ENV REACT_APP_ENV staging


# Install and configure `serve`.
RUN npm install -g serve
CMD serve -s build
EXPOSE 5000

# Install all dependencies of the current project.
COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production