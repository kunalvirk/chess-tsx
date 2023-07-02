import { Socket, io } from "socket.io-client";

const URL = 'http://localhost:5000';

export const socket: Socket = io(URL, {
    autoConnect: false
});