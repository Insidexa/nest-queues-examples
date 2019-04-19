import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RedisReusableConnection } from './redis-reusable-connection';
import { EventGateway } from './event.gateway';

@Injectable()
export class HelloWorldConsumerBull implements OnModuleInit {
    public static readonly channelName = 'hello-world';

    constructor(
        private queueMaker: RedisReusableConnection,
        private ws: EventGateway,
    ) {
    }

    public async onModuleInit() {
        const consumer = this.queueMaker.queue(HelloWorldConsumerBull.channelName);

        consumer.process(async job => {
            this.ws.server.emit('event-name', job.data.payload);
            Logger.log(`Consumer received '${job.data.payload}'`, 'Bull');
        });
    }
}
