

/*Llenado de catalogos*/
INSERT INTO `Srfl_Categoria` (`Ctgr_IDCategoria`, `Ctgr_Nombre`, `Ctgr_Estatus`, `Ctgr_FchaCrcn`, `Ctgr_FchaMdfc`) VALUES (NULL, 'Java', b'1', CURDATE(), NULL);

INSERT INTO Srfl_Resoluciones(Rslc_Nombre, Rslc_Estatus, Rslc_FchaCrcn) VALUES('896x512', 1, CURDATE());
INSERT INTO Srfl_Resoluciones(Rslc_Nombre, Rslc_Estatus, Rslc_FchaCrcn) VALUES('768x439', 1, CURDATE());
INSERT INTO Srfl_Resoluciones(Rslc_Nombre, Rslc_Estatus, Rslc_FchaCrcn) VALUES('300x171', 1, CURDATE());


/*Llenado de noticia*/
INSERT INTO Srfl_Noticias (Ntcs_Titulo, Ntcs_Descripcion, Ntcs_Url, Ntcs_EsttPblc, Ntcs_TipoCtgr, Ntcs_Estatus, Ntcs_FchaCrcn) 
VALUES('Conceptos Básicos para Programar en Java: Guía Completa para Principiantes', 
'Java es un lenguaje de programación versátil, utilizado en todo tipo de aplicaciones, desde el desarrollo web hasta aplicaciones móviles y sistemas embebidos.', 
'conceptos-basicos-para-programar-en-java', 2, 1, 1, CURDATE());


INSERT INTO Srfl_NtcsCtgr(NtCt_IDNoticia, NtCt_IDCategoria, NtCt_Estatus, NtCt_FchaCrcn)
VALUES(2, 1, 1, curdate());

INSERT INTO Srfl_Imagenes(Imgn_IDNoticia, Imgn_IDResolucion, Imgn_Url, Imgn_Resolucion, Imgn_Estatus, Imgn_FchaCrcn)
VALUES(1, 1, 'http://localhost/aprendeProgramacion/assets/images/uploads/1/que-necesito-para-programar-en-java.png', '896x512', 1, CURDATE());
INSERT INTO Srfl_Imagenes(Imgn_IDNoticia, Imgn_IDResolucion, Imgn_Url, Imgn_Resolucion, Imgn_Estatus, Imgn_FchaCrcn)
VALUES(1, 2, 'http://localhost/aprendeProgramacion/assets/images/uploads/1/que-necesito-para-programar-en-java-768x439.png', '768x439', 1, CURDATE());
INSERT INTO Srfl_Imagenes(Imgn_IDNoticia, Imgn_IDResolucion, Imgn_Url, Imgn_Resolucion, Imgn_Estatus, Imgn_FchaCrcn)
VALUES(1, 3, 'http://localhost/aprendeProgramacion/assets/images/uploads/1/que-necesito-para-programar-en-java-300.png', '896x512', 1, CURDATE());


INSERT INTO Srfl_Imagenes(Imgn_IDNoticia, Imgn_IDResolucion, Imgn_Url, Imgn_Resolucion, Imgn_Estatus, Imgn_FchaCrcn)
VALUES(2, 1, 'http://localhost/wordpress/wp-content/uploads/2024/06/Conceptos-basicos-para-programar-en-Java-1.jpg', '896x512', 1, CURDATE());
INSERT INTO Srfl_Imagenes(Imgn_IDNoticia, Imgn_IDResolucion, Imgn_Url, Imgn_Resolucion, Imgn_Estatus, Imgn_FchaCrcn)
VALUES(2, 2, 'http://localhost/wordpress/wp-content/uploads/2024/06/Conceptos-basicos-para-programar-en-Java-1-768x432.jpg', '768x439', 1, CURDATE());
INSERT INTO Srfl_Imagenes(Imgn_IDNoticia, Imgn_IDResolucion, Imgn_Url, Imgn_Resolucion, Imgn_Estatus, Imgn_FchaCrcn)
VALUES(2, 3, 'http://localhost/aprendeProgramacion/assets/images/uploads/1/que-necesito-para-programar-en-java-300.png', '896x512', 1, CURDATE());


http://localhost/wordpress/wp-content/uploads/2024/06/que-necesito-para-programar-en-java.png 896w, 
http://localhost/wordpress/wp-content/uploads/2024/06/que-necesito-para-programar-en-java-300x171.png 300w, 
http://localhost/wordpress/wp-content/uploads/2024/06/que-necesito-para-programar-en-java-768x439.png 768w


http://localhost/wordpress/wp-content/uploads/2024/06/Conceptos-basicos-para-programar-en-Java-1.jpg 1280w, 
http://localhost/wordpress/wp-content/uploads/2024/06/Conceptos-basicos-para-programar-en-Java-1-300x169.jpg 300w, 
http://localhost/wordpress/wp-content/uploads/2024/06/Conceptos-basicos-para-programar-en-Java-1-1024x576.jpg 1024w, 
http://localhost/wordpress/wp-content/uploads/2024/06/Conceptos-basicos-para-programar-en-Java-1-768x432.jpg 768w


http://localhost/aprendeProgramacion/assets/images/uploads/2/Conceptos-basicos-para-programar-en-Java-1.jpg


(max-width: 1280px) 100vw, 1280px