# NODEPOP #

## ¿Qué es NODEPOP?

Es un proyecto encargado por parte de la academia *Keepcoding*, para el módulo: "Desarrollo Backend con Nodejs".

Nos solicitaban una API que permititiera visualizar una lista de anuncios, crearlos, modificarlos y eliminarlos.

También que la lista de anuncios pudiese obtener filtros y paginación.

Debíamos crear para ello un servidor en local y conectarlo con la base de datos de MongoDB, para que sirviese los datos de los anuncios.

## COMO EMPEZAR

- Para  empezar, debemos tener Nodejs instalado, lo mejor es utilizar nvm como gestor de versiones.

- Una vez comprobemos que tenemos instalado Nodejs, utilizaremos su instalador de paquetes (npm) para instalar las dependencias de Nodepop. Así que escribe en consola:

```
npm install
```
- También debemos tener la base de datos de MongoDB instalada en nuestro ordenador y conectada al puerto local (127.0.0.1)

Ahora, 
How can we start the app?

### Developer mode ###

- Si vamos a ejecutar la API en modo desarrollo, lo primero que tendremos que hacer es introducir en la Base de Datos los anuncios de prueba, para ello vamos a utilizar este comando:
```
node ./initDB.js
```
Esto ejecutará el archivo initDB.js, que elimina (si los hubiese) los anuncios que ya tuviesemos creados y crea los anuncios de prueba que contiene el archivo "initialAdvertisements,js", situado en la carpeta "data".

De modo que también utilizaríamos el mismo comando en caso de necesitar un reseteo de los datos de *Anuncios*.

Este comando tiene una pregunta de seguridad, a la que se debe responder "si" si queremos ejecutar el archivo, en caso contrario, cancelará el proceso.

- Después, cada vez que queramos ejecutar la API, podremos teclear el comando:

```
npm run dev
```
Este comando ejecutará el archivo "app.js" con *debug* y *nodemon* para una mejor vista de lo que sucede en la consola.

*Nodemon* nos ahorra el tener que salir y conectar de nuevo la API cada vez que hagamos un cambio.

### Production mode ###

Cuando queramos desplegar la API en producción, solo tendremos que ejecutar el archivo "app.js". Para ello podemos utilizar el siguiente comando, por ejemplo:

```
node ./app.js
```

## COMO FUNCIONA

### API ###

La API como tal, devuelve los datos en formato JSON. Se pueden hacer las siguientes peticiones:

- **Listar los anuncios:**
    Realizando una petición **GET a "/api/advertisements"**, obtendremos un listado de todos los anuncios.
    
    Cada anuncio está compuesto por los campos: _id, name, sale (true/false), price, photo (url) y tags. De modo que cuando hacemos esta petición se nos devolverá algo como:
    ```json
    {"results":[{"_id":"6325af0863f22054a85539a4","name":"Bicicleta","sale":true,"price":230.15,"photo":"http://localhost:3000/images/bicicleta.jpg","tags":["lifestyle","motor"],"__v":0},{"_id":"6325af0863f22054a85539a5","name":"Ordenador Portátil Mac-Air","sale":true,"price":123.5,"photo":"http://localhost:3000/images/macair.jpg","tags":["work","lifestyle"],"__v":0}
    ```

    - Si queremos, podemos **filtrar por "name"** escribiendo después de la URL **"/?name=*name*"** (sustituyendo el 2º *name* por el nombre que buscamos) y aparecerán las coincidencias en orden de similitud.

    - También podemos **filtrar por "sale"**, en este caso escribiendo **"/?sale=*sale*"**, sustituyendo el 2º *sale* por *true* (en caso de buscar ventas) o *false* en caso de buscar búsquedas.

    - Para **filtrar por "price"**, tenemos 4 opciones:
        - **/?price=*min-max***: nos buscará los anuncios con precios que oscilen entre *min* y *max*.
        - **/?price=*min-***: nos mostrará los anuncios que tengan un precio mayor o igual que *min*.
        - **/?price=*-max***: nos mostrará los anuncios que tengan un precio menor o igual que *max*.
        - **/?price=*price***: nos mostrará los anuncios que tengan un precio igual a *price*.
    
    - Por último, podemos también **filtrar por tags** escribiendo **"/?tags=*tag*"**, sustituyendo *tag* por la etiqueta que busquemos. En este caso, la búsqueda es exacta. Así que para saber cuáles son las tags existentes y cómo están escritas, podemos realizar una petición a **/api/tags** y recibiremos un listado de las mismas.

   - Además de filtros, también podemos paginar los resultados añadiendo *skip* y *limit*, por ejemplo: **/?skip=2&limit=3**. Que nos daría los resultados saltándose los 2 primeros y mostrando un límite de 3 anuncios.

Todos estos parámetros se pueden encadenar añadiendo "&" entre cada uno de ellos, por ejemplo:
http://localhost:3000/api/advertisements/?tags=mobile&sale=false&name=ip&precio=50-&start=0&limit=2

- **Añadir un anuncio**:

Realizando una petición **POST a "/api/advertisements"** e introduciendo en el body los datos del anuncio que queremos crear.

Ésta petición devolverá como resultado el anuncio creado.

- **Modificar un anuncio**: 

Realizando una petición de tipo **PUT a "/api/advertisements/_id"**. Sustituiremos *_id* por la _id del anuncio que queramos modificar y en el body de la petición añadiremos el nombre del campo y el valor que queremos cambiar.

Ésta petición devolverá como resultado el anuncio **ya modificado**.

- **Eliminar un anuncio**:

Realizando una petición **DELETE a "/api/advertisements/_id"**. Sustituiremos *_id* por la _id del anuncio que queramos borrar.

Ésta petición devolverá como resultado el anuncio borrado.

- **Listar las Tags**:

Podemos realizar una petición de tipo **GET a "/api/tags"** y se nos devolverá un array que lista todas las tags que se han creado hasta ese momento.

### PÁGINA WEB ###

Esta API cuenta también con una página web que, eso si, cuenta con menos funcionalidades que la API en sí. 

En este caso, solo podremos realizar las peticiones correspondientes a **Listar los anuncios**, que se harían de la misma forma que en la API, con la única diferencia que se harían desde la URL de la raíz, es decir, desde: http://localhost:3000.

Además, tampoco devolverían los datos en formato JSON, sino que se visualizarían en la página web de la siguiente forma:
<i src="./public/images/muestra_web.jpg" alt="lista de anuncios">