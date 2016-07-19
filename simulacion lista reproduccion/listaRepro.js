
$(document).ready(function(){ // documento listo para funcionar
	
	var Reproductor = function (artist, song, proof){//hacemos un constructor, con sus dos objetos
		this.artist = artist,
		this.song = song,
		this.proof = proof
	};

    var passwordName = JSON.parse(sessionStorage.getItem("datos"));//creamos una var= datos, pero dentro de sessionStorage hay "datos"
    var lista = JSON.parse(localStorage.getItem(passwordName)) || [];
    //console.log(lista);

    for (var i = lista.length - 1; i >= 0; i--) {
         $("#cascadaCanciones").append(lista[i].proof);

    };

	welcome(); //aqui he llamado a welcome,para que se imprima como título una vez introducido el nombre del usuario( su sesion esta activa)

    $("#search").click(function(event){ //search nos referimos al boton buscar y donde introducimos el listado de canciones buscadas
      event.preventDefault();
        	var artist = $("#artista").val();//captura de datos
        	//var song = $("#cancion").val();
     		//console.log(artist);
      		//console.log(song);
		$.ajax({
      		type:"GET",
      		url:"https://api.spotify.com/v1/search?type=track&query=" + '"' + artist + '"',
      		
			success:function(entraArtista) {
				var tituloCancion = entraArtista.tracks.items[0].name;
				var artists = entraArtista.tracks.items[0].artists[0].name;
				var proof = entraArtista.tracks.items[0].preview_url;
				proof = '<li><h3>'+ tituloCancion + ',' + artists + '</h3><br><audio src= "' + proof + '"controls></audio></li>';

				var music = new Reproductor(artists, tituloCancion, proof);
				console.log(music);
				lista.push(music);
				console.log(lista);
				window.localStorage.setItem(passwordName, JSON.stringify(lista));

				//console.log(lista);

				$("#cascadaCanciones").append(proof);//'<li><h3>' + music.artist + ', ' + music.song+'</h3></li>', antes utilizabamos este codigo, pero hemos sustituido por el PROOF 
			    $("#artista").val("");//los dejamos limpios de esta manera
			    $("#cancion").val("");
			}
 		
    });
});


	function welcome (){
         $("#user").append('<p>'+'Welcome @'+ passwordName+'!' +'</p>');// 
    };

  
});


