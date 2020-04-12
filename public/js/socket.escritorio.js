var socket = io();

var searchParam = new URLSearchParams(window.location.search);

if(!searchParam.has('escritorio'))
{
    window.location = 'index.html';
    throw new Error('el escritorio es necesario');
}
var escritorio = searchParam.get('escritorio');

console.log(`Escritorio ${escritorio}`);
//asingar el texto x jquery
//$('h1').text(`Escritorio ${escritorio}`); //no todos los oportan , esta del lado del cliente
$('h1').text('Escritorio' + escritorio);

//listener boton jquery
$('button').on('click',function(){

    socket.emit('atenderTicket', {escritorio: escritorio} , function(Tkt){

        if(Tkt ==="no hay tickes")
        {
            $('small').text(Tkt);
            alert(Tkt);
            return;
        }
        console.log(escritorio,Tkt.numero);
        $('small').text('Ticket ' + Tkt.numero);
    });
    
});

socket.on('connect', () => {

    console.log('Usuario conectado');

});
socket.on('disconnect', () => {
    console.log('Usuario desconectado');
});
/*socket.on('estadoActual', (tktActual) => {
    label.text(tktActual.actual);
    console.log(`tkt Actual ${JSON.stringify(tktActual)}`);

});
*/


