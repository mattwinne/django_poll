# Django/React Polling Application
About
-----
Web application that allows users to create and vote in polls. Provides an efficient template for 
developing a containerized full stack web application with core features such as user account management, 
authentication, front-end state management and a continous integration pipeline with automated build, 
tests, and linting. Deployed via AWS EC2 instance, docker-compose, gunicorn, and nginx using CORS headers and HTTPS.

Installation, Build, and Run
-----
Clone repo and install docker.

##### Create environment 
Make .env in root folder with the following:

DB_NAME=name
DB_PASSWORD=pass
DB_USER=user
DB_HOST=host
DB_PORT=5432
APP_SERVER=gunicorn (alternate: uwsgi)
SECRET_KEY=(create your own 32+ character key)
SIGNING_KEY=(create your own 32+ character key)
DEBUG=1 (alternate: 0 for production


##### Create database directory
`mkdir -p ~/srv/docker/template-postgres/data` to create directory for docker postgres volume

##### Build containers
`docker-compose build` for development
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml build` for production

##### Run containers   
Set .env DEBUG value to 1
`docker-compose up` for development

Set .env DEBUG value to 0
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up` for production

