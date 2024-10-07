function mostrarAcordeon(){
    if($('.table-contents').hasClass('actived')){
        $('.table-contents').css('max-height','25px');
        $('.table-contents').removeClass('actived');
    }else{
        let height = $('.list-contents').get(0).scrollHeight + 55;
        $('.table-contents').css('max-height', height + 'px').css('transition', 'max-height 0.25s ease-in');
        $('.table-contents').addClass('actived');
    }
}

function irDetalleNoticia(){
    let data = window.location.hash;
    if(data){
        $("html, body").animate({
            scrollTop: $(data).offset().top - 70
        }, 1000);
    }
    
}