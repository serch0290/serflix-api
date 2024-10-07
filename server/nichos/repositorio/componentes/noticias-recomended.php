<?php
  //Obtenemos toda la configuración de la noticia
  $filePathRecomended = 'assets/json/serflix/noticias-recomended.json';
  $noticia_recomended = null;
  if (file_exists($filePathRecomended)) {
      $noticia_recomended = json_decode(file_get_contents($filePathRecomended), false);
  }
?>
<div class="column" id="recommended-news">
    <?php if(!empty($noticia_recomended)){ ?>
    <p class="title-section">
         <strong><?php echo $noticia_recomended->title; ?></strong>
    </p>
    <?php 
    $i = (count($rowNoticias) <= 3) ? count($rowNoticias) : 3;
    for($j=0; $j < $i; $j++){
        echo "<div class=\"post-thumbnail\">
                <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.$rowNoticias[$j]["url"]."\">
                    <div class=\"container-imagen thumbnail-image\">
                        <div style=\"background-image: url('".$rowNoticias[$j]["imagen"]."');\" class=\"image thumbnail-image-detail\"></div>
                    </div>
                    <div class=\"thumbnail-content\">
                    <div class=\"h-80-p text-justify align-center flex\">
                        <h2>".$rowNoticias[$j]["titulo"]."</h2>
                    </div>
                    <div class=\"h-20-p text-right\">
                        <span class=\"thumbnail-text\">
                            Leer más
                            <i class=\"fa-solid fa-right-long\"></i>
                        </span>
                    </div>
                    </div>
                </a>
            </div>";
    }
   }
    ?>
</div>