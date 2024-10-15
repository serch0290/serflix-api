<p class="title-section">
   <strong><?php echo $intereses->title; ?></strong>
</p>
<ul class="intereses">
    <?php 
      if(count($rowNoticiasCategoriaInteresantes) > 0){
         foreach ($rowNoticiasCategoriaInteresantes as $noticia) {
            echo "<li>
                      <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.$noticia["url"]."\">".$noticia["titulo"]."</a>
                  </li>";
         }
      }else{
        echo "<span>Sin información</span>";
      }
      
    ?>
</ul>