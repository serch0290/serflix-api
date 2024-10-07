<?php
        $prefix = $pagination->mask;
        $values = explode("/", $prefix);
        $posicionValor = 0;
        $page = 0;
        $limiteInferior = 0;
        $limiteSuperior = 0;
        $totalNoticias = $pagination->total;
        $total_pages = (int)($totalNoticias / $pagination->paginasMostrar);  
      

        /**Si es diferenye de cero quiere decir que se debe de agregar una pagina extra*/
        if(($totalNoticias % $pagination->paginasMostrar) != 0) $total_pages++;
        foreach ($values as $key => $valor){
          if($valor == '#'){
            $posicionValor = $key;
          }
        }

        if (str_contains($request_final[0], $pagination->name)) {
            $page = (int)explode("/",$request_final[0])[$posicionValor];//obtener el valos de la pagina en la url
        }else{
            $page = 1; //Si no tienen el prefijo quiere decir que estamos en la primera pagina
        }
        
        /* Obtenemos el limite inferior*/
        if(($page - 2) >= 1){
            $limiteInferior = ($page - 2);
        }else if(($page - 1) >= 1){
            $limiteInferior = ($page - 1);
        }else{
            $limiteInferior = $page;
        }

        for($m = 4; $m >= 1; $m--){
            if(($limiteInferior + $m) <= $total_pages){
                $limiteSuperior = ($limiteInferior + $m);
                break;
            }

            if($m == 1 && $limiteInferior > 1){
              $limiteInferior = $total_pages - 4;
              $limiteSuperior = $total_pages;
            }else{
              $limiteSuperior = 1;
            }
        }

        $limiteSuperiorNoticias = ($page * 6);
        $limiteInferiorNoticias = ($limiteSuperiorNoticias - 6);
        if($limiteSuperiorNoticias > $totalNoticias){
          $limiteSuperiorNoticias = $totalNoticias;
        }else{
          $limiteSuperiorNoticias--;
        }
?>