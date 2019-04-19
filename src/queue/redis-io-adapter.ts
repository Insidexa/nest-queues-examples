import { IoAdapter } from '@nestjs/websockets';
import * as redisIoAdapter from 'socket.io-redis';
import { configuration } from '../configuration';

const redisAdapter = redisIoAdapter(configuration.redis);

export class RedisIoAdapter extends IoAdapter {
    public createIOServer(port: number, options?: any): any {
        const server = super.createIOServer(port, options);
        server.adapter(redisAdapter);

        return server;
    }
}
