# API de gestion de cursos

## Endpoints
### **get** /cursos 
***Para obtener lista de cursos***
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": [
        {
            "nombre": "matematicas",
            "codigo": "1",
            "descripcion": "curso de matematicas"
        }
    ]
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "error al buscar cursos"
}
~~~
### **post** /cursos 
***Para crear cursos***
#### Ejemplo de cuerpo
~~~
{
    "nombre": "matematicas",
    "codigo": "1",
    "descripcion": "curso de matematicas"
}
~~~
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": "Se creo el curso exitosamente"
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "Ya existe este curso"
}
~~~
~~~
{
    "status": "failure",
    "error": "faltan datos"
}
~~~
### **get** /personas 
***Para obtener lista de personas***
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": [
        {
            "id": "6930bf91a32e187f06d6b55b",
            "nombre": "Nombre1",
            "cedula": "123456789",
            "email": "nombre1@correo.com"
        }
    ]
}
~~~
✅ Correcta no data
~~~
{
    "status": "success",
    "data": []
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "error al buscar personas"
}
~~~
### **get** /personas/:id
***Para buscar por id***
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": [
        {
            "id": "6930bf91a32e187f06d6b55b",
            "nombre": "Nombre1",
            "cedula": "123456789",
            "email": "nombre1@correo.com"
        }
    ]
}
~~~
✅ Correcta no data
~~~
{
    "status": "success",
    "data": []
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "ID invalido"
}
~~~
### **get** /personas/por-cedula/:cedula
***Para buscar por cedula***
#### Respuestas:
✅ Correcta
~~~
{
    "persona": {
        "nombre": "Nombre1",
        "cedula": "123456789",
        "email": "nombre1@correo.com"
    },
    "curso": {
        "nombre": "matematicas",
        "codigo": "1",
        "descripcion": "curso de matematicas"
    }
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "no se encuentra la cedula"
}
~~~
~~~
{
    "status": "failure",
    "error": "no se pudo contultar la cedula"
}
~~~
### **post** /personas/
***Para crar persona***
#### Ejemplo de cuerpo
~~~
{
    "nombre":"Nombre Persona",
    "cedula":"123456789",
    "email": "persona1@correo.com",
    "curso": "1"
}
~~~
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": {
        "nombre": "Nombre Persona",
        "cedula": "123456789",
        "email": "persona1@correo.com",
        "curso": "1"
    }
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "faltan datos"
}
~~~
~~~
{
    "status": "failure",
    "error": "no se encuetra el curso"
}
~~~
~~~
{
    "status": "failure",
    "error": "Ya existe la persona"
}
~~~
### **post** /personas/
***Para crar persona***
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": {
        "nombre": "Nombre Persona",
        "cedula": "123456789",
        "email": "persona1@correo.com",
        "curso": "1"
    }
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "faltan datos"
}
~~~
~~~
{
    "status": "failure",
    "error": "no se encuetra el curso"
}
~~~
~~~
{
    "status": "failure",
    "error": "Ya existe la persona"
}
~~~
### **put** /personas/:id
***Para actualizar persona***
#### Ejemplo de cuerpo
~~~
{
    "nombre":"Nombre2",
    "cedula":"987654321",
    "email": "nombre2@correo.com",
    "curso": "1"
}
~~~
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": {
        "nombre": "Nombre2",
        "cedula": "9876543210",
        "email": "nombre2@correo.com",
        "curso": "1"
    }
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "Se requiere de un ID"
}
~~~
~~~
{
    "status": "failure",
    "error": "ID invalido"
}
~~~
~~~
{
    "status": "failure",
    "error": "no existen los datos la persona a actualizar"
}
~~~
~~~
{
    "status": "failure",
    "error": "Ya existe la persona"
}
~~~
~~~
{
    "status": "failure",
    "error": "no se encuetra el curso a actualizar"
}
~~~
### **delete** /personas/:id
***Para borrar datos persona***
#### Respuestas:
✅ Correcta
~~~
{
    "status": "success",
    "data": "Persona ID: 6930f320838b69bcb0d1a670 borrada"
}
~~~
❌ Fallo(s)
~~~
{
    "status": "failure",
    "error": "Se requiere de un ID"
}
~~~
~~~
{
    "status": "failure",
    "error": "ID invalido"
}
~~~
~~~
{
    "status": "failure",
    "error": "No se encontro el id de la persona a borrar"
}
~~~
~~~
{
    "status": "failure",
    "error": "No se pudo borrar la persona"
}
~~~