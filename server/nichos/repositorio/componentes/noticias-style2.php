<div class="column">
     <?php
     foreach ($rowNoticiasCategoriaTodos as $noticia) {  
        echo "<article class=\"article-style2\">
                <a class=\"container-noticia\" href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$noticia["url"]."\">
                <div class=\"container-imagen article-content-image\">
                    <div style=\"background-image: url('".$noticia["imagen"]."');\" class=\"image article-image\"></div>
                </div>
                <div class=\"article-content\">
                    <h2 class=\"title-article-content\">
                        <strong>".$noticia["titulo"]."</strong>
                    </h2>
                    <h3>".$noticia["descripcion"]."</h3>
                    <h4>".$noticia["fecha"]."</h4>
                </div>
                </a>
              </article>";
     }
     ?>
</div>