var socket = io();

var labelTkt1 = $('#lblTicket1');
var labelTkt2 = $('#lblTicket2');
var labelTkt3 = $('#lblTicket3');
var labelTkt4 = $('#lblTicket4');

var labelEsc1 = $('#lblEscritorio1');
var labelEsc2 = $('#lblEscritorio2');
var labelEsc3 = $('#lblEscritorio3');
var labelEsc4 = $('#lblEscritorio4');

var lblTickets = [labelTkt1,labelTkt2,labelTkt3,labelTkt4];
var lblEscritorios = [labelEsc1,labelEsc2,labelEsc3,labelEsc4];


socket.on('connect', () => {

console.log('Usuario conectado');



});
socket.on('disconnect', () => {
    console.log('Usuario desconectado');
});

socket.on('estadoActual', (resp) => {
    
  /*  var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    */
    actualizaHtml(resp.ultimos4);
    //label.text(tktActual.actual);
    console.log(resp);

});

/*socket.on('estadoPublico', (ultimos4) => {
    $('#lblTicket1').text('Ticket Nro' + ultimos4[0].numero);
    console.log(`tkt Actual ${JSON.stringify(tktActual)}`);

});
*/
function actualizaHtml(ultimos4)
{
    for (var i = 0; i < ultimos4.length; i++) {
        var tkt = ultimos4[i].numero;
        var esc = ultimos4[i].escritorio;
        lblTickets[i].text('Ticket '+ tkt);
        lblEscritorios[i].text('Escritorio ' + esc);
    }

}
