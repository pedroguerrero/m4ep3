# Modulo 4 Ejercicio Practico 3

## Ejecutar el proyecto

Para ejecutar el proyecto se deben ejecutar los siguientes comandos

```
npm install
npm run dev
```

Se puede usar **Docker** para correr el proyecto, solo se debe ejecutar el siguiente comando

```
docker-compose up
```

Luego ir a la siguiente url [http://localhost:8080](http://localhost:8080) para visualizar el sitio

## Explica cómo ReactJS utiliza el DOM virtual para mejorar el rendimiento de la interfaz del hospital (secciones como listado de doctores o servicios).

ReactJS utiliza el DOM virtual para mejorar el rendimiento de la interfaz. Cuando hay cambios en la interfaz de usuario, React actualiza primero un DOM virtual en memoria. Luego, compara este DOM virtual con la versión anterior y actualiza solo las partes que han cambiado en el DOM real. Esto hace que las actualizaciones sean más rápidas y eficientes.
