/**Funcion que expande o regresa el menu responsivo */
function expandSubMenu(elemento){
   if($(elemento).hasClass("actived")){
      $(elemento.querySelectorAll('.sub-menu')[0]).css('height', "0");
      $(elemento).removeClass('actived');
    }else{
     let height = elemento.querySelectorAll('.sub-menu')[0].scrollHeight;
     $(elemento.querySelectorAll('.sub-menu')[0]).css('height', height + "px");
     $(elemento).addClass('actived');
   }
}

/**Funcion que expande todo el menú o lo regresa*/
function expandMenu(){
    if($('.slide-menu').hasClass('actived')){
        $('.slide-menu').css('width', "0");
        $('.slide-menu').removeClass('actived');
    }else{
        $('.slide-menu').css('width', "300px");
        $('.slide-menu').addClass('actived');
    }
 
}