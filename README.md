# Sistema Backend de Turnos y Reservas

Backend desarrollado con **Node.js, Express, MongoDB, Mongoose, Zod, Express Handlebars y Socket.IO** para gestionar servicios y reservas.

El proyecto implementa una arquitectura por capas, validación de datos, persistencia en MongoDB, relaciones entre servicios y reservas mediante `ObjectId`, `populate` y actualización de información en tiempo real mediante Socket.IO.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- Express Handlebars
- Socket.IO
- dotenv

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

> El archivo `.env` contiene información sensible y no debe subirse al repositorio.

Iniciar el servidor:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

---

# Variables de entorno

El proyecto utiliza variables de entorno para configurar el servidor y la conexión con MongoDB.

Las variables utilizadas son:

```env
PORT=3000
MONGO_URI=tu_conexion_a_mongodb
NODE_ENV=development
```

También se incluye un archivo `.env.example` como referencia:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
NODE_ENV=development
```

El archivo `.env` se encuentra excluido del repositorio mediante `.gitignore`.

---

# Servicios

Los servicios representan las prestaciones que pueden ser asociadas a una reserva.

## Obtener servicios

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

Ordenar por precio de menor a mayor:

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

- `total`: cantidad total de resultados.
- `page`: página actual.
- `limit`: cantidad de resultados por página.
- `totalPages`: cantidad total de páginas.
- `hasPrevPage`: indica si existe una página anterior.
- `hasNextPage`: indica si existe una página siguiente.
- `prevPage`: número de la página anterior.
- `nextPage`: número de la página siguiente.

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

## Crear servicio

```http
POST /api/services
```

Ejemplo:

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

---

## Obtener servicio por ID

```http
GET /api/services/:sid
```

Ejemplo:

```http
GET /api/services/6a78d8bd6e1ad5a42f103b42
```

---

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

---

## Eliminar servicio

```http
DELETE /api/services/:sid
```

Elimina el servicio indicado mediante su ID.

---

# Validación con Zod

La API utiliza **Zod** para validar los datos antes de enviarlos a MongoDB.

Las validaciones se aplican mediante el middleware:

```text
validateBody
```

Los datos inválidos generan una respuesta `400` y no continúan hacia la capa de persistencia.

Ejemplo de respuesta ante datos inválidos:

```json
{
  "status": "error",
  "message": "Datos inválidos",
  "errors": []
}
```

---

# Reservas

Las reservas permiten asociar servicios a un cliente junto con una fecha determinada.

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

---

## Obtener reserva por ID

```http
GET /api/bookings/:bid
```

Ejemplo:

```http
GET /api/bookings/6a790408b5d88d40ebfacd28
```

Este endpoint devuelve la reserva junto con los servicios asociados mediante `populate`.

---

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

Si el servicio ya se encuentra dentro de la reserva, se incrementa su cantidad.

Si no existe, se agrega como un nuevo servicio.

---

## Actualizar cantidad de un servicio

```http
PUT /api/bookings/:bid/services/:sid
```

Ejemplo:

```json
{
  "quantity": 5
}
```

Permite modificar la cantidad de un servicio que ya se encuentra asociado a la reserva.

La cantidad debe ser un número entero mayor o igual a `1`.

---

## Eliminar un servicio de una reserva

```http
DELETE /api/bookings/:bid/services/:sid
```

Elimina el servicio indicado de la reserva.

---

## Eliminar una reserva

```http
DELETE /api/bookings/:bid
```

Elimina la reserva completa.

---

# Relaciones entre colecciones

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

De esta manera, la reserva **no almacena el objeto completo del servicio**, sino una referencia al documento correspondiente.

Ejemplo de cómo se almacena la relación:

```json
{
  "services": [
    {
      "service": "6a78d8bd6e1ad5a42f103b42",
      "quantity": 5
    }
  ]
}
```

---

# Populate

Para consultar una reserva junto con la información completa de los servicios asociados se utiliza Mongoose `populate`.

Endpoint:

```http
GET /api/bookings/:bid
```

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

El `populate` se utiliza durante la consulta para obtener la información completa del servicio.

La reserva continúa almacenando únicamente la referencia `ObjectId` del servicio en MongoDB.

---

# Endpoints principales

## Servicios

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET | `/api/services` | Listar servicios |
| GET | `/api/services/:sid` | Obtener servicio por ID |
| POST | `/api/services` | Crear servicio |
| PUT | `/api/services/:sid` | Actualizar servicio |
| DELETE | `/api/services/:sid` | Eliminar servicio |

## Reservas

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET | `/api/bookings/:bid` | Obtener reserva con servicios mediante `populate` |
| POST | `/api/bookings` | Crear reserva |
| POST | `/api/bookings/:bid/services/:sid` | Agregar servicio a una reserva |
| PUT | `/api/bookings/:bid/services/:sid` | Actualizar cantidad de un servicio |
| DELETE | `/api/bookings/:bid/services/:sid` | Eliminar un servicio de una reserva |
| DELETE | `/api/bookings/:bid` | Eliminar una reserva |

---

# Vistas

El proyecto también dispone de vistas utilizando **Express Handlebars**.

## Página principal

```text
/
```

Página principal del proyecto.

## Servicios

```text
/services
```

Muestra el listado de servicios.

## Servicios en tiempo real

```text
/realtime-services
```

Permite visualizar los servicios y recibir actualizaciones mediante Socket.IO sin necesidad de recargar manualmente la página.

## Reservas

```text
/bookings
```

Muestra el listado de reservas.

## Detalle de una reserva

```text
/bookings/:bid
```

Muestra la información de una reserva y sus servicios asociados.

---

# Socket.IO

El proyecto utiliza **Socket.IO** para proporcionar comunicación en tiempo real entre el servidor y los clientes conectados.

La vista:

```text
/realtime-services
```

permite visualizar actualizaciones de servicios en tiempo real.

Cuando se crea un nuevo servicio, el servidor emite el evento:

```text
serviceCreated
```

Los clientes conectados pueden recibir la actualización automáticamente sin necesidad de recargar la página.

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

### Routes

Definen los endpoints disponibles de la API.

### Controllers

Reciben las solicitudes HTTP, ejecutan la lógica correspondiente y construyen las respuestas.

### Services

Contienen la lógica de negocio de la aplicación.

### Repositories

Actúan como intermediarios entre la lógica de negocio y la capa de acceso a datos.

### DAO

Se encargan de interactuar directamente con los modelos de MongoDB mediante Mongoose.

### MongoDB

Es la base de datos utilizada para persistir servicios y reservas.

### Validaciones

Las validaciones se realizan mediante middleware y Zod antes de llegar a la capa de persistencia.

Esta separación permite mantener organizadas las responsabilidades y facilita futuras modificaciones del proyecto.

---

# Estructura del proyecto

La estructura general del proyecto se organiza de la siguiente manera:

```text
src/
├── config/
├── controllers/
├── dao/
│   └── mongo/
├── data/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── validations/
├── views/
│   └── layouts/
└── public/
    ├── css/
    └── js/
```

Además, en la raíz del proyecto se encuentran archivos como:

```text
package.json
package-lock.json
README.md
.gitignore
.env.example
index.js
```

---

# Pruebas manuales

Los endpoints principales fueron probados manualmente utilizando Postman.

Se verificaron operaciones sobre servicios:

- Crear servicio.
- Listar servicios.
- Obtener servicio por ID.
- Actualizar servicio.
- Eliminar servicio.

También se verificaron operaciones sobre reservas:

- Crear reserva.
- Obtener reserva.
- Agregar servicio a una reserva.
- Actualizar cantidad de un servicio.
- Eliminar servicio de una reserva.
- Eliminar una reserva.
- Consultar una reserva utilizando `populate`.

También se probaron casos de error, incluyendo:

- Consultar un servicio inexistente.
- Consultar una reserva inexistente.
- Crear un servicio con datos incompletos.
- Validación de datos mediante Zod.

---

# Seguridad y archivos sensibles

El archivo `.env` no debe subirse al repositorio.

Tampoco se deben incluir:

- `node_modules`
- credenciales de MongoDB
- claves privadas
- información sensible
- archivos temporales
- archivos generados automáticamente

El proyecto utiliza `.gitignore` para evitar subir estos archivos al repositorio.

El archivo `.env.example` se incluye como referencia para configurar las variables de entorno necesarias.

---

# Funcionalidades principales

El sistema incluye:

- Gestión completa de servicios.
- CRUD de servicios.
- Filtrado de servicios.
- Paginación.
- Ordenamiento.
- Validación de datos mediante Zod.
- Gestión de reservas.
- Asociación entre reservas y servicios.
- Actualización de cantidades de servicios.
- Eliminación de servicios de reservas.
- Eliminación de reservas.
- Relaciones entre colecciones mediante `ObjectId`.
- `populate` mediante Mongoose.
- Vistas server-side con Express Handlebars.
- Comunicación en tiempo real mediante Socket.IO.
- Arquitectura por capas.
- Persistencia en MongoDB.

---

# Autor

Proyecto desarrollado como parte del curso de Backend.

**Mathias Horvat**
