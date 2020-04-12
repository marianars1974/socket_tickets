const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl(); //se dispara constructor de la case

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.emit('estadoActual',  {
    actual: ticketControl.getUltimoTkt(),
    ultimos4: ticketControl.getUltimos4()
    } );

    client.on('atenderTicket',(data,callback)=>
    {
        console.log('atenderTicket',data);
        if (!data.escritorio)
        {
            return callback({
                err:true,
                mensaje: 'escritorio necesario'
            });

        }
        
        let resp = ticketControl.atenderTkt(data.escritorio);

        

        callback(resp);
        
        //let respP = ticketControl.ultimos4
        client.broadcast.emit('estadoActual',  {
            actual: ticketControl.getUltimoTkt(),
            ultimos4: ticketControl.getUltimos4()
            } );
        //notificar cambios en los ultimos 4


    });

    client.on('disconnect', () => {

        
        console.log('Usuario desconectado');
    });

       // Escuchar el cliente
    client.on('siguienteTicket', (data,callback) => {

        let siguiente = ticketControl.siguienteTkt();
        callback(siguiente);
       // console.log(callback);

    });

    

});