FROM node:21

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY back-end/package*.json ./back-end/
RUN cd ./back-end && npm install
COPY front-end/package*.json ./front-end/
RUN cd ./front-end && npm install

# Copy code
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:backend:prod"]
