import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { EventGateway } from './queue/event.gateway';
import { AmqpModule } from 'nestjs-amqp/dist';
import { configuration } from './configuration';

@Module({
    imports: [
        AmqpModule.forRoot(configuration.rabbitmq),
    ],
    controllers: [
        SampleController,
    ],
    providers: [
        EventGateway,
    ],
})

export class AppModule {
}
