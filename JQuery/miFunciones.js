/* * ======== TABLE ROOM  ========== */
/* * ======== HABITACIONES ========== */

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
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarHabitacion(" + items[i].id + ")'> Eliminar </button> </td>";
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
function EliminarHabitacion(idElemento) {

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

/* * ======== TABLE CLIENT  ========== */
/* * ======== CLIENTES ========== */

// trae la informacion desde la bbdd  
function traerInformacionCliente() {
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      console.log(respuesta);
      pintarRespuestaCliente(respuesta.items);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuestaCliente(items) {
  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Nombre " + "</th>";
  myTable += "<th>" + " Email " + "</th>";
  myTable += "<th>" + " Edad " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + items[i].id + "</td>";
    myTable += "<td>" + items[i].name + "</td>";
    myTable += "<td>" + items[i].email + "</td>";
    myTable += "<td>" + items[i].age + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarCliente(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}

//Guarda y envia la informacion a la BBDD
function guardarInformacionCliente() {

  let myData = {
    id: $("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    age: $("#age").val(),
  };

  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type: "POST",
    data: myData,
    datatype: "JSON",
    success: function (respuesta) {

      // limpiamos los campos 
      $("#resultado").empty();
      $("#id").val(""),
        $("#name").val(""),
        $("#email").val(""),
        $("#age").val(""),

        //actualizamos la tabla cliente
        traerInformacionCliente();

      //mostramos que se hizo efectivo 
      alert('SE HA GUARDADO.');
    }
  })
}

//Actuliza el registro seleccionado
function editarInformacionCliente() {

  let myData = {
    id: $("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    age: $("#age").val(),
  };

  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type: "PUT",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {

      // limpiamos los campos 
      $("#resultado").empty();
      $("#id").val(""),
        $("#name").val(""),
        $("#email").val(""),
        $("#age").val(""),

        //actualizamos la tabla 
        traerInformacionCliente();

      //mostramos que se hizo efectivo 
      alert(' El CLIENTE ACTULIZADO.');
    }
  })
}

//Elimna un elemento de la tabla 
function EliminarCliente(idElemento) {

  let myData = {
    id: idElemento
  };

  let dataToSend = JSON.stringify(myData);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      traerInformacionCliente();
      alert("Se elimino sastifactorimente");
    }
  })
}


/* * ======== TABLE MESSAGE  ========== */
/* * ======== MESSAGES ========== */


// trae la informacion desde la bbdd  
function traerInformacionMessage() {
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      console.log(respuesta);
      pintarRespuestaMessage(respuesta.items);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuestaMessage(items) {
  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr class='table-dark'>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Mensaje " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='table-dark'>";
    myTable += "<td>" + items[i].id + "</td>";
    myTable += "<td>" + items[i].messagetext + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarMessage(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}

//Guarda y envia la informacion a la BBDD
function guardarInformacionMessage() {

  let myData = {
    id: $("#id").val(),
    messagetext: $("#messagetext").val(),
  };

  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
    type: "POST",
    data: myData,
    datatype: "JSON",
    success: function (respuesta) {

      // limpiamos los campos 
      $("#resultado").empty();
      $("#id").val(""),
        $("#messagetext").val(""),

        //actualizamos la tabla 
        traerInformacionMessage();

      //mostramos que se hizo efectivo 
      alert('SE HA GUARDADO EL MENSAGE.');
    }
  })
}

//Actuliza el registro seleccionado
function editarInformacionMessage() {

  let myData = {
    id: $("#id").val(),
    messagetext: $("#messagetext").val(),
  };

  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
    type: "PUT",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {

      // limpiamos los campos 
      $("#resultado").empty();
      $("#id").val(""),
        $("#messagetext").val(""),

        //actualizamos la tabla 
        traerInformacionMessage();

      //mostramos que se hizo efectivo 
      alert('SE HA ACTULIZADO EL MENSAJE.');
    }
  })
}

//Elimna un elemento de la tabla 
function EliminarMessage(idElemento) {

  let myData = {
    id: idElemento
  };

  let dataToSend = JSON.stringify(myData);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      traerInformacionMessage();
      alert("Se elimino sastifactorimente");
    }
  })
}