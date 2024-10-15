<?php
  require_once('assets/php/lib/Conexion.php');
  $request = $_SERVER["REQUEST_URI"];
  //Quitamos las variables que puedan llegar por url
  $request_final = explode("?", $request);
  //Obtenemos toda la configuración de la noticia
  $category = json_decode(file_get_contents('assets/json' . $request_final[0] . '.json'), false);

  $conexion = new Conexion();
  $conn = $conexion->connect();
  $conn->query("SET lc_time_names = 'es_ES'");
  $sql_categoria = "(SELECT Ntcs_IDNoticia idNoticia, 
                        Ntcs_Titulo titulo, 
                        Ntcs_Descripcion descripcion, 
                        Ntcs_Url url, 
                        DATE_FORMAT(Ntcs_FchaCrcn, \"%d de %b del %Y\") fecha, 
                        NtCt_IDCategoria idCategoria,
                        Ctgr_Nombre categoria,
                        (SELECT Imgn_Url 
                           FROM Srfl_Imagenes 
                           WHERE Imgn_IDNoticia = Ntcs_IDNoticia 
                           AND Imgn_IDResolucion = 1 AND Imgn_Estatus = 1) imagen,
                           IFNULL(Ntcs_TipoCtgr, 0) tipoNoticia,
                        IFNULL((SELECT COUNT(VsNt_IDNoticia) 
                                FROM Srfl_VstsNtca 
                                WHERE VsNt_IDNoticia = Ntcs_IDNoticia AND VsNt_Estatus = 1), 0) vistas,
                        1 tipo
                        FROM Srfl_Noticias 
                        INNER JOIN Srfl_NtcsCtgr ON NtCt_IDNoticia = Ntcs_IDNoticia AND NtCt_Estatus = 1 AND NtCt_IDCategoria = ".$category->idCategoria."
                        INNER JOIN Srfl_Categoria ON Ctgr_IDCategoria = NtCt_IDCategoria AND Ctgr_Estatus = 1 
                        WHERE Ntcs_Estatus = 1
                        AND Ntcs_EsttPblc = 2 ORDER BY vistas DESC, Ntcs_IDNoticia DESC) UNION
                        (SELECT Ntcs_IDNoticia idNoticia, 
                                Ntcs_Titulo titulo, 
                                Ntcs_Descripcion descripcion, 
                                Ntcs_Url url, 
                                DATE_FORMAT(Ntcs_FchaCrcn, \"%d de %b del %Y\") fecha, 
                                NtCt_IDCategoria idCategoria, 
                                Ctgr_Nombre categoria,
                                (SELECT Imgn_Url 
                                 FROM Srfl_Imagenes 
                                 WHERE Imgn_IDNoticia = Ntcs_IDNoticia 
                                 AND Imgn_IDResolucion = 1 AND Imgn_Estatus = 1) imagen,
                                 IFNULL(Ntcs_TipoCtgr, 0) tipoNoticia,
                                 0,
                                 2 tipo
                        FROM Srfl_Noticias 
                        INNER JOIN Srfl_NtcsCtgr ON NtCt_IDNoticia = Ntcs_IDNoticia AND NtCt_Estatus = 1
                        INNER JOIN Srfl_Categoria ON Ctgr_IDCategoria = NtCt_IDCategoria AND Ctgr_Estatus = 1 
                              AND NOT Ctgr_IDCategoria = ".$category->idCategoria."
                        WHERE Ntcs_Estatus = 1 AND Ntcs_EsttPblc = 2
                        ORDER BY RAND() LIMIT 0,5) ORDER BY tipo ASC, vistas DESC, idNoticia DESC";

   $resultNoticiasCategoria = $conn->query($sql_categoria);    
   $rowNoticias = mysqli_fetch_all($resultNoticiasCategoria, MYSQLI_ASSOC);  

   $idCategoria = $category->idCategoria;

   /**Filtramos por todas las noticias de la categoria */
   $rowNoticiasCategoria = array_values(array_filter($rowNoticias, function($value) use($idCategoria){
      return (int)$value['idCategoria'] == $idCategoria;
   }));

   /**Filtramos por todas las noticias que ban abajo de ultimas noticias*/
   $rowNoticiasCategoriaInteresantes = array_values(array_filter($rowNoticias, function($value) use($idCategoria){
      return (int)$value['idCategoria'] != $idCategoria;
   }));

   $intereses = $category->intereses;

   $rowNoticiasCategoriaTodos = array_merge(array(), $rowNoticiasCategoria);

    /**Se guarda h1 en variable */
    $h1 = $category->h1;

    array_splice($rowNoticiasCategoria, 3);//Se queda con las primeras tres noticias
    array_splice($rowNoticiasCategoriaTodos, 0, 3);

    /**Las noticias que quedaron los ordemos de forma descendente */
    usort($rowNoticiasCategoriaTodos, function($a, $b){
         if ($a["idNoticia"] == $b["idNoticia"])
             return (0);
         return (($a["idNoticia"] > $b["idNoticia"]) ? -1 : 1);
    });
    $noticiasRecientes = array_merge(array(), $rowNoticiasCategoriaTodos);

    array_splice($noticiasRecientes, 5);
    array_splice($rowNoticiasCategoriaTodos, 0, 5);
    $noticiasLateral = $category->noticiasLateral;
?>

<!doctype html>
<html lang="es"> 
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
      <link  rel="stylesheet" href="/serflix/assets/css/dynamic.css">
      <link  rel="stylesheet" href="/serflix/assets/css/general.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/menu.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/noticias-style2.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/noticias-group.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/ultimas-noticias-lateral.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/intereses.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/footer.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/cookies.css">
      <link  rel="stylesheet" href="/serflix/assets/css/components/breadcrums.css">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" >
  </head>  
  <body>
  <?php include_once 'componentes/menu.php';?>
  <div class="column">
      <!--Sección de noticias estilo tipo 1-->
      <div class="container container-xs">
         <!-- Mnesjae principal de la pagina h1 -->
         <?php if($configuracion->mensajePrincipal){ include_once 'componentes/content-home.php'; }?>

         <ul class="breadcrums">
            <?php 
               foreach ($category->breadcrumb as $breadcrumb => $valor) {
                  if(!empty($valor->link))
                     echo "<li><a href=\"{$valor->link}\">{$valor->name}</a></li>";
                  else
                     echo "<li><span>{$valor->name}</span></li>";
               }
            ?>
         </ul>
         
         <div class="row-xs wrap-xs column align-center-item-xs mt-10">
               <?php include 'componentes/noticias-group.php'; ?>
         </div>
         <div class="row-lx column mt-20">
            <div class="col-lx-8">
               <?php include_once 'componentes/noticias-style2.php'; ?>
            </div>
            <div class="col-lx-4">
               <div class="w-100-p mx-20">
                  <?php include_once 'componentes/ultimas-noticias-lateral.php'; ?>
               </div>
               <div class="w-100-p mx-20">
                  <?php include_once 'componentes/intereses.php'; ?>
               </div>
            </div>
         </div>
    </div>

  </div>
  <?php include_once 'componentes/cookies.php';?>
  <?php include_once 'componentes/footer.php';?>
  </body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" type="text/javascript"></script>
  <script type="text/javascript" src="/serflix/assets/js/main.js"></script>
  <script type="text/javascript" src="/serflix/assets/js/menu.js"></script>
</html>
<?php 
    $conn->close();
?>
