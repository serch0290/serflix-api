<?php 
    foreach ($rowNoticiasCategoria as $noticia) {
        echo "<div class=\"col-lx-4 col-xs-6 col-12\">
                  <article class=\"article-feature\">
                     <a class=\"category-detalle\" href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.$noticia["url"]."\">
                        <div style=\"background-image: url('".$noticia["imagen"]."');\" class=\"image image-group\">
                            <div class=\"content-item-category\">
                                <strong>".$noticia["categoria"]."</strong>
                            </div>
                            <h2 class=\"title-text-category\">".$noticia["descripcion"]."</h2>
                        </div>
                      </a>
                  </article>
              </div>";
        }
?>
