# Rabbit-MQ-test
## Installation Steps
⚠️ Make sure you have docker installed.
```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```
this will create an rabbit mq dashboard in ` http://localhost:15672/ ` you can login with default credentials `guest:guest`.
### Python requirements:
```
python3 -m pip install pika --upgrade
```

### Node requirements:
```
npm install amqplib
npm install express
npm install websocket
```
## Running the server:
```
node server.js
```
and then visit `index.html` page.

run send file using:
```
python3 send.py
```

