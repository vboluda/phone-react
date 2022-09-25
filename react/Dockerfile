FROM ubuntu:20.04

USER root
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl sudo git -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt-get install nodejs -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt update
RUN sudo apt install yarn -y
RUN sudo apt install libudev-dev libusb-1.0-0-dev -y
RUN yarn --version

RUN mkdir /app
WORKDIR /app

COPY . . 
RUN yarn install
RUN NODE_ENV=production yarn build

CMD ["yarn", "start"]