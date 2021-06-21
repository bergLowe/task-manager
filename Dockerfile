FROM node:14.16.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g react-scripts@4.0.3

ADD src /app/src
ADD public /app/public

COPY . ./
EXPOSE 3000
CMD ["npm", "start"]