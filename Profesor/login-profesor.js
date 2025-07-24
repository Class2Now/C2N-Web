document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginProfesorForm");
  const inputPass = document.getElementById("contrasena");
  const toggle = document.getElementById("verContrasena");

  // ✅ Mostrar u ocultar contraseña
  if (toggle) {
    toggle.addEventListener("change", () => {
      inputPass.type = toggle.checked ? "text" : "password";
    });
  }

  // ✅ Lógica de login
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que se borren los datos por recarga

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const profesores = JSON.parse(localStorage.getItem("c2nProfesores")) || [];

    const profesor = profesores.find(p => p.correo === correo && p.contrasena === contrasena);

    if (!profesor) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("c2nProfesorActivo", JSON.stringify(profesor));

    alert("Bienvenido, " + profesor.nombre);
    // 🔁 CORREGIDO: redirige a solicitudes-profesor.html directamente
    window.location.href = "solicitudes-profesor.html";
  });
});