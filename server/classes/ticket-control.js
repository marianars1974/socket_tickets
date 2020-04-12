const fs = require('fs');

class Ticket {

    constructor(numero, escritorio)
    {

        this.numero = numero;
        this.escritorio = escritorio;

    }
}


class TicketControl
{
    constructor()
    {
        this.ultimo = 0;
        this.hoy =new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json'); 

        if(data.hoy===this.hoy)
        {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }
        else
        {
            this.reiniciarConteo(); //es una fun de la clase metodo que se llama cuando se crea.
        }

        console.log(data);
       
       

    }

    siguienteTkt()
    {
        this.ultimo +=1;

        let ticket = new Ticket(this.ultimo,null);

        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket Siguiente ${this.ultimo}`;
    }
    getUltimoTkt()
    {
        return `Ticket Siguiente ${this.ultimo}`;
    }
    getUltimos4()
    {
        return this.ultimos4;
    }
    atenderTkt(escritorio)
    {
        if (this.tickets.length===0)
        {
            return "no hay tickes";
        }
        let numeroTkt = this.tickets[0].numero; // numero del primer elemento
        this.tickets.shift(); //elimina el primer elemento

        let tktAtendido = new Ticket(numeroTkt,escritorio); //tomo tk  a antender (creano la clase)

        this.ultimos4.unshift(tktAtendido); //lo agrega en primer posicion

        if(this.ultimos4.length >4){
            this.ultimos4.splice(-1,1); //borra ultimo elemiento array
        }

        this.grabarArchivo();
        return tktAtendido;

        
    }
    
    reiniciarConteo()
    {
        this.ultimo = 0;
        this.tickets=[];
        this.ultimos4 = [];
        this.grabarArchivo();

      
        console.log( 'se ha inicializado el contador');
    }
    grabarArchivo()
    {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData); //convierte json a string

        fs.writeFileSync('./server/data/data.json',jsonDataString);
    }

}

module.exports =
{
TicketControl

}