// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Recuperar datos guardados en localStorage
  const datosSeleccionStr = localStorage.getItem('c2nSeleccion');
  if (!datosSeleccionStr) {
    alert('No se encontró información previa. Por favor, selecciona un tema.');
    window.location.href = 'seleccion-tema.html';
    return;
  }

  const datosSeleccion = JSON.parse(datosSeleccionStr);

  // Mostrar datos en la página si tienes elementos donde mostrar
  const temaMostrar = document.getElementById('temaMostrar');
  const numeroSolicitudMostrar = document.getElementById('numeroSolicitudMostrar');
  const cantidadMostrar = document.getElementById('cantidadMostrar');

  if (temaMostrar) temaMostrar.textContent = datosSeleccion.tema || '';
  if (numeroSolicitudMostrar) numeroSolicitudMostrar.textContent = datosSeleccion.numeroSolicitud || '';
  if (cantidadMostrar) cantidadMostrar.textContent = datosSeleccion.numEstudiantes || '';

  // Aquí podrías agregar más lógica si la página lo requiere
});