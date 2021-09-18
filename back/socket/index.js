import {Server} from "socket.io";
import useSoraJS_Server from "./sora.js";

class webSocketService {

    /**
     * create new socket server instance
     * @param httpServer {module:http.Server}
     * @param opt {object: {port: number}|null}
     */
    constructor(httpServer, opt= null) {

        const { emitHelloWorld, onMessage, onDisconnect, onJoinRoom } = useSoraJS_Server()

        this.io = new Server(httpServer)

        this.io.on("connection", (socket) => {

            // log
            console.log(`socket id ${socket.id} is connected`)

            socket.join('public')

            // set emit events
            emitHelloWorld(socket)

            // set on listeners
            onMessage(socket, this.io)
            onJoinRoom(socket, this.io)

            // on disconnect
            onDisconnect(socket)
        })

    }
}

/**
 * create new socket server instance
 * @param httpServer{module:http.Server}
 * @param opt {object: {port: number}|null}
 */
function startServer(httpServer, opt = null) {

    return new webSocketService(httpServer, opt)
}

export {startServer}