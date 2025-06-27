document.addEventListener("DOMContentLoaded", function () {
  verEstudiantes();

  document.getElementById("btnGuardar").addEventListener("click", function (e) {
    e.preventDefault();
    agregarEstudiante();
  });
});

function agregarEstudiante() {
  var nombre = document.getElementById("nombre").value;
  var edad = document.getElementById("edad").value;
  var carrera = document.getElementById("carrera").value;
  var fecha = document.getElementById("fecha").value;
  var activoRadio = document.querySelector("input[name='activo']:checked");

  if (nombre === "") {
    alert("Debe ingresar el nombre del estudiante.");
    return;
  }

  if (edad === "") {
    alert("Debe ingresar la edad del estudiante.");
    return;
  }

  if (carrera === "") {
    alert("Debe seleccionar una carrera.");
    return;
  }

  if (fecha === "") {
    alert("Debe ingresar la fecha de ingreso.");
    return;
  }

  if (!activoRadio) {
    alert("Debe seleccionar si el estudiante está activo o no.");
    return;
  }

  var estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
  if (!estudiantes) {
    estudiantes = [];
  }

  var activo = activoRadio.value;
  var nuevo = {
    nombre: nombre,
    edad: edad,
    carrera: carrera,
    fecha: fecha,
    activo: activo,
    id: Date.now()
  };

  var i = estudiantes.findIndex(function (e) {
    return e.nombre == nombre;
  });

  if (i == -1) {
    estudiantes.push(nuevo);
  } else {
    estudiantes[i] = nuevo;
  }

  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  limpiarForm();
}

function limpiarForm() {
  verEstudiantes();
  document.getElementById("formEstudiante").reset();
}

function verEstudiantes() {
  var estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
  if (!estudiantes) {
    estudiantes = [];
  }

  var contenedor = document.getElementById("listaEstudiantes");
  var html = "";

 estudiantes.forEach(function (e) {
  var panelCSS;
  if (e.activo === "si") {
    panelCSS = "panel2";
  } else {
    panelCSS = "panel1";
  }

  html += `
    <div class="col-md-4">
      <div class="panel panel-default ${panelCSS}">
        <div class="panel-heading">
          <div class="row">
            <div class="col-md-8"><strong>${e.nombre}</strong></div>
            <div class="col-md-2">
              <span onclick="editarEstudiante('${e.id}')" class="fa fa-edit coloricon"></span>
            </div>
            <div class="col-md-2">
              <span onclick="eliminarEstudiante('${e.id}')" class="fa fa-trash coloricon"></span>
            </div>
          </div>
        </div>
        <div class="panel-body">
          <p>Edad: ${e.edad}</p>
          <p>Carrera: ${e.carrera}</p>
          <p>Fecha: ${e.fecha}</p>
          <p>Activo: ${e.activo}</p>
        </div>
      </div>
    </div>`;
});

  contenedor.innerHTML = html;
}

function eliminarEstudiante(id) {
  var estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
  if (!estudiantes) {
    estudiantes = [];
  }
  var i = estudiantes.findIndex(function (e) {
    return e.id == id;
  });
  estudiantes.splice(i, 1);
  alert("El Estudiante se ha eliminado");
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  verEstudiantes();
}

function editarEstudiante(id) {
  var estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
  if (!estudiantes) {
    estudiantes = [];
  }

  var estudiante = estudiantes.find(function (e) {
    return e.id == id;
  });

  if (estudiante) {
    document.getElementById("nombre").value = estudiante.nombre;
    document.getElementById("edad").value = estudiante.edad;
    let carreraValue = estudiante.carrera;
    if (carreraValue === "Ingeniería Informática") carreraValue = "informatica";
    if (carreraValue === "Ingeniería en Metalurgia") carreraValue = "metalurgia";
    if (carreraValue === "Astronomía") carreraValue = "astronomia";
    document.getElementById("carrera").value = carreraValue;
    document.getElementById("fecha").value = estudiante.fecha;
    document.querySelector("input[name='activo'][value='" + estudiante.activo + "']").checked = true;
    eliminarEstudiante(id);
  }
}
