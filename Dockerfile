FROM node:20-slim

RUN apt-get update -y && \
    apt-get install -y procps && \
    npm install -g @nestjs/cli@10.2.0


WORKDIR /home/node/app

USER node

CMD [ "tail", "-f","/dev/null"]