const socket = io();

socket.on('serviceCreated', (service) => {
    console.log('Nuevo servicio recibido:', service);
});