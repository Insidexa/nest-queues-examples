import { config } from 'dotenv';
config();

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HelloWorldConsumerBull } from './hello-world.consumer-bull';
import { RedisReusableConnection } from './redis-reusable-connection';
import { HelloWorldConsumerPgboss } from './hello-world.consumer-pgboss';
import { EventGateway } from './event.gateway';
import { RedisIoAdapter } from './redis-io-adapter';
import { AmqpModule } from 'nestjs-amqp';
import { HelloWorldConsumerAmqp } from './hello-world.consumer-amqp';
import { configuration } from '../configuration';

@Module({
    imports: [
        AmqpModule.forRoot(configuration.rabbitmq),
    ],
    providers: [
        RedisReusableConnection,
        HelloWorldConsumerAmqp,
        HelloWorldConsumerBull,
        HelloWorldConsumerPgboss,
        EventGateway,
    ],
})
class QueueModule {
}

async function bootstrap() {
    const app = await NestFactory.create(QueueModule);
    app.useWebSocketAdapter(new RedisIoAdapter(app));
    await app.init();
}

bootstrap();
