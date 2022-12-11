# NODEPOP

## ¿Qué es NODEPOP?

Es un proyecto encargado por parte de la academia _Keepcoding_, para el módulo: "Desarrollo Backend con Nodejs".

Nos solicitaban una API que permititiera visualizar una lista de anuncios, crearlos, modificarlos y eliminarlos.

También que la lista de anuncios pudiese obtener filtros y paginación.

Debíamos crear para ello un servidor en local y conectarlo con la base de datos de MongoDB, para que sirviese los datos de los anuncios.

### ACTUALIZACIÓN

Para el módulo "Backend Avanzado" nos han solicitado que también:

- Contenga internacionalización.
- A los datos de anuncios del API solo se pueda acceder si el usuario está logado. Y hemos de hacerlo mediante un token JWT.

Y como opcional:

- Gestionar subida de ficheros (imagen para anuncio)

## COMO EMPEZAR

- Para empezar, debemos tener Nodejs instalado, lo mejor es utilizar nvm como gestor de versiones.

- Una vez comprobemos que tenemos instalado Nodejs, utilizaremos su instalador de paquetes (npm) para instalar las dependencias de Nodepop. Así que escribe en consola:

```
npm install
```

- También debemos tener la base de datos de MongoDB instalada en nuestro ordenador y conectada al puerto local (127.0.0.1)

- Para continuar utilizaremos el archivo _.env.example_ como ejemplo para rellenar las variables de entorno, y copiaremos su contenido en un archivo _.env_.

Ahora, ¿Cómo podemos arrancar la app?

### Developer mode

- Si vamos a ejecutar la API en modo desarrollo, lo primero que tendremos que hacer es introducir en la Base de Datos los anuncios de prueba, para ello vamos a utilizar este comando:

```
node ./initDB.js
```

Esto ejecutará el archivo initDB.js, que elimina (si los hubiese) los anuncios que ya tuviesemos creados y crea los anuncios de prueba que contiene el archivo "initialAdvertisements,js", situado en la carpeta "data". Lo mismo hará también con los usuarios.

De modo que también utilizaríamos el mismo comando en caso de necesitar un reseteo de los datos de _Anuncios_ y _Usuarios_.

Este comando tiene una pregunta de seguridad, a la que se debe responder "si" si queremos ejecutar el archivo, en caso contrario, cancelará el proceso.

- Después, cada vez que queramos ejecutar la API, podremos teclear el comando:

```
npm run dev
```

Este comando ejecutará el archivo "app.js" con _debug_ y _nodemon_ para una mejor vista de lo que sucede en la consola.

_Nodemon_ nos ahorra el tener que salir y conectar de nuevo la API cada vez que hagamos un cambio.

### Production mode

Cuando queramos desplegar la API en producción, solo tendremos que ejecutar el archivo "app.js". Para ello podemos utilizar el siguiente comando, por ejemplo:

```
node ./app.js
```

## COMO FUNCIONA

### API

Para poder acceder a los datos del API (excepto a las Tags), deberemos loguearnos primero, lo que nos devolverá un JWT. Deberemos hacerlo de la siguiente forma:

- **Login**:

Realizaremos una petición de tipo **POST a "/api/login"** e introduciremos en el body de la petición _email_ y _password_.

Si la petición es incorrecta nos devolverá un error con estatus 401.

Si la petición es correcta, nos devolverá un JWT, que se deberá guardar para añadirlo a cualquier petición al API.

El JWT se podrá añadir en:

    - La cabecera con la _key_: "Authorization"

    - Query String con la _key_: jwtToken

    - El Body con la _key_: jwtToken

La API como tal, devuelve los datos en formato JSON. Se pueden hacer las siguientes peticiones:

- **Listar las Tags**:

Podemos realizar una petición de tipo **GET a "/api/tags"** y se nos devolverá un array que lista todas las tags que se han creado hasta ese momento.

- **Listar los anuncios:**
  Realizando una petición **GET a "/api/advertisements"**, obtendremos un listado de todos los anuncios.

  Cada anuncio está compuesto por los campos: \_id, name, sale (true/false), price, photo (url) y tags. De modo que cuando hacemos esta petición se nos devolverá algo como:

  ```json
  {"results":[{"_id":"6325af0863f22054a85539a4","name":"Bicicleta","sale":true,"price":230.15,"photo":"http://localhost:3000/images/bicicleta.jpg","tags":["lifestyle","motor"],"__v":0},{"_id":"6325af0863f22054a85539a5","name":"Ordenador Portátil Mac-Air","sale":true,"price":123.5,"photo":"http://localhost:3000/images/macair.jpg","tags":["work","lifestyle"],"__v":0}
  ```

  - Si queremos, podemos **filtrar por "name"** escribiendo después de la URL **"/?name=_name_"** (sustituyendo el 2º _name_ por el nombre que buscamos) y aparecerán las coincidencias en orden de similitud.

  - También podemos **filtrar por "sale"**, en este caso escribiendo **"/?sale=_sale_"**, sustituyendo el 2º _sale_ por _true_ (en caso de buscar ventas) o _false_ en caso de buscar búsquedas.

  - Para **filtrar por "price"**, tenemos 4 opciones:

    - **/?price=_min-max_**: nos buscará los anuncios con precios que oscilen entre _min_ y _max_.
    - **/?price=_min-_**: nos mostrará los anuncios que tengan un precio mayor o igual que _min_.
    - **/?price=_-max_**: nos mostrará los anuncios que tengan un precio menor o igual que _max_.
    - **/?price=_price_**: nos mostrará los anuncios que tengan un precio igual a _price_.

  - Por último, podemos también **filtrar por tags** escribiendo **"/?tags=_tag_"**, sustituyendo _tag_ por la etiqueta que busquemos. En este caso, la búsqueda es exacta. Así que para saber cuáles son las tags existentes y cómo están escritas, podemos realizar una petición a **/api/tags** y recibiremos un listado de las mismas.

  - Además de filtros, también podemos paginar los resultados añadiendo _skip_ y _limit_, por ejemplo: **/?skip=2&limit=3**. Que nos daría los resultados saltándose los 2 primeros y mostrando un límite de 3 anuncios.

Todos estos parámetros se pueden encadenar añadiendo "&" entre cada uno de ellos, por ejemplo:
http://localhost:3000/api/advertisements/?tags=mobile&sale=false&name=ip&precio=50-&start=0&limit=2

- **Añadir un anuncio**:

Realizando una petición **POST a "/api/advertisements"** e introduciendo en el body, con el formato **Multipart form-data** los datos del anuncio que queremos crear:

    - name: obligatorio

    - sale: obligatorio

    - price: obligatorio

    - photo: opcional, se debe subir un fichero de imagen.

    - tags: obligatorio

Ésta petición devolverá como resultado el anuncio creado.

- **Modificar un anuncio**:

Realizando una petición de tipo **PUT a "/api/advertisements/\_id"**. Sustituiremos _\_id_ por la \_id del anuncio que queramos modificar y en el body de la petición añadiremos el nombre del campo y el valor que queremos cambiar.

Ésta petición devolverá como resultado el anuncio **ya modificado**.

- **Eliminar un anuncio**:

Realizando una petición **DELETE a "/api/advertisements/\_id"**. Sustituiremos _\_id_ por la \_id del anuncio que queramos borrar.

Ésta petición devolverá como resultado el anuncio borrado.

### PÁGINA WEB

Esta API cuenta también con una página web que, eso si, cuenta con menos funcionalidades que la API en sí.

Podremos:

- Realizar las peticiones correspondientes a **Listar los anuncios**, que se harían de la misma forma que en la API, con la única diferencia que se harían desde la URL de la raíz, es decir, desde: http://localhost:3000.

Además, tampoco devolverían los datos en formato JSON, sino que se visualizarían en la página web de esta forma:

<img src="https://mabelblanco.github.io/Nodepop/nodepop/public/images/muestra_web.jpg" alt="listado de anuncios" width="200">

- También disponemos de una página de **Login**, en la que se introducirían el email y contraseña y, en caso de ser correctos, tendremos acceso a la página privada _Mi Perfil_.

Este Login está gestionado mediante sesión guardada en Base de Datos y se accede a ella mediante cookie.

- **Mi Perfil**: es una página privada a la que solo se tiene acceso en caso de haber hecho login.

En el caso de que el usuario intente navegar a ella sin estar logado, será redirigido automáticamente a la página de _Login_.

Contiene los datos privados del usuario (en este caso solo hemos introducido el email en forma de prueba).

- **Menú de navegación**: Cambia según el usuario esté logado o no.

En caso de estar logado, muestra el botón de _Logout_ (que cierra la sesión del usuario) y la página privada _Mi perfil_.

En caso de no estar logado, muestra el botón de _Login_.

También disponemos de un pequeño menú de idioma, en el que se puede elegir que el sitio web se muestre en español o en inglés.

## ORGANIZACIÓN

Para empezar tenemos varios archivos en la carpeta principal:

- **app.js**: Este es el archivo principal, el que arranca el API, el controlador.
- **initDB.js**: Este archivo inicializa la Base de Datos con los anuncios de prueba.
- **.env.example**: Sirve como muestra para crear un archivo _.env_ con los valores correspondientes al desarrollador.
- README.md (el archivo que estás leyendo actualmente).
- .gitignore : Archivo que sirve para que git ignore los tipos de archivos contenidos en él. En este caso, yo he añadido los que están en la carpeta node_modules.
- package.json y package-lock.json: Archivos de configuración.

Luego tenemos distintas carpetas:

- bin: que guarda los datos iniciales del servidor.
- **data**: Aquí se encuentran los archivos "initialAdvertisements.js" y "initialUsers.js". En ellos están los anuncios y usuarios de prueba con los que se inicializa la base de datos si ejecutamos el archivo "initDB.js".
- **locales**: Contiene los archivos "en.json" y "es.json", que guardan los literales en los distintos idiomas.
- **models**: Contiene los archivos "Advertisement.js" y "User.js", que programan los modelos de los anuncios y los usuarios con _mongoose_.
- **modules**: Contiene los módulos creados por el desarrollador:
  - "connectMongoose.js", que conecta nuestra API con la base de datos de MongoDB.
  - "i18nConfig.js", que configura la librería i18n, la cual permite la internacionalización de la web.
  - "authMiddleware.js", que exporta un middleware para autenticar la sesión de un usuario en el website.
  - "jwtAuthMiddleware.js", que también exporta un middleware para autenticar en este caso, el JWT de un usuario, para su acceso al API.
- **public**:
  - index-example.hmtl: es el template de bootstrap descargado para darle un poco de estilo a la página
  - css: contiene las hojas de estilos css
  - js: contiene el javascript necesario para que funcionen los estilos del template de bootstrap descargado.
  - images: contiene las imágenes de los anuncios
  - assets: contiene el favicon de la página.
- **routes**:
  - "index.js": Archivo encargado de coordinar las peticiones a la raíz del sitio y que sirve la pág web.
  - "login.js": Archivo encargado de coordinar las peticiones al login y que sirve el formulario.
  - "userProfile.js": Sirve la página de perfil del usuario.
  - "changeLocale.js": Coordina la petición de cambio de idioma.
  - api: A esta carpeta irán dirigidas las peticiones a la API.
    - "loginApi.js": Se encarga de coordinar la petición de Login para el API y crear el JWT.
    - "advertisements.js": Coordina las peticiones relacionadas con los anuncios (listarlos, crearlos, modificarlos y eliminarlos).
    - "tags.js": Coordina la petición para listar las tags.
- **views**: Contiene las vistas, es decir, como se van a crear las páginas web que se sirvan.
  - "index.html": Muestra la página principal, que se encarga de listar los anuncios conforme a los filtros.
  - "login.html": Muestra el formulario que se debe rellenar para hacer Login.
  - userProfile.html: Muestra una página privada a la que solo se puede acceder si el usuario está logado. Contiene información personal del usuario (en este caso solo el email como muestra).
  - "navigation.html": Muestra el menú de navegación. Este menú cambia según el usuario esté logado o no. Se repetirá en todas las páginas que se creen.
  - "header.html": Muestra la cabecera, que se repetirá en todas las páginas que se creen.
  - "footer.html": Muestra el footer, que se repetirá en todas las páginas que se creen.
  - "error.html": Muestra los errores.
