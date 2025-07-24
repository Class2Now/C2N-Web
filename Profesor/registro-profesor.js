document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroProfesorForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value.trim());
    const carrera = document.getElementById("carrera").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const resena = document.getElementById("resena").value.trim();
    const terminos = document.getElementById("terminos").checked;

    // Validar contraseña segura
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexContrasena.test(contrasena)) {
      alert("La contraseña no cumple con los requisitos.");
      return;
    }

    if (!terminos) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Obtener materias seleccionadas
    const materias = [];
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(cb => {
      if (cb.checked && cb.id !== "terminos") {
        materias.push(cb.value);
      }
    });

    // Generar ID único del profesor (P001, P002, ...)
    let profesores = JSON.parse(localStorage.getItem("c2nProfesores")) || [];
    const nuevoID = `P${(profesores.length + 1).toString().padStart(3, "0")}`;

    const nuevoProfesor = {
      id: nuevoID,
      nombre,
      edad,
      carrera,
      correo,
      whatsapp,
      contrasena,
      materias,
      resena,
      fechaRegistro: new Date().toISOString().split("T")[0]
    };

    profesores.push(nuevoProfesor);
    localStorage.setItem("c2nProfesores", JSON.stringify(profesores));

    alert("Registro exitoso. Ya puedes iniciar sesión.");
    window.location.href = "login-profesor.html";
  });
});