FROM node:12, python:3.9


##building out react app
RUN npm install
RUN npm run build


##install python dependencies
RUN pip install -r requirements.txt
