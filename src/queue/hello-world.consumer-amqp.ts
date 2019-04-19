import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp/dist';
import { Connection } from 'amqplib';

@Injectable()
export class HelloWorldConsumerAmqp implements OnModuleInit {
    public static readonly channelName = 'hello-world';

    constructor(
        @InjectAmqpConnection('rabbitmq') private connection: Connection,
    ) {
    }

    public async onModuleInit() {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(HelloWorldConsumerAmqp.channelName, { durable: true });
        await channel.consume(HelloWorldConsumerAmqp.channelName, (msg) => {
            Logger.log(`Consumer received '${msg.content.toString()}'`, 'Rabbitmq');
        }, { noAck: true });
    }
}
