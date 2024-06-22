# Don't change this [ /GiftedTech/ ] name!
# Change from below link, else bot wil not work!


FROM node:20

RUN git clone https://github.com/ac-ee/V5 /root/Gifted

# Clear npm cache and remove node_modules directories
RUN npm cache clean --force
RUN rm -rf /root/Gifted/node_modules

# Install dependencies
WORKDIR /root/Gifted
RUN npm install

# Add additional Steps To Run...
EXPOSE 5000
CMD ["npm","start" ]
