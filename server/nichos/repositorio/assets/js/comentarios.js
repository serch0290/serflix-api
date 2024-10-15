function guardarComentario(){
	event.preventDefault();
	let nombre = $('#nombre').val();
	let email = $('#email').val();
	let mensaje = $('#mensaje').val();
	let id = $('#idComentario').val();
	console.log('idComentario: ', id);
	var avisoPrivacidad = $("#check-aviso").is(":checked");

	if(!avisoPrivacidad){
	   showModal('Debes aceptar el aviso de privacidad');
	   return;
	}

	if(!nombre){
	   showModal('Favor de introducir el nombre');
	   return;
	}

	if(!email){
	   showModal('Favor de introducir un email');
	   return;
	}

	let validateEmail = /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
	if(!validateEmail){
		showModal('Email tiene nomenclatura incorrecta');
		return;
	 }
	
	if(!mensaje){
	   showModal('Favor de introducion el mensaje');
	   return;
	}

	$.ajax({
		type: 'POST',
		url: 'http://localhost/serflix/assets/php/guardarComentarios.php',
		data:{name:nombre,  email: email, comment: mensaje, id: id},
		success: function (response) {
			showModal('Agradecemos tu participación.<br> Tu comentario está siendo validado.');
			$('#nombre').val('');
	        $('#email').val('');
	        $('#mensaje').val('');
		},error: function(respose){
			showModal('Ocurrió un error al guardar comentario, favor de intentar más tarde.');
		}
	});
}

function guardarContacto(){
    event.preventDefault();
	let nombre = $('#name').val();
	let email = $('#mail').val();
    let asunto = $("#asunto").val();
	let comentario = $('#comentario').val();

	if(!nombre){
	   showModal('Favor de capturar nombre');
	   return;
	}

	if(!email){
	   showModal('Favor de capturar email');
	   return;
	}

	if(!asunto){
		showModal('Favor de capturar asunto.');
		return;
	 }

	let validateEmail = /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
	if(!validateEmail){
		showModal('El correo electrónico que ingresaste no tiene un formato válido. Por favor, revisa la dirección e intenta nuevamente.');
		return;
	}
	
	if(!comentario){
	   showModal('Favor de capturar el mensaje');
	   return;
	}

	$.ajax({
		type: 'POST',
		url: 'http://localhost/serflix/assets/php/guardarContacto.php',
		data:{name:nombre, asunto: asunto, email: email, comment: comentario},
		success: function (response) {
			showModal('Gracias por contactarnos.<br>Lo hemos recibido y lo revisaremos a la brevedad. Nos pondremos en contacto contigo si es necesario.');
			$('#name').val('');
	        $('#mail').val('');
	        $('#asunto').val('');
            $('#comentario').val('');
		}
	});
}//Fin del metodo