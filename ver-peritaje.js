const API_BASE_URL = 'http://localhost:3000/api';

// Obtener el ID de la URL
const params = new URLSearchParams(window.location.search);
const peritajeId = params.get('id');

if (!peritajeId) {
    document.getElementById('contenidoInforme').innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle" style="font-size:40px;"></i>
            <h2>No se especificó ningún peritaje</h2>
            <p>Vuelve al historial y selecciona uno.</p>
        </div>
    `;
} else {
    cargarPeritaje(peritajeId);
}

async function cargarPeritaje(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/peritajes/${id}`);
        const data = await response.json();

        if (!data || data.error) {
            throw new Error(data.error || 'Peritaje no encontrado');
        }

        // El HTML guardado en la base de datos
        const htmlInforme = data.html_informe || '';

        if (htmlInforme && htmlInforme.trim().length > 0) {
            // Insertar el HTML tal cual se generó
            document.getElementById('contenidoInforme').innerHTML = htmlInforme;
        } else {
            // Si no hay HTML guardado, mostrar los datos básicos
            document.getElementById('contenidoInforme').innerHTML = `
                <div style="padding: 40px;">
                    <h2>Peritaje ${data.numero_reporte}</h2>
                    <p><strong>Placa:</strong> ${data.placa || 'N/A'}</p>
                    <p><strong>Vehículo:</strong> ${data.marca || ''} ${data.linea || ''}</p>
                    <p><strong>Puntaje:</strong> ${data.puntaje_global}%</p>
                    <p><strong>Resultado:</strong> ${data.aprobado ? 'APROBADO' : 'NO APROBADO'}</p>
                    <p><strong>Fecha:</strong> ${new Date(data.fecha_peritaje).toLocaleString('es-CO')}</p>
                    <p style="color:#888; margin-top:20px;">El informe completo no fue guardado. Solo hay datos estructurados.</p>
                </div>
            `;
        }
    } catch (err) {
        console.error('Error cargando peritaje:', err);
        document.getElementById('contenidoInforme').innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle" style="font-size:40px;"></i>
                <h2>Error al cargar el informe</h2>
                <p>${err.message}</p>
                <p style="color:#888; font-size:12px;">Verifica que el backend esté corriendo en ${API_BASE_URL}</p>
            </div>
        `;
    }
}

function guardarPDF() {
    const element = document.getElementById('contenidoInforme');
    const btn = event.currentTarget;

    const opt = {
        margin: [8, 8, 8, 8],
        filename: `Peritaje_${peritajeId}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
            scale: 2, useCORS: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'in', format: [11, 17], orientation: 'portrait', compress: true },
        pagebreak: {
            mode: ['css', 'legacy'],
            avoid: ['.score-card', '.anexo-gallery-card', '.global-result-card']
        }
    };

    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
    btn.disabled = true;

    html2pdf().set(opt).from(element).save()
        .then(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        })
        .catch(err => {
            console.error(err);
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            alert('Error al generar el PDF');
        });
}