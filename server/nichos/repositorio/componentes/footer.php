<?php

   $footer = json_decode(file_get_contents('assets/json/footer_'.$versionMenu.'.json'), false);

?>

<div class="icon-top align-center-items flex" onclick="irInicio()">
    <i class="fa-solid fa-caret-up"></i>
</div>
<footer>
  <div class="container">
    <div class="content-footer">
        <div class="logo-footer">
            <a hfer="/">
              <?php
                 echo "<img src=\"".$configuracion->logo."\"/>";
              ?>
            </a>
        </div>
        <div class="widget-area">
            <ul class="menu-footer">
                <?php 
                  foreach($footer as $key=> $valor){
                    echo "<li>
                              <a href=\"".$valor->url."\">".$valor->name."</a>
                         </li>";
                  }
                ?>
            </ul>
        </div>
    </div>
  </div>
</footer>
