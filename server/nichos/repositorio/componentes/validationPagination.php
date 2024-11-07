<?php 
 $noFound = false;
 $totPages = (int)($totalNoticias / $paginationValidation->paginasMostrar);  
  /**Si es diferenye de cero quiere decir que se debe de agregar una pagina extra*/
  if(($totalNoticias % $paginationValidation->paginasMostrar) != 0) $totPages++;

  $prefixValidation = $paginationValidation->mask;
  $valuesValidation = explode("/", $prefixValidation);
  
  foreach ($valuesValidation as $key => $valor){
      if($valor == '#'){
        $posicionValorValidation = $key;
      }
  }

  $pageValidation = (int)explode("/",$request_final[0])[$posicionValorValidation];
  if($totPages < $pageValidation){
     $noFound = true; 
  }
?>