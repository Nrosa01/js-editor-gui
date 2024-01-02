Arquitectura
- Replantear arquitectura en base a las características de la aplicación
- Rehacer API

Networking
  - Edición colaborativa (en tiempo real)
  - Compartir workspace (con un link)
    - Clonar workspace en servidor y general link a este, la persona que lo abra recibe un clon de este workspace. El link expira en un tiempo determinado. 

Canvas stuff
- Selecionar varios objetos (para moverlos, eliminarlos, etc)

Logic stuff
- Improve serialization to avoid localStorageLimit 🔳
  - ¿Sistema de inicio de sesión y persistencia de datos en un servidor? (Por ver)
- Guardar modelo de item en el modelo de array (para cuando no queda ningún item y no se puede clonar el anterior)
- Workspaces (manejar en la propia aplicación varios canvases y poder cambiar entre ellos)
- Sistema de ficheros (para imágenes, sonidos, etc)
  - Este sistema es local al workspace

Window stuff
- Minimize icon for windows
- Maximize windows 
- Custom layout
- Carpetas para ventanas (para poder organizarlas mejor)
  - Esto es diferente del workspace, un workspace podría considerarse una instancia de la aplicación aislada del resto, mientras que las carpetas son una forma de organizar las ventanas en el workspace actual.
  - Las carpetas podrían tener un nombre y un marco de color
- Reorganizar items de la ventana (poder poner varios en una sola fila, mostrar u ocultar el nombre del campo, etc)

GUI

- Crear nueva ventana desde GUI (sin tener que importar un js)
- Añadir campos a la ventana desde GUI
- Editar campos y atributos de la ventana desde GUI
- Poder editar modelo de item o array desde GUI
- Implementar Monaco Editor para editar el objeto js o crear botones (funciones)
- ¿Sistema de nodos en vez de editor de código? ``(No parece viable de primeras)``
- Editar organización de la ventana en la GUI (arrastrar y soltar)
- Poder cambiar el color del marco de una ventana, podría ser una buena forma de identificarlas. Quizás esto pueda ir relacionado con los tags de tipos. Quizás podría dar al usuario la opción de cambiar el color de marco de ventana, el fondo y el color del texto. O quizás dar una serie de temas predefinidos. Lo importante es poder diferenciar las ventanas de forma visual.

Label stuff
- Reference label (para referenciar a otro objeto del canvas del mismo workspace)
  - Tags para las ventanas, para poder filtrarlas y manejarlas mejor
- Text Areas
- Images
- Edit field values (using a top menu)
- Multicampo (en una sola línea, varios campos asociados a una sola "variable")
- Canvas label
- Sound label
- Calendar Label (and own api)

Sonidos
- Implementar sistema de audio, lo suficiente para permitir crear un pequeño reproductor.
- Alguna forma de meter varios audios en un workspace y referenciarlos desde el audioLabel de una ventana

Atributos:
- Slider

Array stuff
- Reorderable
- Delete specific item

Misc
- Mejorar readme y documentación