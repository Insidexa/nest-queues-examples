import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ transports: 'websocket' })
export class EventGateway {
    @WebSocketServer() public server: Server;
}
