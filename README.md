# Sistema Backend de Turnos y Reservas

Backend desarrollado con **Node.js, Express, MongoDB, Mongoose, Zod y Socket.IO** para gestionar servicios y reservas.

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* Zod
* Express Handlebars
* Socket.IO
* dotenv

---

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias.

Ejemplo:

```env
PORT=3000
MONGO_URI=tu_conexion_a_mongodb
NODE_ENV=development
```

Iniciar el servidor:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

---

# Servicios

## Obtener servicios

Endpoint:

```http
GET /api/services
```

Devuelve los servicios disponibles junto con información de paginación.

### Filtrar por categoría

```http
GET /api/services?category=Visitas
```

### Filtrar por disponibilidad

```http
GET /api/services?available=true
```

### Paginación

Se pueden utilizar los parámetros `page` y `limit`:

```http
GET /api/services?page=1&limit=2
```

### Ordenamiento

El listado puede ordenarse utilizando `sortBy` y `order`.

Por ejemplo, ordenar por precio de menor a mayor:

```http
GET /api/services?sortBy=price&order=asc
```

Ordenar por precio de mayor a menor:

```http
GET /api/services?sortBy=price&order=desc
```

También se pueden combinar filtros, paginación y ordenamiento:

```http
GET /api/services?category=Reparaciones&available=true&page=1&limit=10&sortBy=price&order=desc
```

### Metadatos de paginación

La respuesta incluye:

* `total`: cantidad total de resultados
* `page`: página actual
* `limit`: cantidad de resultados por página
* `totalPages`: cantidad total de páginas
* `hasPrevPage`: indica si existe una página anterior
* `hasNextPage`: indica si existe una página siguiente
* `prevPage`: número de la página anterior
* `nextPage`: número de la página siguiente

Ejemplo:

```json
{
  "status": "success",
  "payload": [],
  "total": 4,
  "page": 1,
  "limit": 10,
  "totalPages": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

---

# Validación con Zod

La API utiliza **Zod** para validar los datos antes de enviarlos a MongoDB.

Las validaciones se aplican mediante el middleware `validateBody`.

Los datos inválidos generan una respuesta `400` y no continúan hacia la capa de persistencia.

## Crear servicio

```http
POST /api/services
```

Ejemplo válido:

```json
{
  "name": "Instalación de motor",
  "description": "Instalación de motor para portón automático.",
  "duration": 120,
  "price": 3500,
  "category": "Instalaciones",
  "available": true
}
```

## Actualizar servicio

```http
PUT /api/services/:sid
```

Ejemplo:

```json
{
  "price": 4000
}
```

La actualización utiliza un schema parcial, por lo que se pueden modificar solamente los campos necesarios.

## Crear reserva

```http
POST /api/bookings
```

Ejemplo:

```json
{
  "clientName": "Juan Pérez",
  "date": "2026-08-15T15:00:00.000Z",
  "services": []
}
```

## Agregar servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Ejemplo:

```json
{
  "quantity": 1
}
```

La cantidad debe ser un número entero mayor o igual a `1`.

---

# Reservas y relaciones entre colecciones

Las reservas mantienen los servicios como referencias mediante `ObjectId`.

La estructura utilizada es:

```javascript
services: [
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    quantity: Number
  }
]
```

De esta manera, la reserva **no almacena el objeto completo del servicio**.

---

# Populate

Para consultar una reserva junto con la información completa de los servicios asociados:

```http
GET /api/bookings/:bid
```

Ejemplo:

```http
GET /api/bookings/6a790408b5d88d40ebfacd28
```

El endpoint utiliza Mongoose `populate` para reemplazar la referencia del servicio por sus datos completos.

Ejemplo de respuesta:

```json
{
  "status": "success",
  "payload": {
    "_id": "6a790408b5d88d40ebfacd28",
    "clientName": "Juan Pérez",
    "date": "2026-08-15T15:00:00.000Z",
    "services": [
      {
        "service": {
          "_id": "6a78d8bd6e1ad5a42f103b42",
          "name": "Visita técnica",
          "description": "Diagnóstico completo del portón.",
          "duration": 60,
          "price": 1200,
          "category": "Visitas",
          "available": true
        },
        "quantity": 1
      }
    ]
  }
}
```

El `populate` se utiliza únicamente durante la consulta. La reserva continúa almacenando solamente la referencia `ObjectId` del servicio.

---

# Endpoints principales

## Servicios

| Método | Endpoint             | Descripción             |
| ------ | -------------------- | ----------------------- |
| GET    | `/api/services`      | Listar servicios        |
| GET    | `/api/services/:sid` | Obtener servicio por ID |
| POST   | `/api/services`      | Crear servicio          |
| PUT    | `/api/services/:sid` | Actualizar servicio     |
| DELETE | `/api/services/:sid` | Eliminar servicio       |

## Reservas

| Método | Endpoint                           | Descripción                                       |
| ------ | ---------------------------------- | ------------------------------------------------- |
| GET    | `/api/bookings/:bid`               | Obtener reserva con servicios mediante `populate` |
| POST   | `/api/bookings`                    | Crear reserva                                     |
| POST   | `/api/bookings/:bid/services/:sid` | Agregar servicio a una reserva                    |

---

# Vistas

El proyecto también dispone de vistas utilizando Express Handlebars:

```text
/
```

Página principal.

```text
/services
```

Listado de servicios.

```text
/realtime-services
```

Servicios actualizados en tiempo real mediante Socket.IO.

```text
/bookings
```

Listado de reservas.

```text
/bookings/:bid
```

Detalle de una reserva.

---

# Socket.IO

El proyecto utiliza Socket.IO para actualizar los servicios en tiempo real.

Cuando se crea un nuevo servicio, el servidor emite el evento:

```text
serviceCreated
```

Los clientes conectados pueden recibir la actualización automáticamente.

---

# Arquitectura

El proyecto separa las responsabilidades en diferentes capas:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
DAO
  ↓
MongoDB
```

Las validaciones se realizan mediante middleware antes de llegar a la capa de persistencia.

Esto permite mantener separadas las responsabilidades de rutas, validaciones, lógica de negocio y acceso a datos.

---

# Seguridad

El archivo `.env` no debe subirse al repositorio.

Tampoco se debe incluir:

* `node_modules`
* credenciales de MongoDB
* claves privadas
* variables de entorno con información sensible

El proyecto debe utilizar un archivo `.gitignore` para evitar subir estos archivos.

---

# Autor

Proyecto desarrollado como parte de la pre-entrega 8.
Mathias Horvat.
