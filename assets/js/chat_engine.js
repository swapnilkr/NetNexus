class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // io is given globally by cdn of socket.io
        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
        });
    }
}