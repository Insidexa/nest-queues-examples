import { Injectable } from '@nestjs/common';
import { HelloWorldConsumerBull } from './hello-world.consumer-bull';
import * as Redis from 'ioredis';
import * as Bull from 'bull';

@Injectable()
export class RedisReusableConnection {
    private client = new Redis();
    private subscriber = new Redis();
    private queueOptions: Bull.QueueOptions = {
        createClient: (type: string) => {
            switch (type) {
                case 'client':
                    return this.client;
                case 'subscriber':
                    return this.subscriber;
                default:
                    return new Redis();
            }
        },
    };

    public queue(name: string, options?: Bull.QueueOptions): Bull.Queue {
        return new Bull(HelloWorldConsumerBull.channelName, {
            ...options,
            ...this.queueOptions,
        });
    }
}