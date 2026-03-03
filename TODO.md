# modules

- agentes
- equipos
- clientes
- usuarios

# asociaciones

- equipo tiene asignado usuarios
- equipo tiene asignado clientes
- equipo tiene asignado agentes

# modules detallados

- agentes

  - crear agente
  - listar agente
  - ver detalle del agente:
    - equipos que lo integran
    - clientes que lo usan

- equipos

  - crear equipo
  - asignar clientes al equipo
  - asignar agentes al equipo
  - ver detalle del equipo y agentes asociados

- usuarios

  - crear usuario
  - asignar n equipos

- chat
  - historial
  - chat

## flujo de equipo:

equipo: X
tiene asignados estos clientes (estos clientes pueden estar en diferentes equipo):

- cliente a
- cliente b

## nuevo flujo de equipo

- workspace
  - agregar workspace (nombre,sitio,urllogo,description, agentes)
- usuarios
  - agregar usuarios (nombre,email,rol(admi,client),workspace o multiples workspace)
  - si es un workspace nuevo agregar.

# chat

- usuario con el rol de cliente(chat)
  - listar agentes disponibles para que el cliente lo seleccione
  - abrir agente seleccionado en un chat para que pueda interactuar.

chat

- necesita el id del workflow
-

# models n8n

id:id
name:name
status:active

---

# PENDIENTES

- nueva versión de la interfaz del chat del cliente
- seguir refactorizando

## #FLUJO DE CHATS

presionar "iniciar agente": - crea el chat enviando (userId,agentId,workspaceId) - recibe como respuesta el "chatId"

enviar mensaje:

- envia el chatId , message y el path
- recibe los messages y los guarda en el estado.

# FLUJO DE CHAT AL ENVIAR

---

presionar "iniciar agente": - cargar en el estado : userId, agentId, workpaceId

enviar mensaje si el chatId no existe:

- enviar datos para la creación del chat
- si la respuesta es positiva guardar el "chatId" en el estado
- enviar mensaje a ese "chatId" y asi llenar el array con los mensajes.

enviar mensaje si el chatId si existe: - enviar mensaje a ese "chatId" y asi llenar el array con los mensajes.

# FLUJO DE ELIMINACION

- si tienes un chat iniciado y quieres eliminarlo:

  - usar el chatId para eliminarlo de la DB y del estado.
  - remover los messages del estado.

- si el chat solo esta abierto sin mensajes y se desea eliminar uno de la lista:
  - eliminar chat solo usando el chatId

# CATA

- focus al input luego de enviar
- scroll

# prueba
