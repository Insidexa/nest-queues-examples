import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './queue/redis-io-adapter';
import { configuration } from './configuration';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useWebSocketAdapter(new RedisIoAdapter(app));

    await app.listen(configuration.appPort);
}

bootstrap();
