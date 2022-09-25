# DOCKERFILE

FROM node:14

RUN mkdir -p /app/code

WORKDIR /app/code

RUN npm install nodemon -g

#COPY&INSTALL PROJECT
COPY . .

RUN npm install
RUN ./node_modules/typescript/bin/tsc


#EXPOSE 10010
CMD nodemon /app/code/out/index.js
