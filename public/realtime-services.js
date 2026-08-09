const socket = io();

socket.on('connect', () => {
    console.log(`Conectado al servidor: ${socket.id}`);
});

// Escuchar cuando se crea un nuevo servicio
socket.on('serviceCreated', (service) => {
    console.log('Nuevo servicio recibido:', service);

    const container = document.getElementById('services-container');

    if (!container) {
        return;
    }

    container.innerHTML += `
        <article>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p><strong>Precio:</strong> $${service.price}</p>
            <p><strong>Duración:</strong> ${service.duration} min</p>
            <p><strong>Categoría:</strong> ${service.category}</p>
            <p><strong>Disponible:</strong> ${service.available ? 'Sí' : 'No'}</p>
        </article>
    `;
});


