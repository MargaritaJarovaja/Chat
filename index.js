const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/socket.html');
});
const http = require('http');
const server  = http.createServer(app);
server.listen(3000);
console.log('Kor servern po localhost:3000');

const { Server} = require('socket.io');
const io = new Server (server);


//ansluta connection

io.on('connection', (socket)=> {
    console.log('En klient anslot sig till servern!');
    console.log('Klienten id :' + socket.id);
    socket.user = 'Eget user name';
    console.log('Klientens Anvander namn:'  +socket.user);

    socket.on('disconnect', (socket)=>{
        console.log('En klient har avslutat connection till servern');
    });
    
    socket.on('klientknackning', ()=>{
        console.log('En klient knackade!');
        socket.emit('serverknackning');
    });
    //lysna po handalse meddelande
    socket.on('meddelande', (data)=>{
        console.log('meddelande fron klient: '+ data);
        socket.emit('meddelande', 'servernsidan saga hej po dig!');
    });

    socket.emit('dataFronServern',{sprak:"svenska", text:"Goddag!"});


    //lysna po handelsene chat meddelande
    socket.on('Chat-meddelande',(data)=>{
        console.log(data);
        socket.broadcast.emit('Chat-meddelande',data);
    });
});
