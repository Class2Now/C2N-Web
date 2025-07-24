function generarNumeroSolicitud() {
  const seleccion = JSON.parse(localStorage.getItem('c2nSeleccion')) || {};

  if (!seleccion.numeroControl) {
    // Genera número de control tipo DDMMYYHHMM + un código (puedes cambiar 'D075' por el ID que uses)
    const ahora = new Date();
    const dd = String(ahora.getDate()).padStart(2, '0');
    const mm = String(ahora.getMonth() + 1).padStart(2, '0');
    const yy = String(ahora.getFullYear()).slice(2);
    const hh = String(ahora.getHours()).padStart(2, '0');
    const min = String(ahora.getMinutes()).padStart(2, '0');
    const codigoEstudiante = 'D075'; // cambia por código real del estudiante
    seleccion.numeroControl = `${dd}${mm}${yy}${hh}${min}-${codigoEstudiante}`;
  }

  // Obtener prefijo de servicio (V o AC)
  const servicio = seleccion.modalidad || 'V'; // asume modalidad guardada como 'V' o 'AC'
  const prefijoServicio = servicio === 'sos' || servicio === 'V' ? 'V' : 'AC';

  // Número de estudiantes
  const nEstudiantes = seleccion.numEstudiantes || 1;

  // Forma de pago (T, E, P1, P2, P3)
  const pago = seleccion.metodoPago || 'T'; // ejemplo, debes mapear bien
  let pagoCodigo = '';
  if (pago === 'transferencia' || pago === 'T') pagoCodigo = 'T';
  else if (pago === 'efectivo' || pago === 'E') pagoCodigo = 'E';
  else if (pago === 'prepago') {
    // Elige prepago según monto
    if (seleccion.recargaMonto === 500) pagoCodigo = 'P1';
    else if (seleccion.recargaMonto === 1000) pagoCodigo = 'P2';
    else if (seleccion.recargaMonto === 1500) pagoCodigo = 'P3';
    else pagoCodigo = 'P1'; // default
  }

  // Generar código alumno con letra y número de 3 dígitos
  // Por ejemplo usar consecutivo de mes para letra (A, B, C...) y 3 dígitos
  // Aquí simplificamos y usamos 'D075' directo, pero puedes mejorarlo

  // Número de solicitud final:
  // Ejemplo: D075-V-3-T
  const numeroSolicitud = `${codigoEstudiante}-${prefijoServicio}-${nEstudiantes}-${pagoCodigo}`;

  // Guardar en localStorage para mostrar luego
  seleccion.numeroSolicitud = numeroSolicitud;

  localStorage.setItem('c2nSeleccion', JSON.stringify(seleccion));

  return numeroSolicitud;
}

// Llama esta función cuando estés listo para generar el número
const numeroGenerado = generarNumeroSolicitud();
console.log('Número de solicitud generado:', numeroGenerado);