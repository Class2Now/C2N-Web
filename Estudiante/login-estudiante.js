document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");
  const verPassword = document.getElementById("verPassword");

  verPassword.addEventListener("change", () => {
    passwordInput.type = verPassword.checked ? "text" : "password";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("password").value.trim();

    const estudiantes = JSON.parse(localStorage.getItem("c2nEstudiantes")) || [];
    const estudiante = estudiantes.find(e => e.usuario === usuario && e.contrasena === contrasena);

    if (estudiante) {
      localStorage.setItem("c2nEstudianteActivo", JSON.stringify(estudiante));
      alert("Bienvenido/a " + estudiante.nombre);
      window.location.href = "bienvenida.html"; // Redirige a pantalla de bienvenida
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});