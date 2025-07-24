// generar-numero-solicitud.js

document.addEventListener('DOMContentLoaded', () => {
  const numeroSolicitudElemento = document.getElementById('numeroSolicitud');

  // Obtener el último número de solicitud desde localStorage
  let ultimoNumero = localStorage.getItem('ultimoNumeroSolicitud');
  if (!ultimoNumero) {
    ultimoNumero = 0;
  } else {
    ultimoNumero = parseInt(ultimoNumero, 10);
  }

  // Mostrar el número en el elemento
  if (numeroSolicitudElemento) {
    numeroSolicitudElemento.textContent = `Número de solicitud: ${ultimoNumero}`;
  }
});