This project for example how to use queue in nest
 - rabbitmq
 - pg-boss
 - bulljs
 
`sample.controller.ts` has examples for publish message from producers

example for using websocket gateway in consumer

Run project:
 - copy `.env.example` to `.env`
 - `docker-compose up`
 - `npm i`
 - `npm run dev`
 - `npm run server`
 - `npm run queue`
 
Rabbitmq - `http://localhost:${APP_PORT}/rabbitmq`  
Bulljs - `http://localhost:${APP_PORT}/bulljs`  
PgBoss - `http://localhost:${APP_PORT}/pgboss`  