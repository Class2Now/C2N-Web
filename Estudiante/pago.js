document.addEventListener('DOMContentLoaded', () => {
  const montoTransferenciaSpan = document.getElementById('montoTransferencia');
  const lugarSelect = document.getElementById('efectivoLugar');
  const codigoPagoDiv = document.getElementById('codigoPago');
  const btnGenerarCodigo = document.getElementById('btnGenerarCodigo');
  const btnRecargar = document.getElementById('btnRecargarSaldo');
  const confirmarPagoBtn = document.getElementById('confirmarPagoBtn');
  const errorMsg = document.getElementById('errorMsg');

  const seleccion = JSON.parse(localStorage.getItem('c2nSeleccion') || '{}');
  const estudiante = JSON.parse(localStorage.getItem('c2nEstudianteActivo') || '{}');

  if (!seleccion.tema || !seleccion.numEstudiantes) {
    alert("Por favor, selecciona tema y número de estudiantes.");
    window.location.href = "seleccion-tema.html";
    return;
  }

  const monto = parseInt(seleccion.numEstudiantes) * 100;
  montoTransferenciaSpan.textContent = `$${monto.toFixed(2)} MXN`;

  let metodoSeleccionado = null;

  // Transferencia
  document.getElementById('btnPagarTransferencia').addEventListener('click', () => {
    metodoSeleccionado = 'T';
    confirmarPagoBtn.disabled = false;
    errorMsg.textContent = '';
  });

  // Efectivo
  lugarSelect.addEventListener('change', () => {
    btnGenerarCodigo.disabled = !lugarSelect.value;
  });

  btnGenerarCodigo.addEventListener('click', () => {
    if (!lugarSelect.value) {
      errorMsg.textContent = 'Selecciona un lugar.';
      return;
    }
    metodoSeleccionado = 'E';
    const codigo = 'COD' + Math.floor(Math.random() * 1000000);
    codigoPagoDiv.innerHTML = `<strong>Código generado:</strong> ${codigo}`;
    confirmarPagoBtn.disabled = false;
    errorMsg.textContent = '';
  });

  // Prepago
  document.querySelectorAll('input[name="recarga"]').forEach(radio => {
    radio.addEventListener('change', () => {
      metodoSeleccionado = `P${radio.value === '500' ? '1' : radio.value === '1000' ? '2' : '3'}`;
      confirmarPagoBtn.disabled = false;
      errorMsg.textContent = '';
    });
  });

  btnRecargar.addEventListener('click', () => {
    const seleccionado = document.querySelector('input[name="recarga"]:checked');
    if (!seleccionado) {
      errorMsg.textContent = 'Selecciona un monto de recarga.';
      return;
    }
    metodoSeleccionado = `P${seleccionado.value === '500' ? '1' : seleccionado.value === '1000' ? '2' : '3'}`;
    confirmarPagoBtn.disabled = false;
    errorMsg.textContent = '';
  });

  // Confirmar Pago
  confirmarPagoBtn.addEventListener('click', () => {
    if (!metodoSeleccionado) {
      errorMsg.textContent = 'Selecciona un método de pago.';
      return;
    }

    // Agregamos tipoPago a la selección
    seleccion.tipoPago = metodoSeleccionado;
    localStorage.setItem('c2nSeleccion', JSON.stringify(seleccion));
    localStorage.setItem('pagoRealizado', 'true');

    // Generar número de solicitud
    const solicitudes = JSON.parse(localStorage.getItem('c2nSolicitudes') || '[]');
    let consecutivo = solicitudes.length + 1;
    let letra = String.fromCharCode(64 + Math.ceil(consecutivo / 99));
    let numero = (consecutivo % 99 || 99).toString().padStart(2, '0');
    const numeroSolicitud = `${letra}${numero}`;

    // Crear objeto de solicitud
    const nuevaSolicitud = {
      numeroSolicitud,
      numeroControl: estudiante.numeroControl || '---',
      tema: seleccion.tema,
      numEstudiantes: seleccion.numEstudiantes,
      whatsapps: seleccion.whatsapps,
      tipoServicio: seleccion.tipoServicio,
      tipoPago: seleccion.tipoPago,
      estado: "pendiente",
      fecha: new Date().toISOString()
    };

    solicitudes.push(nuevaSolicitud);
    localStorage.setItem('c2nSolicitudes', JSON.stringify(solicitudes));

    // Ir a confirmación
    window.location.href = 'confirmacion-solicitud.html';
  });
});