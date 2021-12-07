let socket = io();
socket.emit('klientknackning');

socket.on('serverknackning', ()=>{
    console.log('Servern knackade tillbaka!');
});

//skicka meddelande
socket.emit('meddelande', 'klienten sager hejsa');

//lysna po handelsen meddelande
socket.on('meddelande', (data)=>{
    console.log('Meddelande fron servern:' + data);
});

socket.on('dataFronServern',(data)=>{
    console.log('Servern skickade text po ' +data.sprak +': ' +data.text);
});
/*
let meddelande = prompt('Skriv nogot');
socket.emit('Chat-meddelande', meddelande);
 //lysna po chat-meddelande
 socket.on('Chat-meddelande', + data);
 */

 window.onload =()=>{
     //output element
     let output = document.getElementById('output');
     document.getElementById('formular').addEventListener('submit',(evt)=> {
         evt.preventDefault();
         let meddelande = document.getElementById('meddelande').value;
         socket.emit('Chat-meddelande', meddelande);
         document.getElementById('meddelande').value = "";
         
         let tid = new Date().toISOString().substr(11,8);
         let html = `<p> Du skrev ( ${tid}):${meddelande}</p>`;
         output.innerHTML = html;
     });

     socket.on('Chat-meddelande',(data)=>{
        let tid = new Date().toISOString().substr(11,8);
        let html = `<p> En annan klient skrev ( ${tid}):${data}</p>`;
        output.innerHTML = html;
     })
 }