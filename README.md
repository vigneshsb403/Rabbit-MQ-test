# Rabbit-MQ-test
## Steps
```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management //make sure you have docker installed.
```
this will create an rabbit mq dashboard in ` http://localhost:15672/ ` you can login with default credentials `guest:guest`.

```
python3 -m pip install pika --upgrade
```
this is to setup the send.py
```
// npm requirements
npm install amqplib
npm install express
npm install websocket
```


