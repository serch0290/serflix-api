<?php
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    //Rutas definidas del proyecto
    include_once 'routing.php';

    //var_dump($_SERVER);Como estye puedo saber las variables del servidor
    
    $request = $_SERVER["REQUEST_URI"];
    //Quitamos las variables que puedan llegar por url
    $request_final = explode("?", $request);
    
    /**Validar si la pagina tiene paginacion y si exista esa apgian de paginacion*/
    if(strpos($request_final[0], 'pagina') != false){
       $request_final_validation = explode('/pagina/',$request_final[0]);
       $request_final = $request_final_validation;
       $isPagination = true;
    }

    /**Obtenemos el objeto pagination para ver su configuración */
    function getPagination($obj){
        foreach ($obj as $attribute) {
            if (is_object($attribute)){
                if(empty(get_object_vars($attribute)['pagination'])){
                   return getPagination(get_object_vars($attribute));
                }else{
                   return $attribute->pagination;
                }
            }
        }
    }

    if (isset($_GET["b"])){
        $parametro = $_GET["b"]; 
        include __DIR__.'/pages/sp_buscador.php';
        return;
    }

    if(strpos($request_final[0], '/php/')!= false){
       include __DIR__.'/assets/php/guardarComentario.php';
       return;
    }

    /**Configuración general del sitio */
    $configuracion = json_decode(file_get_contents('assets/json/configuracionGeneral.json'), false);

        // Verificar si hay página o no
    if(isset($rutas[$request_final[0]])) {
        // Incluir el PHP adecuado
        include __DIR__ . '/pages/' . $rutas[$request_final[0]][1];
    } else {
        // La página no existe
        http_response_code(404);
        include __DIR__ . '/pages/sp_error_404.php';
    }
?>
