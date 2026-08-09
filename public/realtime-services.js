const socket = io();

socket.on('connect', () => {
    console.log(`Conectado al servidor: ${socket.id}`);
});

// Escuchar la lista de servicios
socket.on('servicesUpdated', (services) => {
    const container = document.getElementById('services-container');

    container.innerHTML = '';

    services.forEach(service => {
        container.innerHTML += `
            <article>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <p><strong>Precio:</strong> $${service.price}</p>
                <p><strong>Duración:</strong> ${service.duration} min</p>
            </article>
        `;
    });
});