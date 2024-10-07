/*CREATE DATABASE AprnPrgr;
GRANT SELECT, INSERT, UPDATE, DELETE ON `AprnPrgr`.* TO 'usu_serflix'@'localhost';*/
CREATE TABLE `Srfl_Categoria` (
  `Ctgr_IDCategoria` int(11) NOT NULL,
  `Ctgr_Nombre` varchar(500) NOT NULL,
  `Ctgr_Estatus` bit(1) NOT NULL,
  `Ctgr_FchaCrcn` datetime NOT NULL,
  `Ctgr_FchaMdfc` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_Comentarios` (
  `Cmnt_IDComentario` int(11) NOT NULL,
  `Cmnt_IDNoticia` int(11) NOT NULL,
  `Cmnt_Nombre` varchar(500) NOT NULL,
  `Cmnt_Comentario` text NOT NULL,
  `Cmnt_Email` varchar(500) NOT NULL,
  `Cmnt_EsttCmnt` smallint(6) NOT NULL,
  `Cmnt_Estatus` bit(1) NOT NULL DEFAULT b'1',
  `Cmnt_FchaCrcn` datetime NOT NULL,
  `Cmnt_FchaMdfc` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `Srfl_Contacto` (
  `Cntc_IDContacto` int(11) NOT NULL,
  `Cntc_Nombre` varchar(500) NOT NULL,
  `Cntc_Asunto` varchar(800) NOT NULL,
  `Cntc_Email` varchar(500) NOT NULL,
  `Cntc_Descripcion` text NOT NULL,
  `Cntc_Estatus` bit(1) NOT NULL,
  `Cntc_FchaCrcn` datetime NOT NULL,
  `Cntc_FchaMdfc` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_CtEsttPblc` (
  `EsPl_IDCtEsttPblc` int(11) NOT NULL,
  `EsPl_Nombre` varchar(500) NOT NULL,
  `EsPl_Estatus` tinyint(4) NOT NULL,
  `EsPl_FchaCrcn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_CtlgTipoCtgr` (
  `TpCt_IDCtlgTipoCtgr` int(11) NOT NULL,
  `TpCt_Nombre` varchar(500) NOT NULL,
  `TpCt_Estatus` bit(1) NOT NULL,
  `TpCt_FchaCrcn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_Imagenes` (
  `Imgn_IDImagen` int(11) NOT NULL,
  `Imgn_IDNoticia` int(11) NOT NULL,
  `Imgn_IDResolucion` int(11) NOT NULL,
  `Imgn_Url` varchar(500) NOT NULL,
  `Imgn_Resolucion` varchar(200) NOT NULL,
  `Imgn_Estatus` bit(1) NOT NULL,
  `Imgn_FchaCrcn` datetime NOT NULL,
  `Imgn_FchaMdfc` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_Noticias` (
  `Ntcs_IDNoticia` int(11) NOT NULL,
  `Ntcs_Titulo` varchar(1000) NOT NULL,
  `Ntcs_Descripcion` text NOT NULL,
  `Ntcs_Url` varchar(500) NOT NULL,
  `Ntcs_EsttPblc` tinyint(4) NOT NULL,
  `Ntcs_TipoCtgr` tinyint(4) DEFAULT NULL,
  `Ntcs_Estatus` bit(1) NOT NULL,
  `Ntcs_FchaCrcn` datetime NOT NULL,
  `Ntcs_FchaPblc` datetime DEFAULT NULL,
  `Ntcs_FchaMdfc` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_NtcsCtgr` (
  `NtCt_IDNtcsCtgr` int(11) NOT NULL,
  `NtCt_IDNoticia` int(11) NOT NULL,
  `NtCt_IDCategoria` int(11) NOT NULL,
  `NtCt_Estatus` bit(1) NOT NULL,
  `NtCt_FchaCrcn` datetime NOT NULL,
  `NtCt_FchaMdfc` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_Resoluciones` (
  `Rslc_IDResolucion` int(11) NOT NULL,
  `Rslc_Nombre` varchar(500) NOT NULL,
  `Rslc_Estatus` bit(1) NOT NULL,
  `Rslc_FchaCrcn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Srfl_VstsNtca` (
  `VsNt_IDVstsNtca` int(11) NOT NULL,
  `VsNt_IDNoticia` int(11) NOT NULL,
  `VsNt_Estatus` bit(1) NOT NULL,
  `VsNt_FchaCrcn` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `Srfl_Categoria`
  ADD PRIMARY KEY (`Ctgr_IDCategoria`);

--
-- Indices de la tabla `Srfl_Comentarios`
--
ALTER TABLE `Srfl_Comentarios`
  ADD PRIMARY KEY (`Cmnt_IDComentario`);

--
-- Indices de la tabla `Srfl_Contacto`
--
ALTER TABLE `Srfl_Contacto`
  ADD PRIMARY KEY (`Cntc_IDContacto`);

--
-- Indices de la tabla `Srfl_CtEsttPblc`
--
ALTER TABLE `Srfl_CtEsttPblc`
  ADD PRIMARY KEY (`EsPl_IDCtEsttPblc`);

--
-- Indices de la tabla `Srfl_CtlgTipoCtgr`
--
ALTER TABLE `Srfl_CtlgTipoCtgr`
  ADD PRIMARY KEY (`TpCt_IDCtlgTipoCtgr`);

--
-- Indices de la tabla `Srfl_Imagenes`
--
ALTER TABLE `Srfl_Imagenes`
  ADD PRIMARY KEY (`Imgn_IDImagen`);

--
-- Indices de la tabla `Srfl_Noticias`
--
ALTER TABLE `Srfl_Noticias`
  ADD PRIMARY KEY (`Ntcs_IDNoticia`);

--
-- Indices de la tabla `Srfl_NtcsCtgr`
--
ALTER TABLE `Srfl_NtcsCtgr`
  ADD PRIMARY KEY (`NtCt_IDNtcsCtgr`);

--
-- Indices de la tabla `Srfl_Resoluciones`
--
ALTER TABLE `Srfl_Resoluciones`
  ADD PRIMARY KEY (`Rslc_IDResolucion`);

--
-- Indices de la tabla `Srfl_VstsNtca`
--
ALTER TABLE `Srfl_VstsNtca`
  ADD PRIMARY KEY (`VsNt_IDVstsNtca`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Srfl_Categoria`
--
ALTER TABLE `Srfl_Categoria`
  MODIFY `Ctgr_IDCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_Comentarios`
--
ALTER TABLE `Srfl_Comentarios`
  MODIFY `Cmnt_IDComentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_Contacto`
--
ALTER TABLE `Srfl_Contacto`
  MODIFY `Cntc_IDContacto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_CtEsttPblc`
--
ALTER TABLE `Srfl_CtEsttPblc`
  MODIFY `EsPl_IDCtEsttPblc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_CtlgTipoCtgr`
--
ALTER TABLE `Srfl_CtlgTipoCtgr`
  MODIFY `TpCt_IDCtlgTipoCtgr` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_Imagenes`
--
ALTER TABLE `Srfl_Imagenes`
  MODIFY `Imgn_IDImagen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_Noticias`
--
ALTER TABLE `Srfl_Noticias`
  MODIFY `Ntcs_IDNoticia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_NtcsCtgr`
--
ALTER TABLE `Srfl_NtcsCtgr`
  MODIFY `NtCt_IDNtcsCtgr` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_Resoluciones`
--
ALTER TABLE `Srfl_Resoluciones`
  MODIFY `Rslc_IDResolucion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Srfl_VstsNtca`
--
ALTER TABLE `Srfl_VstsNtca`
  MODIFY `VsNt_IDVstsNtca` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;


