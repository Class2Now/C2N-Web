document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSeleccionTema");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const tema = document.getElementById("tema").value;
    const numEstudiantes = parseInt(document.getElementById("numEstudiantes").value);
    const whatsapps = [];

    for (let i = 1; i <= numEstudiantes; i++) {
      const campo = document.getElementById(`whatsapp${i}`);
      if (campo && campo.value.trim()) {
        whatsapps.push(campo.value.trim());
      } else {
        alert(`Falta el número de WhatsApp del estudiante ${i}`);
        return;
      }
    }

    const tipoServicio = localStorage.getItem("c2nTipoServicio"); // ✅ Obtiene el tipo de servicio

    if (!tipoServicio) {
      alert("Error: tipo de servicio no definido.");
      return;
    }

    const seleccion = {
      tema,
      numEstudiantes,
      whatsapps,
      tipoServicio
    };

    localStorage.setItem("c2nSeleccion", JSON.stringify(seleccion));

    // ✅ Corrección aquí: "inmediata" en lugar de "video"
    if (tipoServicio === "inmediata") {
      window.location.href = "pago.html";
    } else if (tipoServicio === "agenda") {
      window.location.href = "calendario.html";
    } else {
      alert("Tipo de servicio desconocido.");
    }
  });
});