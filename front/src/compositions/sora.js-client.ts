import socket from "../plugins/socket";

function useSoraJS_Client() {

    const emitMessage = (room, message) => {
        if(message != ""){
            socket.emit('message', message, room)
        }
    }

    const onMessage = (callback: Function) => {
        socket.on('chat message', (message) => {
            callback(message)
        })
    }

    const joinRoom = (room: string) => {
        socket.emit('join room', room)
    }

    return {
        emitMessage,
        onMessage,
        joinRoom
    }

}

export default useSoraJS_Client