<?php
  $conn->query("SET lc_time_names = 'es_ES'");
  $sql = "SELECT Cmnt_Comentario comentario,
                 Cmnt_Nombre nombre,
                 DATE_FORMAT(Cmnt_FchaCrcn, \"%d de %b del %Y\") fecha
          FROM Srfl_Comentarios
          WHERE Cmnt_EsttCmnt = 1 AND Cmnt_IDNoticia = ".$noticia->idNoticia;
  $result = $conn->query($sql);
?>
<div class="comentarios">
    <p class="title-section">
        <strong>Comentarios</strong>
    </p>
       <?php 
          $i = 0;
          if ($result->num_rows > 0) {
            echo "<div class=\"comment-list\">";
            while($row = $result->fetch_assoc()) {
                ++$i;
                $class = ($i % 2 == 0) ? 'align-end-items' : '';
                echo "<div class=\"author-box ".$class."\">
                        <div class=\"author-box-photo-comentario\">
                          <img src=\"assets/images/sin-foto.png\" />
                        </div>  
                        <div class=\"author-box-comment\">
                            <strong>".$row["nombre"]."</strong>
                            <p>".$row["comentario"]."</p>
                            <p class=\"date-comment\">".$row["fecha"]."</p>
                        </div>  
                      </div>"; 
            }
            echo "</div>";
          }
       ?>
    <p>Deja un comentario</p>
    <div class="column">
        <div class="row-xs column">
            <div class="w-50-p-xs mr-10-xs mb-10-lt-xs">
                <input type="text" id="nombre" placeholder="Nombre" class="form-control"/>
            </div>
            <div class="w-50-p-xs">
               <input type="text" id="email" placeholder="Correo Electrónico" class="form-control"/>
               <input  type="hidden" id="idComentario" value="<?php echo $noticia->idNoticia;?>">
            </div>
        </div>
        <div style="margin-top: 20px">
            <textarea rows="8" id="mensaje" class="form-control" placeholder="Comentario"></textarea>
        </div>
        <div class="column p-10">
            <div class="row-xs mb-20">
                <div class="flex w-50-p-xs">
                   <label class="check-aviso-privacidad"><input type="checkbox" id="check-aviso" /> He leído y acepto la <a>Política de Privacidad.</a></label><br />
                </div>
                <div class="flex align-end-items w-50-p-xs">
                   <button class="button-noticia" onclick="guardarComentario()">Publicar Comentario</button>
                </div>
            </div>
            
            <span>Información sobre protección de datos</span>
            <span><strong>Responsable:</strong> <?php echo $noticia->author->autor; ?></span>
            <span><strong>Finalidad:</strong> Moderar los comentarios</span>
            <span><strong>Legitimación:</strong> Por consentimiento del interesado.</span>
            <span><strong>Derechos:</strong> Rectificar y suprimir los comentarios.</span>
            <span>Puede consultar la información detallada en nuestro <a>Política de Privacidad.</a></span>
        </div>
    </div>
</div>