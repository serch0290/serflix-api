<div class="pagination">
       <?php 
        if($page == 2){ 
          echo "<a class=\"prev page-numbers\" href=\"".$pagination->dominio."\">«</a>";
        }

        if($page >= 3){ 
           echo "<a class=\"prev page-numbers\" href=\"".$pagination->prefix.($page-1)."\">«</a>";
        }

        for($i = $limiteInferior; $i<= $limiteSuperior; $i++){
          if($i == $page){
             echo "<strong class=\"page-numbers\">".$i."</strong>";
          }else if($i == 1){
             echo "<a class=\"page-numbers\" href=\"". $pagination->dominio.(isset($parametro) ? '?b='.$parametro: ''). "\">".$i."</a>";
          }else{
             echo "<a class=\"page-numbers\" href=\"".$pagination->prefix.$i.(isset($parametro) ? '?b='.$parametro: '')."\">".$i."</a>";
          }
        }
        if($page < $total_pages) echo "<a class=\"next page-numbers\" href=\"".$pagination->prefix.($page+1)."\">»</a>";
       ?>
    </div>