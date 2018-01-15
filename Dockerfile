# Pull base image.
FROM node:alpine

# Set Work Dir
WORKDIR /app

# Copy files to install
ADD ./bin/ /app/bin/
ADD ./data/ /app/data/
ADD ./public/ /app/public/
ADD ./routes/ /app/routes/
ADD ./views/ /app/views/
ADD ./app.js /app
ADD ./package.json /app
ADD ./package-lock.json /app

#Install node modules
RUN cd /app && \
    npm install

# Config setup
RUN mkdir -p config/ && \
    touch config/slack.json && \
    touch config/recaptcha.json && \
    touch feature-toggles.json

# Populate Config
RUN echo '{"webhookuri": "webhookuri","channel": "#channel","username": "username"}' > config/slack.json && \
    echo '{"secret" : "secret","public": "secret"}' > config/recaptcha.json && \
    echo '{"atelierState": "post"}' > config/feature-toggles.json

# Expose ports
EXPOSE 3000

#Run on build
CMD [ "npm", "start" ]