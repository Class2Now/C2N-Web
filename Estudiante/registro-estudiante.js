document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  const linkTerminos = document.getElementById("linkTerminos");
  const terminosCheckbox = document.getElementById("terminosCheckbox");

  // Restaurar datos guardados
  const datosGuardados = JSON.parse(sessionStorage.getItem("registroTempEstudiante"));
  if (datosGuardados) {
    document.getElementById("nombre").value = datosGuardados.nombre || "";
    document.getElementById("fechaNacimiento").value = datosGuardados.fechaNacimiento || "";
    document.getElementById("whatsapp").value = datosGuardados.whatsapp || "";
    document.getElementById("correo").value = datosGuardados.correo || "";
    document.getElementById("usuario").value = datosGuardados.usuario || "";
    document.getElementById("password").value = datosGuardados.password || "";
  }

  let terminoLeido = false;

  linkTerminos.addEventListener("click", () => {
    // Guardar datos temporalmente
    const tempDatos = {
      nombre: document.getElementById("nombre").value.trim(),
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      whatsapp: document.getElementById("whatsapp").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      usuario: document.getElementById("usuario").value.trim(),
      password: document.getElementById("password").value.trim(),
    };
    sessionStorage.setItem("registroTempEstudiante", JSON.stringify(tempDatos));

    const win = window.open("terminos-condiciones.html", "_blank");
    const checker = setInterval(() => {
      if (win.closed) {
        clearInterval(checker);
        terminoLeido = true;
        terminosCheckbox.disabled = false;
      }
    }, 500);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!terminosCheckbox.checked) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("password").value.trim();

    const estudiantes = JSON.parse(localStorage.getItem("c2nEstudiantes")) || [];

    if (estudiantes.find(e => e.usuario === usuario)) {
      alert("Este nombre de usuario ya está registrado.");
      return;
    }

    // Generar número de control
    let numeroControl = "A01";
    if (estudiantes.length > 0) {
      const ultimo = estudiantes[estudiantes.length - 1].numeroControl;
      let letra = ultimo.charAt(0);
      let num = parseInt(ultimo.slice(1), 10);

      num++;
      if (num > 99) {
        letra = String.fromCharCode(letra.charCodeAt(0) + 1);
        num = 1;
      }

      numeroControl = letra + String(num).padStart(2, "0");
    }

    const nuevoEstudiante = {
      nombre,
      fechaNacimiento,
      whatsapp,
      correo,
      usuario,
      contrasena,
      numeroControl,
      fechaRegistro: new Date().toISOString().split("T")[0]
    };

    estudiantes.push(nuevoEstudiante);
    localStorage.setItem("c2nEstudiantes", JSON.stringify(estudiantes));
    localStorage.setItem("c2nEstudianteActivo", JSON.stringify(nuevoEstudiante));
    sessionStorage.removeItem("registroTempEstudiante");

    alert(`Registro exitoso. Tu número de control es: ${numeroControl}`);
    window.location.href = "seleccion-servicio.html";
  });
});