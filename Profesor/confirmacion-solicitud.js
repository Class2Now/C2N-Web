document.addEventListener("DOMContentLoaded", () => {
  const confirmarBtn = document.getElementById("confirmarBtn");

  confirmarBtn.addEventListener("click", () => {
    const estudiante = JSON.parse(localStorage.getItem("c2nEstudianteActivo"));
    const seleccion = JSON.parse(localStorage.getItem("c2nSeleccion"));
    const pago = JSON.parse(localStorage.getItem("c2nPago"));

    if (!estudiante || !seleccion || !pago) {
      alert("Información incompleta. Intenta de nuevo.");
      return;
    }

    const fecha = seleccion.fecha || new Date().toISOString().split("T")[0];
    const hora = seleccion.hora || "inmediato";
    const temaID = seleccion.temaID || "00";
    const temaNombre = seleccion.temaNombre || "Tema no especificado";

    const numeroEstudiante = estudiante.numeroControl; // Ej: D57
    const tipoPago = pago.tipo; // T, E, P1, P2...
    const numEstudiantes = seleccion.numeroEstudiantes;

    // Generar ID de solicitud: D57-V3-01-T
    const idSolicitud = `${numeroEstudiante}-V${numEstudiantes}-${temaID}-${tipoPago}`;

    const nuevaSolicitud = {
      id: idSolicitud,
      nombre: estudiante.nombre,
      numeroEstudiante,
      tema: temaNombre,
      temaID,
      numeroEstudiantes: numEstudiantes,
      whatsapps: seleccion.whatsapps || [estudiante.whatsapp],
      fecha,
      hora,
      estado: "pendiente",
      asignadoA: null,
      link: null,
      profesorAsignado: null,
      numeroClase: null
    };

    // Guardar solicitud
    const solicitudes = JSON.parse(localStorage.getItem("c2nSolicitudes") || "[]");
    solicitudes.push(nuevaSolicitud);
    localStorage.setItem("c2nSolicitudes", JSON.stringify(solicitudes));

    alert("Solicitud registrada. Esperando asignación de profesor.");
    window.location.href = "esperando-profesor.html"; // Página temporal de espera
  });
});