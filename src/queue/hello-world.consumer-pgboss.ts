import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as PgBoss from 'pg-boss';
import { configuration } from '../configuration';

@Injectable()
export class HelloWorldConsumerPgboss implements OnModuleInit {
    public static readonly channelName = 'hello-world';

    public async onModuleInit() {
        const boss = new PgBoss(configuration.postgres);
        await boss.start();

        boss.on('error', error => Logger.error(error));
        await boss.subscribe(HelloWorldConsumerPgboss.channelName, job => {
            Logger.log(`Consumer received '${(job.data as any).payload}'`, 'PgBoss');
        });
    }
}
