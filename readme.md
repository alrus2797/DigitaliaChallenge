# Readme de la Aplicación
Este archivo README proporciona información esencial sobre la estructura y el funcionamiento de la aplicación que consta de dos carpetas: api y web. La carpeta api contiene el backend de la aplicación en .NET 8.0 mientras que la carpeta web alberga la interfaz de usuario desarrollada con ReactJS.

## API (.NET con CleanArchitecture y Arquitectura de Command-Query)
### Descripción
La carpeta api contiene el backend de la aplicación, que se ha desarrollado utilizando CleanArchitecture, una herramienta de scaffolding para .NET creada por jasontaylordev ([enlace](https://github.com/jasontaylordev/CleanArchitecture)). En esta API, se ha implementado la arquitectura de Command-Query, que separa las operaciones de escritura (comandos) de las operaciones de lectura (consultas) para lograr un diseño robusto y escalable.

### Estructura del Proyecto
La estructura de carpetas y archivos en la carpeta api puede verse de la siguiente manera:

- Domain: Contiene la lógica de dominio, como entidades y reglas de negocio, sin dependencias externas.

- Application: Alberga toda la lógica empresarial y sigue el patrón CQRS, donde cada caso de uso se representa como un comando o consulta. Depende de Domain pero no de otras capas.

- Infrastructure: Gestiona el acceso a recursos externos, como sistemas de archivos o servicios web. Utiliza interfaces definidas en Application.

- Web: Representa la capa de presentación, una aplicación de página única basada en Angular 8 y ASP.NET Core. Depende de Application e Infrastructure solo para inyección de dependencias en Startup.cs.


```bash
DC.api/src/
        ├── Application/         # Capa de aplicación
        ├── Domain/              # Capa de dominio
        ├── Infrastructure/      # Capa de infraestructura
        ├── Web/                 # Capa de presentación (Controladores API)
        ├── appsettings.json     # Configuración de la aplicación

```

### Configuración
Antes de ejecutar la API, se tiene que configurar el archivo `appsettings.json` con la cadena de conexión a la base de datos. Para ello, se debe modificar el valor de la clave `DefaultConnection` con la cadena de conexión a la base de datos. Por ejemplo:
  
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=DC;User Id=sa;Password=123456;"
}
```

## Web (ReactJS)
### Descripción
La carpeta web contiene la interfaz de usuario de la aplicación, desarrollada utilizando ReactJS con Typescript y para los estilos se usó Bootstrap, junto con la librería de componentes React-Bootstrap. La aplicación web se comunica con la API a través de funciones que consumen los endpoints de la API.

### Estructura del Proyecto
La estructura de carpetas y archivos en la carpeta web puede verse de la siguiente manera:

```bash

DC.web/src/
        ├── components/         # Componentes compartidos de la aplicación
        ├── services/           # Funciones para consumir la API
        ├── hooks/              # Hooks compartidos de la aplicación
        ├── screens/            # Pantallas de la aplicación según el enrutador (feature-based)
        ├── ...
        ├── package.json        # Dependencias y scripts de la aplicación
        ├── ...
        ├── README.md           # Documentación de la interfaz web

```
### Configuración

Antes de ejecutar la aplicación web, se deben instalar las dependencias de la aplicación. Para ello, se debe ejecutar el siguiente comando en la carpeta web:

```bash
npm install
```

Luego, se debe configurar el archivo `constants.ts` con la URL de la API. Para ello, se debe modificar el valor de la constante `baseUrl` con la URL de la API. Por ejemplo:

```typescript

export const baseUrl = 'https://mydomain.com/api';

```