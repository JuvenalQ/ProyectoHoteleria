/* * ======== TABLE ROOM  ========== */
/* * ======== HABITACIONES ========== */

// trae la informacion desde la bbdd  
function traerinformacion() {

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);

      if (respuesta.items == 0) {
        alert(" No hay Registros que mostrar \n Por favor ingrese uno --Gracias.");
      } else {
        $("#resultado").empty();
        console.log(respuesta);
        //Envio por parametro  la funcion 
        pintarRespuesta(respuesta.items);
      }
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar Habitaciones), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuesta(items) {

  //desactivo el boton de actulizar registro
  $("#btnActualizar").hide();
  $("#btnConsultar").hide();


  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr class='table-dark'>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Habitación " + "</th>";
  myTable += "<th>" + " Estrella(s) " + "</th>";
  myTable += "<th>" + " Categoria " + "</th>";
  myTable += "<th>" + " Descripción " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='table-dark'>";
    myTable += "<td> <button   class='btn btn-info'  onclick='editarInformacionForId(" + items[i].id + ")'> Actualizar </button> </td>";
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

//url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=" + item,
function editarInformacionForId(id) {

  alert("registro a actualizar #: " + id);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=" + id,
    datatype: "JSON",
    type: "GET",
    datatype: "JSON",
    success: function (habitacion) { //Obtengo en un array los datos de la habitacion
      let item = habitacion.items[0]; //Guardo en una variable el array 

      // inhabilitamos el boton guardar datos  para ingresar
      $("#btnGuardar").prop('disabled', true);
      $("#btnGuardar").hide();

      //Habilito el boton actualizar
      $("#btnActualizar").prop('disabled', false);
      $("#btnActualizar").show();

      console.log("Traemos informacion de la habitacion " + item.id); 
      //Obtengo cada item del array en su campo
      $("#id").val(item.id);
      $("#id").prop('readonly', true);
      $("#room").val(item.room);
      $("#stars").val(item.stars);
      $("#category_id").val(item.category_id);
      $("#description").val(item.description);
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar id Habitacion), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}

//Actuliza el registro seleccionado
function editarInformacion() {

  //Obtengo el valor de los campos 
  let myData = {
    id: $("#id").val(),
    room: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    description: $("#description").val(),
  };

  if ($("#room").val() == "" || $("#stars").val() == "" || $("#category_id").val() == "" || $("#description").val() == "") {
    alert("Eres muy chistoso por favor llena todos los campos ");
  } else {
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
        $("#id").val("");
        $("#room").val("");
        $("#stars").val("");
        $("#category_id").val("");
        $("#description").val("")
      },
      complete: function (xhr, status) {

        console.log('Petición realizada(Actualizar habitacion), ' + xhr.status);

        //falta tarer el boton
        $("#btnGuardar").prop('disabled', false);
        $("#btnGuardar").show();

        //actualizamos la tabla 
        traerinformacion();

        //mostramos que se hizo efectivo 
        alert('Se Actalizo La Habitacion Correctamente.');
      },
      error: function (xhr, status) {
        alert('Ups Ocurrio un problema al actualizar, ' + xhr.status);
      }
    })
  }

}

function guardarinformacion() {

  let myData = {
    id: $("#id").val(),
    room: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    description: $("#description").val(),
  };

  if ($("#room").val() == "" || $("#stars").val() == "" || $("#category_id").val() == "" || $("#description").val() == "") {
    alert("Eres muy chistoso por favor llena todos los campos ");
  } else {
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
      type: "POST",
      data: myData,
      datatype: "JSON",
      success: function (respuesta) {

        // limpiamos los campos 
        $("#resultado").empty();
        $("#id").val("");
        $("#room").val("");
        $("#stars").val("");
        $("#category_id").val("");
        $("#description").val("");
      },
      error: function (xhr, status) {
        alert('Ups! Ocurrio un gran error ' + xhr.status);
      },
      complete: function (xhr, status) {

        console.log('Ingresado correctamente un registro nuevo ' + xhr.status);

        //actualizamos la tabla 
        traerinformacion();

        //mostramos que se hizo efectivo 
        alert('SE HA iNGRESO CORRECTAMENTE.');
      }
    })
  }
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
      console.log('Se elimino Correctamente')
    },
    error: function (xhr, status) {
      alert('Ups! Ocurrio un gran error ' + xhr.status);
    },
    complete: function (xhr, status) {

      $("#resultado").empty();
      traerinformacion();
      alert("Se elimino sastifactorimente");
    }
  })
}

function cancelar() {
  location.reload();
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

      if (respuesta.items == 0) {
        alert(" No hay Registros que mostrar \n Por favor ingrese uno --Gracias.");
      } else {
        $("#resultado").empty();
        console.log(respuesta);
        //Envio el parametro por la funcion
        pintarRespuestaCliente(respuesta.items);
      }
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar Cliente), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema con el Registro, ' + xhr.status);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuestaCliente(items) {
  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Nombre " + "</th>";
  myTable += "<th>" + " Email " + "</th>";
  myTable += "<th>" + " Edad " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr>";
    myTable += "<td> <button   class='btn btn-info' onclick='editarInformacionForIdCliente(" + items[i].id + ")'> Actualizar </button> </td>";
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

//Llena los campos del registro seleccionado 
function editarInformacionForIdCliente(id) {

  alert("registro a actualizar #: " + id);

  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client?Id=" + id,
    datatype: "JSON",
    type: "GET",
    datatype: "JSON",
    success: function (cliente) { //Obtengo en un array los datos de la habitacion
      let item = cliente.items[0]; //Guardo en una variable el array 

      console.log("mirar aca" + cliente);
      // inhabilitamos el boton guardar datos 
      $("#btnGuardarCliente").prop('disabled', true);
      $("#btnGuardarCliente").hide();

      //Habilito el boton actualizar
      $("#IdActualizarCliente").prop('disabled', false);
      $("#IdActualizarCliente").show();

      //Obtengo cada item del array en su campo
      $("#id").val(item.id);
      $("#id").prop('readonly', true);
      $("#name").val(item.name);
      $("#email").val(item.email);
      $("#age").val(item.age);
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar id cliente), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}

//Actuliza el registro seleccionado
function editarInformacionCliente() {

  //obtengo los valors de los campos 
  let myData = {
    id: $("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    age: $("#age").val(),
  };

  if ($("#name").val() == "" || $("#email").val() == "" || $("#age").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos \n O selecciona un cliente ");
  } else {
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
        $("#id").val("");
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
      },
      complete: function (xhr, status) {
        console.log('Petición realizada(Actualizar habitacion), ' + xhr.status);

        //falta tarer el boton
        $("#btnGuardarCliente").prop('disabled', false);
        $("#btnGuardarCliente").show();

        //actualizamos la tabla 
        traerInformacionCliente();

        //mostramos que se hizo efectivo 
        alert('El Cliente se ha actualizado.');
      },
      error: function (xhr, status) {
        alert('Ups Ocurrio un problema al actualizar, ' + xhr.status);
      }
    })
  }
}

//Guarda y envia la informacion a la BBDD
function guardarInformacionCliente() {

  let myData = {
    id: $("#id").val(),
    name: $("#name").val(),
    email: $("#email").val(),
    age: $("#age").val(),
  };

  //Validamos que no entren datos vacios 
  if ($("#name").val() == "" || $("#email").val() == "" || $("#age").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos \n O selecciona un cliente ");
  } else {
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
      type: "POST",
      data: myData,
      datatype: "JSON",
      success: function (respuesta) {

        // limpiamos los campos 
        $("#resultado").empty();
        $("#id").val("");
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
      },
      error: function (xhr, status) {
        alert('Ups! Ocurrio un gran error ' + xhr.status);
      },
      complete: function (xhr, status) {

        console.log('Ingresado correctamente un registro nuevo ' + xhr.status);
        //actualizamos la tabla cliente
        traerInformacionCliente();

        //mostramos que se hizo efectivo 
        alert('SE HA GUARDADO.');
      }
    })
  }
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
      console.log('Se elimino Correctamente')
    },
    error: function (xhr, status) {
      alert('Ups! Ocurrio un gran error ' + xhr.status);
    },
    complete: function (xhr, status) {
      $("#resultado").empty();
      traerInformacionCliente();
      alert("Se elmino el cliente");
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

      if (respuesta.items == 0) {
        alert(" No hay Registros que mostrar \n Por favor ingrese uno --Gracias.");
      } else {
        $("#resultado").empty();
        console.log(respuesta);
        //Envio el parametro por la funcion
        pintarRespuestaMessage(respuesta.items);
      }

    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar mensajes), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema con el Registro ' + xhr.status);
    }
  })
}

//Obtiene los registos y los monta en una tabla
function pintarRespuestaMessage(items) {
  let myTable = "<table id='tbl' class='table table-dark table-striped'>";
  myTable += "<tr class='table-dark'>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "<th>" + " Id " + "</th>";
  myTable += "<th>" + " Mensaje " + "</th>";
  myTable += "<th>" + "  " + "</th>";
  myTable += "</tr>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='table-dark'>";
    myTable += "<td> <button   class='btn btn-info' onclick='editarInformacionForIdMessage(" + items[i].id + ")'> Actualizar </button> </td>";
    myTable += "<td>" + items[i].id + "</td>";
    myTable += "<td>" + items[i].messagetext + "</td>";
    myTable += "<td> <button   class='btn btn-danger' onclick='EliminarMessage(" + items[i].id + ")'> Eliminar </button> </td>";
    myTable += "<tr>";
  }
  myTable += "</table>";
  $("#resultado").append(myTable);
}

function editarInformacionForIdMessage(id) {

  alert("registro a actualizar #: " + id);
  $.ajax({
    url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message?Id=" + id,
    datatype: "JSON",
    type: "GET",
    datatype: "JSON",
    success: function (cliente) { //Obtengo en un array los datos de la habitacion
      let item = cliente.items[0]; //Guardo en una variable el array 

      console.log("mirar aca" + cliente);
      // inhabilitamos el boton guardar datos 
      $("#btnGuardarMessage").prop('disabled', true);
      $("#btnGuardarMessage").hide();

      //Habilito el boton actualizar
      $("#btnActualizarCliente").prop('disabled', false);
      $("#btnActualizarCliente").show();

      //Obtengo cada item del array en su campo
      $("#id").val(item.id);
      $("#id").prop('readonly', true);
      $("#messagetext").val(item.messagetext);
    },
    complete: function (xhr, status) {
      console.log('Petición realizada(Consultar id Message), ' + xhr.status);
    },
    error: function (xhr, status) {
      alert('Ups Ocurrio un problema , ' + xhr.status);
    }
  })
}

//Guarda y envia la informacion a la BBDD
function guardarInformacionMessage() {
  //guardo en una variable los datos a guardar
  let myData = {
    id: $("#id").val(),
    messagetext: $("#messagetext").val(),
  };

  //validaciones 
  if ($("#messagetext").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos \n O selecciona un mensaje ");
  } else {
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
      type: "POST",
      data: myData,
      datatype: "JSON",
      success: function () {

        // limpiamos los campos 
        $("#resultado").empty();
        $("#id").val("");
        $("#messagetext").val("");
      },
      error: function (xhr, status) {
        alert('Ups! Ocurrio un gran error ' + xhr.status);
      },
      complete: function (xhr, status) {

        console.log('Ingresado correctamente un registro nuevo ' + xhr.status);
        //actualizamos la tabla 
        traerInformacionMessage();

        //mostramos que se hizo efectivo 
        alert('SE HA GUARDADO EL MENSAGE.');
      }
    })
  }
}

//Actuliza el registro seleccionado
function editarInformacionMessage() {

  //Capturo los datos a guardar
  let myData = {
    id: $("#id").val(),
    messagetext: $("#messagetext").val(),
  };

  //valido 
  if ($("#id").val() == "" || $("#messagetext").val() == "") {
    alert("Eres muy chistoso jaja :v \n Por favor llena todos los campos \n O selecciona un mensaje ");
  } else {
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
        $("#id").val("");
        $("#messagetext").val("");
      },
      complete: function (xhr, status) {
        console.log('Petición realizada(Actualizar habitacion), ' + xhr.status);

        //falta tarer el boton
        $("#btnGuardarMessage").prop('disabled', false);
        $("#btnGuardarMessage").show();

        //actualizamos la tabla 
        traerInformacionMessage();

        //mostramos que se hizo efectivo 
        alert('Se actualizo el mensaje.');
      },
      error: function (xhr, status) {
        alert('Ups Ocurrio un problema al actualizar, ' + xhr.status);
      }
    })
  }
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

    },
    error: function (xhr, status) {
      alert('Ups! Ocurrio un gran error ' + xhr.status);
    },
    complete: function (xhr, status) {
      $("#resultado").empty();
      traerInformacionMessage();
      alert("Se elimino el mensaje");
    }
  })
}


/*
  GET
    https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room?Id=1&cosito='cosito'
  POST
    https://g39b406ee3fdd9f-bbddhoteleria.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room
      headers
        data= {
          Id:1,
          cosito:'cosito',
        }
  PUT
*/