// Funciones

// trae la informacion desde la bbdd  
function traerinformacion() {
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      console.log(respuesta);
      pintarRespuesta(respuesta.items);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuesta(items) {
  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr class='table-dark'>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Habitación " + "</th>";
  myTable += "<th>" + " Estrella(s) " + "</th>";
  myTable += "<th>" + " Categoria " + "</th>";
  myTable += "<th>" + " Descripción " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='table-dark'>";
    myTable += "<td>" + items[i].id + "</td>";
    myTable += "<td>" + items[i].room + "</td>";
    myTable += "<td>" + items[i].stars + "</td>";
    myTable += "<td>" + items[i].category_id + "</td>";
    myTable += "<td>" + items[i].description + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='borrarElemento(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}

//Guarda y envia la informacion a la BBDD
function guardarinformacion() {

  let myData = {
    id: $("#id").val(),
    room: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    description: $("#description").val(),
  };

  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "POST",
    data: myData,
    datatype: "JSON",
    success: function (respuesta) {

      // limpiamos los campos 
      $("#resultado").empty();
      $("#id").val(""),
        $("#room").val(""),
        $("#stars").val(""),
        $("#category_id").val(""),
        $("#description").val(""),

        //actualizamos la tabla 
        traerinformacion();

      //mostramos que se hizo efectivo 
      alert('SE HA GUARDADO.');
    }
  })
}


//Actuliza el registro seleccionado
function editarInformacion() {

  let myData = {
    id: $("#id").val(),
    room: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    description: $("#description").val(),
  };

  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "PUT",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {

      // limpiamos los campos 
      $("#resultado").empty();
      $("#id").val(""),
        $("#room").val(""),
        $("#stars").val(""),
        $("#category_id").val(""),
        $("#description").val(""),

        //actualizamos la tabla 
        traerinformacion();

      //mostramos que se hizo efectivo 
      alert('SE HA ACTULIZADO.');
    }
  })
}


//Elimna un elemento de la tabla 
function borrarElemento(idElemento) {

  let myData = {
    id: idElemento
  };

  let dataToSend = JSON.stringify(myData);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      traerinformacion();
      alert("Se elimino sastifactorimente");
    }

  })

}

