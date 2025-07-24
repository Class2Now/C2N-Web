document.addEventListener("DOMContentLoaded", () => {
  const profesor = JSON.parse(localStorage.getItem("c2nProfesorActivo"));
  if (!profesor) {
    alert("No hay sesión activa. Inicia sesión primero.");
    window.location.href = "login-profesor.html";
    return;
  }

  const solicitudes = JSON.parse(localStorage.getItem("c2nSolicitudes")) || [];
  const clases = JSON.parse(localStorage.getItem("c2nClases")) || [];
  const tabla = document.getElementById("tablaSolicitudes");

  const pendientes = solicitudes.filter(s => {
    return profesor.materias.includes(s.tema) &&
           !clases.some(c => c.numeroControl === s.numeroControl);
  });

  if (pendientes.length === 0) {
    tabla.innerHTML = "<tr><td colspan='6'>No hay solicitudes pendientes para tus materias.</td></tr>";
    return;
  }

  pendientes.forEach((solicitud, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${solicitud.numeroControl}</td>
      <td>${solicitud.tema}</td>
      <td>${solicitud.numeroEstudiantes}</td>
      <td>${solicitud.tipoPago}</td>
      <td><button class="btn btn-success aceptar-btn" data-index="${index}">Aceptar</button></td>
    `;

    tabla.appendChild(fila);
  });

  document.querySelectorAll(".aceptar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = parseInt(e.target.getAttribute("data-index"));
      const solicitud = pendientes[i];

      // Generar número de clase único
      const numeroClase = `${solicitud.numeroControl}-${solicitud.tipoPago}-${solicitud.numeroEstudiantes}-${profesor.id}`;

      // Crear link Jitsi
      const linkJitsi = `https://meet.jit.si/C2N-${numeroClase}`;

      // Crear objeto clase
      const nuevaClase = {
        numeroClase,
        numeroControl: solicitud.numeroControl,
        tema: solicitud.tema,
        numeroEstudiantes: solicitud.numeroEstudiantes,
        tipoPago: solicitud.tipoPago,
        profesor: profesor.id,
        linkJitsi,
        fechaHora: new Date().toISOString()
      };

      // Guardar clase
      clases.push(nuevaClase);
      localStorage.setItem("c2nClases", JSON.stringify(clases));

      // Guardar también para el estudiante (notificación)
      localStorage.setItem("c2nUltimaClase", JSON.stringify(nuevaClase));

      alert("Solicitud aceptada. Se ha generado el link de videollamada.");
      location.reload();
    });
  });
});