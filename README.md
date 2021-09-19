# WebServer + RestServer
Universidad de San Carlos de Guatemala
Facultad de Ingeniería
Practicas Iniciales

Randy Mauricio Orozco Reyes
200313243

Recordar que se debe ejecutar ```npm install``` para reconstruir los módulos de Node

Tareas
Base de datos
    Usuario
        ID_Usuario
        RegistroAcademico
        Nombre
        Apellido
        Clave
        EMail
        Fecha

    Publicacion
        ID_Publicacion
        ID_Usuario
        ID_Curso
        Id_Catedratico
        Fecha
        Texto

    Comentario
        ID_Comentario
        ID_Publicacion
        ID_Usuario
        Texto

    Catedratico CT
        ID_Catedratico
        Nombre

    Curso   CT
        ID_Curso
        ID_Catedratico
        Nombre
        Credito

    CursoUsuario
        ID_Curso
        ID_Usuario
        //Nota