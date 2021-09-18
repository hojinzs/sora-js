function useSoraJS_Server() {

    /**
     * Hello World. 테스트용 메시지 전송
     * @param socket
     */
    const emitHelloWorld = (socket) => {
        console.log('emit message "hello word"')
        socket.emit('hello', "hello word")
    }

    /**
     * @param socket
     */
    const onDisconnect = (socket) => {
        socket.on('disconnect', () => {
            console.log(`user '${socket.id}' disconnected`)
        })
    }

    const onMessage = (socket, io) => {
        console.log("listen event 'message' ")
        socket.on('message', (message, room) => {

            room = room || 'public'

            console.log(` user '${socket.id}' send message to ${room} => ${message}`)
            io.to(room).emit('chat message', message)
        })
    }

    const onJoinRoom = (socket, io) => {
        socket.on('join room', (room) => {
            socket.join(room)
            console.log(`> user '${socket.id}' join the room => ${room}`)
            console.log(`> rooms => ${socket}`)
            io.to(room).emit(` "user '${socket.id}' join the room => ${room}" `)
        })
    }

    return {
        emitHelloWorld,
        onDisconnect,
        onMessage,
        onJoinRoom,
    }

}

export default useSoraJS_Server