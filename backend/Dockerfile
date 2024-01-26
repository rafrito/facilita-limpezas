FROM node:20
ENV NODE_ENV=production
WORKDIR /usr/src/backend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# CMD ["npm", "start"]
