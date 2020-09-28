# API Biblioteca

Para iniciar el proyecto, ejecutar `npm start`. Esto iniciará automaticamente el proceso de seeding de la base de datos.

Para ejecutar el seeding de manera manual, ejecutar `npm run seed`.

## Sobre el api

El API sólo soporta la operación GET para el endpoint `/books`.

Las rutas suportadas son:

```
books/
```

Muestra el listado de libros.

Los elementos retornados son:

- isbn
- title

---

```
books/:isbn
```

A partir de un código isbn, se puede consultar información mas extensa de un libro.

Los elementos retornados son:

- title
- isbn
- edition
- author
- publisher
- description
- pagesCount
- formats

El campo formats contiene un arreglo con los formatos disponibles del libro.

---

```
books/:isbn/page/:number?format=format
```

Retorna el contenido de la págna solicitada en el formato requerido.

El campo formato debe enviarse como un query.

---

Request de prueba:

```
books/9781491924464/page/4?format=html
```

---

## Sobre el código

Valores de configuración, tales como Host, Puerto, Nombre de la Base de Datos, y el Usuario y Contraseña, se pueden configurar por medio de variables de entorno, o directamente en el archivo `config.js`

El path de los nuevos repositorios deben ser registrados en el array `REPOSITORIES` del archivo `config.js` para que puedan ser agregados al Controller automáticamente.

Los repositorios no aceptan argumentos por constructor, deben inicializar su conexión.

## Sobre del proceso de Seeding

Los folders agregados al folder `data-import` se usan para crear Collections en la base de datos. El Collection tomará el nombre del folder.

Cada folder debe exportar un objeto o un arreglo de objetos. Estos serán introducidos al Collection como Documents.
