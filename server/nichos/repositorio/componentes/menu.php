<?php 
   $menu = json_decode(file_get_contents('assets/json/menu.json'), false);
?>

<header class="site-header">
   <div class="container h-60">
   <!--<i class="fa-solid fa-align-justify"></i>-->
      <div class="row justify-content align-center-items-lg align-center-lt-lg h-100-p">
       <div>
         <!--Aqui va el logo-->
            <a href="/">
              <?php
                 echo "<img src=\"".$configuracion->logo."\" class=\"px-8\" />";
              ?>
            </a>
       </div>
       <div class="input-search">
         <!--Aqui va el buscador-->
         <input type="text" placeholder="Buscar" class="input-search-text"/>
         <i class="fa-solid fa-magnifying-glass" style="cursor: pointer; color: gray;" onclick="buscador()"></i>
       </div>
       <div class="nav-active">
         <div class="show-mobile-menu white-fg">
            <i class="fa-solid fa-align-justify pointer" onClick="expandMenu();"></i>
         </div>
         <!--Aqui va el menu de opciones-->
         <ul class="menu">
          <?php 
            foreach($menu as $key=> $valor){
                echo "<li class=\"link-menu\">";
                if(empty($valor->children)){
                    echo "<a href=\"".$valor->url."\" >
                            <span class=\"menu-title\">".$valor->name."</span>
                          </a>";
                }

                if(!empty($valor->children)){
                    echo "<a>
                            <span class=\"menu-title\">".$valor->name."</span>
                         </a>
                        <ul class=\"menu-dropdown\">";
                        foreach($valor->children as $key => $submenu){
                            echo "<li>
                                    <a href=\"".$submenu->url."\">".$submenu->name."</a>
                                </li>";
                        }
                    echo "</ul>"; 
                }
                echo "</li>";
            }
          ?>
        </ul>
          <!--Menú responsivo-->
          <div class="slide-menu">
            <div class="slide-menu-header">
                <div class="col-10 flex-center">
                    <strong class="white-fg font-size-20">Menú</strong>
                </div>
                <div class="col-2 flex-center">
                   <i class="fa-sharp fa-solid fa-circle-xmark icon-menu pointer font-size-20 white-fg" onclick="expandMenu();"></i>
                </div>
            </div>
            <div class="slide-menu-flex">
                <div class="mobile-menu">
                    <ul class="main-mobile-nav">
                        <?php
                            foreach($menu as $key=> $valor){
                                if(empty($valor->children)){
                                    echo "<li>
                                            <a href=\"".$valor->url."\">".$valor->name."</a>";
                                }
                            
                            if(!empty($valor->children)){
                                echo "<li class=\"has-sub\" onclick=\"expandSubMenu(this)\">
                                            <a>".$valor->name."</a>
                                            <ul class=\"sub-menu m-sub\">";
                                foreach($valor->children as $key => $submenu){
                                            echo "<li>
                                                    <a  href=\"".$submenu->url."\">".$submenu->name."</a>
                                                </li>";

                                }
                                echo "</ul>
                                        <div class=\"submenu-toggle\"></div>";
                            }
                            echo "</li>";
                            } 
                        ?>
                    </ul>
                </div>
            </div>
          </div>
       </div>
      </div>
   </div>
</header>
<!-- The Modal -->
<div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
    <!--<span class="close" onclick="closeModal();">&times;</span>
    <p>Some text in the Modal..</p>-->
    </div>
</div>