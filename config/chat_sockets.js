const { Socket } = require('socket.io');

module.exports.chatSockets = function(socketServer){

    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){

        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            
            console.log('socket disconnected!');
        });

        socket.on('join_room',function(data){

            console.log('joining request rec.',data);

            // if chatroom already present then enter else it will create new chatroom
            socket.join(data.chatroom);

            // to show new user has joined in the chat room
            io.in(data.chatroom).emit('user_joined',data);

        });
    });

}