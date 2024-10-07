$(function() {
    scrollTop();
    $(window).on('scroll', function(e) {
        if($(window).scrollTop() >= 200){
            $('.icon-top').addClass('icon-top-visible');
        }else{
            $('.icon-top').removeClass('icon-top-visible');
        }
    });

    let cookie = getCookie('SF_COOKIE_CONSENT');
    if(!cookie){
       $('.cookies').css('display', 'block'); 
    }
});

function scrollTop(){
    let data = window.location.hash;
    if(!data){
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    }
}

/**
 * Se va al inicio de la página
 */
function irInicio(){
    $("html, body").animate({
        scrollTop: 0
    }, 1000);
}


function showModal(mensaje){
  $("#myModal").css('display', 'block');
  $(".modal-content").html(`<span class=\"close\" onclick=\"closeModal();\">&times;</span>
     <p>${mensaje}</p>
  `);
}//Fin del metodo

function closeModal(){
    $("#myModal").css('display', 'none');
    $("#myModal").html('');
}


function setCookie(name, expireDays, value){
    var path = '';
    var d = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    var expires = `expires=${d.toUTCString()}`;
    let cpath = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
}

function getCookie(name){
    let ca = document.cookie.split(';');
    let caLen = ca.length;
    let cookieName = `${name}=`;
    let c;

    for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
}

function _setCookie(){
    setCookie('SF_COOKIE_CONSENT', 30, '1');
    $('.cookies').css('display', 'none'); 
}

function deleteCookie(){
    setCookie('SF_COOKIE_CONSENT', -1, '');
}

/**Redirecciona a la vista del buscador */
function buscador(){
    var buscador = $(".input-search").val();
    console.log('buscador: ', buscador);

    if(buscador){
       window.location.href = "http://localhost:8080/serflix/?b="+buscador;
    }
}