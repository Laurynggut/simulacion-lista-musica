
$(document).ready(function(){    
  $("#login").click(function(event){ //login nos referimos al boton guardar y ya dejamos logueado al usuario
     event.preventDefault();// con esto conseguimos que no se recargue la página de nuevo desde el principio
      //Captura de datos escrito en los inputs        
      var name = $("#nombre").val();
      var password = $("#contraseña").val();
     
     
//Limpiando los campos o inputs
      $("#nombre").val("");//los dejamos limpios de esta manera
      $("#contraseña").val("");
   

   $.ajax({
   	type: 'GET', // posicionamos get en primera posicion,tenemos otro tipo POSTS
   	url:'simulacion.jsonp',// conectamos con su carpeta de json
    dataType: "jsonp",//tipo de dato
   	jsonpCallback:"jsonCallback",// esto llama a mi registro es Json, la base de datos creada x mi
    crossDomain: true, //si no pongo esta crossDomain: true, nos dará error 
   
    //contentType: "application/jsonp",			
    success: function(positiveOutcome){
      /*console.log(positiveOutcome);
      console.log(name);
      console.log(password);*/
        for (var i = positiveOutcome.length - 1; i >= 0; i--) {
        //console.log(positiveOutcome[i].name + positiveOutcome[i].password)
          if (name === positiveOutcome[i].name && password === positiveOutcome[i].password) {
         alert("eureka!");
         window.location= "simulacionDos.html";
          
          welcome();
        }
       }
    },

        error: function(error){
          alert("Ups! Try it again!");    
        }

    });

  var data = name
 window.sessionStorage.setItem("datos",JSON.stringify(data));
  // localStorage.setItem("LatLong", value); 



 });
});