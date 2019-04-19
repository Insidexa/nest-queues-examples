import { Controller, Get } from '@nestjs/common';

import * as Bull from 'bull';
import { HelloWorldConsumerBull } from './queue/hello-world.consumer-bull';
import { HelloWorldConsumerPgboss } from './queue/hello-world.consumer-pgboss';
import { HelloWorldConsumerAmqp } from './queue/hello-world.consumer-amqp';
import { InjectAmqpConnection } from 'nestjs-amqp/dist';
import { Connection } from 'amqplib';
import * as PgBoss from 'pg-boss';
import { configuration } from './configuration';

@Controller()
export class SampleController {
    constructor(
        @InjectAmqpConnection(configuration.rabbitmq.name) private readonly amqp: Connection,
    ) {
    }

    @Get('bulljs')
    public async bulljs() {
        const bullProducer = new Bull(HelloWorldConsumerBull.channelName);
        await bullProducer.add({ payload: 'bulljs' });
        await bullProducer.close();
    }

    @Get('pgboss')
    public async pgboss() {
        const boss = new PgBoss(configuration.postgres);
        await boss.start();
        await boss.publish(HelloWorldConsumerPgboss.channelName, {payload: 'pg-boss'});
    }

    @Get('rabbitmq')
    public async rabbitmq() {
        const rabbitmqProducer = await this.amqp.createChannel();
        await rabbitmqProducer.assertQueue(HelloWorldConsumerAmqp.channelName, { durable: true });
        await rabbitmqProducer.sendToQueue(HelloWorldConsumerAmqp.channelName, Buffer.from('rabbitmq'));
        await rabbitmqProducer.close();
    }
}
