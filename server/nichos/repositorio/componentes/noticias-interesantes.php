
<?php 
   require_once('assets/php/lib/Conexion.php');
   $conexion = new Conexion();
   $conn = $conexion->connect();
   $conn->query("SET lc_time_names = 'es_ES'");

   $sql = "SELECT Ntcs_IDNoticia idNoticia, 
                  Ntcs_Titulo titulo, 
                  Ntcs_Descripcion descripcion, 
                  Ntcs_Url url, 
                  DATE_FORMAT(Ntcs_FchaCrcn, \"%d de %b del %Y\") fecha, 
                  Ctgr_Nombre categoria,
                  (SELECT Imgn_Url 
                  FROM Srfl_Imagenes 
                  WHERE Imgn_IDNoticia = Ntcs_IDNoticia 
                  AND Imgn_IDResolucion = 1 AND Imgn_Estatus = 1) imagen
            FROM Srfl_Noticias 
            INNER JOIN Srfl_NtcsCtgr ON NtCt_IDNoticia = Ntcs_IDNoticia AND NtCt_Estatus = 1 
            INNER JOIN Srfl_Categoria ON Ctgr_IDCategoria = NtCt_IDCategoria AND Ctgr_Estatus = 1 
            WHERE Ntcs_Estatus = 1 AND Ntcs_EsttPblc = 2
            ORDER BY RAND() LIMIT 0,3;";

  $noticiasRelevantes = $conn->query($sql);
?>

<p class="title-section">Tal vez te puede interesar</p>
<div class="row wrap">
    <?php 
        while($row = $noticiasRelevantes->fetch_assoc()) {
          echo "<div class=\"col-md-4 col-xs-6 col-12 mb-20\">
                    <article class=\"article\">
                      <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.$row["url"]."\">
                        <div class=\"container-noticia\">
                          <div class=\"container-imagen article-content-image\">
                              <div style=\"background-image: url('".$row["imagen"]."');\" class=\"image article-image\"></div>
                              <div class=\"content-item-category\">
                                <strong>".$row["categoria"]."</strong>
                              </div>
                          </div>
                          <div class=\"article-content align-center-items\">
                            <h2 class=\"title-article-content\">".$row["titulo"]."</h2>
                            <h4 class=\"date-title\">".$row["fecha"]."</h4>
                          </div>
                        </div>
                      </a>
                    </article>
                </div>";
        }
    ?>
</div>