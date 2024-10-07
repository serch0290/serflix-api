<article class="column">
    <h1><?php echo $noticia->h1; ?></h1>
    <div class="author w-100-p">
        <div class="author-image">
            <?php echo "<img src=\"".$noticia->author->img."\" />"; ?>
        </div>
        <div class="author-name">
           <?php echo "<span>".$noticia->author->autor."</span>";?>
           
        </div>
    </div>
    <div class="content-box">
        <?php
           foreach($detalleNoticia as $detalle){
              switch($detalle->type){
                 case 'img':
                  echo "<div class=\"thumbail\">
                            <img src=\"".$detalle->img."\" 
                                srcset=\"".$detalle->img800. " 800w, " .$detalle->img400. " 400w, " .$detalle->img." 1024w\"
                                sizes=\"(max-width: 896px) 100vw, 1024px\"
                                style=\"width: 100%; height: auto; object-fit: contain;\"/>
                        </div>";
                   break;
                 case 'html':
                    echo $detalle->html;
                  break;
                 case 'table-content':
                    echo "<div class=\"table-contents\">
                            <div class=\"title-table-contents\">
                                <div class=\"align-center-items flex w-10-p\"><i class=\"fa-solid fa-newspaper font-size-22\"></i></div>
                                <div class=\"text-left w-85-p font-size-16 pl-8\"><span>Contenido</span></div>
                                <div class=\"text-center w-5-p\">
                                  <div class=\"flecha-abajo pointer\" onClick=\"mostrarAcordeon();\"></div>
                                </div>
                            </div>
                            <ol class=\"list-contents\">";
                              foreach($detalle->list as $list){
                                $sublist = "";
                                if(!empty($list->sublist)){
                                   $sublist = "<ol>";
                                   foreach($list->sublist as $sub_list){
                                      $sublist .= "<li href=\"".$sub_list->hash."\">".$sub_list->name."</li>";
                                   }
                                   $sublist .= "</ol>";
                                }
                                echo "<li>
                                          <a href=\"".$list->hash."\">".$list->name."</a>
                                          ".$sublist."
                                      </li>";
                              }
                              echo "</ol></div>";
                   break;
                  case 'h2':
                  case 'h3':
                    if(!empty($detalle->class)) echo "<div class=\"".$detalle->class."\">";
                        echo "<".$detalle->type.">";
                            if(!empty($detalle->hash)) echo "<span id=\"".$detalle->hash."\">";
                              echo $detalle->data;
                            if(!empty($detalle->hash)) echo "</span>";
                        echo "</".$detalle->type.">";
                    if(!empty($detalle->class)) echo "</div>";
                    break;
                  case 'list':
                    echo "<ul class=\"list-detail-note\">";
                      foreach($detalle->list as $list){
                         echo "<li>".$list->name."</li>";
                      }
                    echo "</ul>";
                    break;
                  case 'list-number':
                    echo "<ul class=\"list-detail-pasos\">";
                        foreach($detalle->list as $list){
                          echo "<li>".$list->name."</li>";
                        }
                    echo "</ul>";
                    break;
                  case 'video':
                    echo "<div class=\"p-20\">
                            <iframe loading=\"lazy\" src=\"".$detalle->video."\" class=\"iframe-youtube\"></iframe>
                          </div>";
                    break;
              }
           }
        ?>
        <div class="enlazado">
            <span class="enlazado-title">¿Ya has leido?</span>
            <?php 
              if(count($noticiasEnlazado) > 0){
                foreach($noticiasEnlazado as $noticiaE){
                    echo "<a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.$noticiaE["url"]."\">
                            <img src=\"".$noticiaE["imagen"]."\" style=\"width: 100px; height: 100px; min-height: 100px; max-height: 100px; min-width: 100px; max-width: 100px; border: none !important; margin-right: 5px; height: auto; object-fit: cover; margin-left: 5px; object-position: center;\" />
                            <div class=\"flex align-center-items\">
                              <span style=\"padding: 5px;\">".$noticiaE["titulo"]."</span>
                            </div>
                          </a>";
                }
              }else{
                echo "<br><br>Sin noticias que leer.";
              }
            ?>
        </div>   
    </div><!--Final del content-box-->    
    <!--Redes socuales-->
    <div class="social-media wrap">
        <?php 
        if(!empty($redesSociales)){
          foreach($redesSociales as $red){
              echo "<a href=\"".$red->link.$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."\" 
                       class=\"".$red->class."\" 
                       rel=\"nofollow noopener\"
                       target=\"_blank\">
                       <i class=\"".$red->icon."\"></i>
                    </a>";
          }
         }
        ?>
    </div>

    <?php 
      if(!empty($noticia->author)){
        echo "<div class=\"author-box\" id=\"author-box\">
                  <div class=\"author-box-photo\">
                      <img src=\"".$noticia->author->img."\" />
                  </div>  
                  <div class=\"author-box-biographie\">
                      <strong>".$noticia->author->autor."</strong>
                      <p>".$noticia->author->descripcion."</p>
                  </div>  
              </div>";
      }
    ?>
    <div class="noticias-leidas">
       <p class="title-section">Lo que mas estan leyendo</p>
       <div class="row-xs wrap-xs column">
         <?php 
          if(count($noticiasRelacionado) > 0){
            foreach($noticiasRelacionado as $relacionado){
              echo "<div class=\"post-thumbnail-leido\">
                      <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.$relacionado["url"]."\">
                        <div class=\"container-imagen thumbnail-image-leido\">
                            <div style=\"background-image: url('".$relacionado["imagen"]."');\" class=\"image thumbnail-image-detail-leido\"></div>
                        </div>
                        <div class=\"thumbnail-content-leido align-center-items\">
                            <p>".$relacionado["titulo"]."</p>
                        </div>
                      </a>
                    </div>";
            } 
          }else{
            echo "<br><br>Sin noticias relacionadas";
          }
         ?>
       </div>
    </div><!--Fin de div de noticias leidas-->
    <?php if($noticia->comentarios){ ?>
        <?php include_once 'componentes/comentarios.php';?>
    <?php } ?>
    
</article>