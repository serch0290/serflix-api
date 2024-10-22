<p class="title-section">
   <strong><?php echo $intereses->title; ?></strong>
</p>
<ul class="intereses">
    <?php 
      foreach ($rowNoticiasCategoriaInteresantes as $noticia) {
        echo "<li>
                    <a href=\"".$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$noticia["url"]."\">".$noticia["titulo"]."</a>
              </li>";
      }
    ?>
</ul>