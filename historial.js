const API_URL = 'http://localhost:3000/api/peritajes';

async function cargarTodos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderizar(data);
}

async function buscarPorPlaca() {
    const placa = document.getElementById('searchPlaca').value.trim();
    if (!placa) return alert('Ingrese una placa');
    const res = await fetch(`${API_URL}/buscar/placa/${placa}`);
    const data = await res.json();
    renderizar(data);
}

async function buscarPorFecha() {
    const fecha = document.getElementById('searchFecha').value;
    if (!fecha) return alert('Seleccione una fecha');
    const res = await fetch(`${API_URL}/buscar/fecha/${fecha}`);
    const data = await res.json();
    renderizar(data);
}

function renderizar(peritajes) {
    const cont = document.getElementById('resultados');
    if (!peritajes || peritajes.length === 0) {
        cont.innerHTML = '<p style="text-align:center; color:#888; padding:40px;">No se encontraron peritajes.</p>';
        return;
    }
    cont.innerHTML = peritajes.map(p => `
        <div class="peritaje-card ${p.aprobado ? 'aprobado' : 'rechazado'}">
            <div class="peritaje-header">
                <h3>${p.numero_reporte} — ${p.marca || ''} ${p.linea || ''}</h3>
                <span class="badge ${p.aprobado ? 'aprobado' : 'rechazado'}">
                    ${p.aprobado ? '✓ APROBADO' : '✗ NO APROBADO'} (${p.puntaje_global}%)
                </span>
            </div>
            <div class="peritaje-info">
                <span><strong>Placa:</strong> ${p.placa || 'N/A'}</span>
                <span><strong>Fecha:</strong> ${new Date(p.fecha_peritaje).toLocaleString('es-CO')}</span>
                <span><strong>Creado por:</strong> ${p.creado_por || 'N/A'}</span>
            </div>
            <a href="ver-peritaje.html?id=${p.id}" class="btn-ver"><i class="fas fa-eye"></i> Ver informe completo</a>
        </div>
    `).join('');
}

function cerrarSesion() {
    if (!confirm('¿Cerrar sesión?')) return;
    localStorage.removeItem('perito_user');
    window.location.href = 'login.html';
}

cargarTodos();