FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Get files and install app dependencies
COPY . .
RUN npm ci --ignore-scripts
ENV FLAG=squ1rrel{fake_flag}

EXPOSE 3000
CMD [ "node", "index.js" ]