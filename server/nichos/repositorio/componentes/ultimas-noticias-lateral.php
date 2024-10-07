<div fxLayout="column">
    <p class="title-section">
      <strong>
         <?php echo $noticiasLateral->title; ?>
      </strong>
    </p>

    <?php 
       foreach ($noticiasRecientes as $noticia) {
          echo "<article class=\"article-reciente\">
                    <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.$noticia["url"]."\">
                      <div class=\"container-imagen thumbnail-ultimas-noticias\">
                              <div style=\"background-image: url('".$noticia["imagen"]."');\" class=\"image thumbnail-image-ultimas-noticias\"></div>
                        </div>
                        <div class=\"thumbnail-content-ultimas-noticias\">
                          <p><strong>".$noticia["titulo"]."</strong></p>
                        </div>
                    </a>
                </article>";
       }
    ?>
</div>