<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
  
    //Obtenemos toda la configuración de la noticia
    $noticia_style1 = $home->noticias_style1;

    /**Si la pagina lleva paginacion se incluye las reglas del negocio */
    if(!empty($noticia_style1->pagination)){
        $pagination = $noticia_style1->pagination;
        include_once 'componentes/process-paginacion.php';
    }

?>

<p class="title-section">
    <strong>
    <strong><?php echo $noticia_style1->title; ?></strong>
    </strong>
  </p>
  <div class="row wrap">
      <?php 
        if(count($rowNoticiasCompleto) == 0){
            echo "<span>Sin información</span>";
        }
        for($k=0; $k < count($rowNoticiasCompleto); $k++){
            if($noticia_style1->pagination){
               if($limiteInferiorNoticias <= $k && $limiteSuperiorNoticias >= $k){
                  echo "<div class=\"col-sm-4 col-xs-6 mb-10 col-12\">
                          <article class=\"article\">
                            <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$rowNoticiasCompleto[$k]["url"]."\">
                              <div class=\"container-noticia\">
                                <div class=\"container-imagen article-content-image\">
                                    <div style=\"background-image: url('".$rowNoticiasCompleto[$k]["imagen"]."');\" class=\"image article-image\"></div>
                                    <div class=\"content-item-category\">
                                      <strong>".$rowNoticiasCompleto[$k]["categoria"]."</strong>
                                    </div>
                                </div>
                                <div class=\"article-content align-center-items\">
                                  <h2 class=\"title-article-content\">".$rowNoticiasCompleto[$k]["titulo"]."</h2>
                                  <h4 class=\"date-title\">".$rowNoticiasCompleto[$k]["fecha"]."</h4>
                                </div>
                              </div>
                            </a>
                          </article>
                  </div>";
              }
            }else{
              echo "<div class=\"col-sm-4 col-xs-6 mb-10 col-12\">
                      <article class=\"article\">
                        <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$rowNoticiasCompleto[$k]["url"]."\">
                          <div class=\"container-noticia\">
                            <div class=\"container-imagen article-content-image\">
                                <div style=\"background-image: url('".$rowNoticiasCompleto[$k]["imagen"]."');\" class=\"image article-image\"></div>
                                <div class=\"content-item-category\">
                                  <strong>".$rowNoticiasCompleto[$k]["categoria"]."</strong>
                                </div>
                            </div>
                            <div class=\"article-content align-center-items\">
                              <h2 class=\"title-article-content\">".$rowNoticiasCompleto[$k]["titulo"]."</h2>
                              <h4 class=\"date-title\">".$rowNoticiasCompleto[$k]["fecha"]."</h4>
                            </div>
                          </div>
                        </a>
                      </article>
                </div>";
            }
        }
      ?>
    </div>
    <?php 
        if(!empty($noticia_style1->pagination)){ 
           include_once 'componentes/footer-pagination.php';
        }
    ?>
    