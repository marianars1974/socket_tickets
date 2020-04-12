//
//comoando para estalcer

var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', () => {

    console.log('Usuario conectado');

});

socket.on('estadoActual', (tktActual) => {
    label.text(tktActual.actual);
    console.log(`tkt Actual ${JSON.stringify(tktActual)}`);

});

socket.on('disconnect', () => {
    console.log('Usuario desconectado');
});

$('button').on('click',function(){

    socket.emit('siguienteTicket', null, function(sigTkt){

        label.text(sigTkt);
    });
    
});