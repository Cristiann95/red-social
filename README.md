# Red Social - Proyecto Frontend

## Descripción

Este es un proyecto de una red social que permite a los usuarios crear una cuenta, iniciar sesión, y interactuar con posteos a través de una serie de funcionalidades. El sistema simula un flujo completo de inicio de sesión, visualización de posteos, y la gestión de dichos posteos mediante un conjunto de acciones CRUD (Crear, Leer, Actualizar, Eliminar). Además, incluye funcionalidades de búsqueda de usuarios, interacción con los posteos mediante "likes" y "dislikes", y un diseño responsive para una experiencia de usuario óptima en cualquier dispositivo.

## Características

-   **Inicio de sesión:**  
    Se incluye un formulario de login donde se solicita al usuario:
    
    -   Nombre
    -   Correo electrónico válido
    -   Contraseña (con restricciones y complejidad)
    -   Confirmación de contraseña
    
    Una vez completado el formulario, el sistema simula el inicio de sesión y redirige a la página principal de la red social.
    
-   **Página principal (Red social):**  
    Después de iniciar sesión, los usuarios acceden a su página de perfil donde pueden:
    
    -   Ver posteos simulados, traídos desde una API.
    -   Interactuar con los posteos (dar likes/dislikes).
    -   Eliminar o actualizar los posteos existentes.
    -   Crear nuevos posteos.
-   **Búsqueda de usuarios:**  
    Los usuarios pueden realizar una búsqueda de contactos a través de un campo de entrada (input search), que consulta la misma API para mostrar resultados relevantes.
    
-   **Notificaciones:**  
    Se implementaron notificaciones mediante las librerías `Izitoast`, `SweetAlert2`, y `Bootstrap` para brindar mensajes interactivos de éxito, error o advertencia, ofreciendo una experiencia más amigable.
    
-   **Diseño responsive:**  
    La interfaz de usuario está diseñada para adaptarse a diferentes tamaños de pantalla, garantizando una experiencia de uso fluida en dispositivos móviles, tablets y escritorios.
    

## Tecnologías Utilizadas

-   **HTML/CSS** para la estructura y diseño de la interfaz.
-   **JavaScript** para la interacción dinámica en la página.
-   **API externa** para obtener posteos y usuarios.
-   **Izitoast** para notificaciones de tipo toast.
-   **SweetAlert2** para diálogos interactivos y alertas.

## Funcionalidades CRUD

-   **Crear posteos:** Los usuarios pueden agregar nuevos posteos a la red social.
-   **Leer posteos:** Los posteos son traídos desde la API y mostrados en la página principal.
-   **Actualizar posteos:** Los usuarios pueden editar cualquier posteo que hayan creado.
-   **Eliminar posteos:** Los usuarios pueden borrar los posteos existentes.

## Instalación

1.  Clona este repositorio en tu máquina local:
    
    `git clone https://github.com/Cristiann95/red-social` 
    
2.  Navega al directorio del proyecto:
    

    
    `cd red-social` 
    
3.   **Instala las dependencias necesarias**. Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu máquina. Luego, corre el siguiente comando:
    

    
    `npm install` 
    
    Este comando instalará la librería `Izitoast` para que las funcionalidades de notificación y diseño funcionen correctamente.
    
4.   Una vez instaladas las dependencias, **abre el archivo `index.html`** en tu navegador para comenzar a probar el proyecto.
    

## Notas Adicionales

-   Asegúrate de tener una conexión a Internet para que las solicitudes a la API funcionen correctamente.
-   Este proyecto es una simulación de una red social y está diseñado para demostración de manejo de solicitudes CRUD y diseño responsive.

## Licencia

Este proyecto está bajo la licencia ISC.