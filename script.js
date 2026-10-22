/* ============================================================
   SISTEMA DE PERITAJE AUTOMOTRIZ — Perito Expert
   ============================================================ */

const API_BASE_URL = 'http://localhost:3000/api';

let currentSection = 1;
const totalSections = 14;
let anexoCounter = 0;

const sectionWeights = {
    2: 5, 3: 4, 4: 22, 5: 7, 6: 7, 7: 22,
    8: 18, 9: 4, 10: 9, 11: 4, 12: 1, 13: 4
};

const sectionQuestions = {
    2: [
        { id: "soat", text: "SOAT vigente" },
        { id: "propertyCard", text: "Tarjeta de propiedad" },
        { id: "accidentsReported", text: "Reporta siniestros" },
        { id: "techReview", text: "Rev. Tecnomecánica" }
    ],
    4: [
        { id: "engineOilLeak", text: "Fuga de aceite motor" },
        { id: "transmissionOilLeak", text: "Fuga de aceite caja" },
        { id: "transmissionFluidLeak", text: "Fuga de fluido de transmisión" },
        { id: "coolantLeak", text: "Fuga de refrigerante" },
        { id: "brakeFluidLeak", text: "Fuga de líquido de freno" },
        { id: "fuelLeak", text: "Fuga de combustible" },
        { id: "acWaterLeak", text: "Fuga de agua del aire acondicionado" },
        { id: "powerSteeringLeak", text: "Fuga de dirección hidráulica" },
        { id: "differentialLeak", text: "Fuga de diferencial" }
    ],
    5: [
        { id: "frontWindshield", text: "Panorámico delantero" },
        { id: "rearWindshield", text: "Panorámico trasero" },
        { id: "windows", text: "Vidrios" },
        { id: "wipers", text: "Plumillas" },
        { id: "rightHeadlight", text: "Farola derecha" },
        { id: "leftHeadlight", text: "Farola izquierda" },
        { id: "rightBrakeLight", text: "Stop derecho" },
        { id: "leftBrakeLight", text: "Stop izquierdo" },
        { id: "horn", text: "Bocina" },
        { id: "battery", text: "Batería" },
        { id: "fuses", text: "Fusibles" },
        { id: "alternator", text: "Alternador" }
    ],
    6: [
        { id: "leftFender", text: "Guardafango izquierdo trasero" },
        { id: "rightFender", text: "Guardafango derecho trasero" },
        { id: "rightSide", text: "Guardafango izquierdo delantero" },
        { id: "leftSide", text: "Guardafango derecho delantero" },
        { id: "leftRearDoor", text: "Puerta trasera derecha" },
        { id: "rightRearDoor", text: "Puerta trasera izquierda" },
        { id: "rightFrontDoor", text: "Puerta delantera derecha" },
        { id: "leftFrontDoor", text: "Puerta delantera izquierda" },
        { id: "rightRunningBoard", text: "Puerta baúl" },
        { id: "hood", text: "Capo" },
        { id: "leftRunningBoard", text: "Estribo izquierdo delantero" },
        { id: "rightRearRunningBoard", text: "Estribo derecho trasero" },
        { id: "frontBumper", text: "Defensa delantera" },
        { id: "rearBumper", text: "Defensa trasera" },
        { id: "roof", text: "Techo" }
    ],
    7: [
        { id: "cylinderCompression", text: "Compresión por cilindro" },
        { id: "obdScan", text: "Escaneo OBD-II" },
        { id: "timingBelt", text: "Correa de repartición" },
        { id: "oilPressure", text: "Presión de aceite" },
        { id: "engineTemperature", text: "Temperatura de operación" }
    ],
    8: [
        { id: "transOilCondition", text: "Estado del aceite de caja" },
        { id: "transChanges", text: "Cambios de marcha" },
        { id: "transClutch", text: "Estado del clutch" },
        { id: "transLeaks", text: "Fugas en la caja" },
        { id: "transNoises", text: "Ruidos anormales" }
    ],
    9: [
        { id: "frontTires", text: "Llantas delanteras" },
        { id: "rearTires", text: "Llantas traseras" },
        { id: "spareTire", text: "Llanta de repuesto" },
        { id: "tireWear", text: "Desgaste" },
        { id: "rimsCondition", text: "Estado de rines" }
    ],
    10: [
        { id: "brakePads", text: "Pastillas de freno" },
        { id: "brakeDiscs", text: "Discos de freno" },
        { id: "frontShocks", text: "Amortiguadores delanteros" },
        { id: "rearShocks", text: "Amortiguadores traseros" },
        { id: "axleTips", text: "Puntas de ejes" },
        { id: "axles", text: "Axiales" },
        { id: "terminals", text: "Terminales" },
        { id: "ballJoints", text: "Rótulas" },
        { id: "bushings", text: "Bujes" },
        { id: "controlArms", text: "Tijeras" },
        { id: "steeringBox", text: "Caja de dirección" },
        { id: "bearings", text: "Rodamientos" },
        { id: "chassis", text: "Chasís" }
    ],
    11: [
        { id: "heating", text: "Calefacción" },
        { id: "ac", text: "Aire acondicionado" },
        { id: "radio", text: "Radio" },
        { id: "alarm", text: "Alarma" },
        { id: "upholstery", text: "Tapicería" },
        { id: "dashboard", text: "Tablero" },
        { id: "dashboardLights", text: "Luces tablero" },
        { id: "interiorLights", text: "Luces interiores" },
        { id: "seatBelts", text: "Cinturones de seguridad" },
        { id: "mirrors", text: "Espejos" },
        { id: "powerWindows", text: "Elevavidrios" },
        { id: "locks", text: "Seguros" }
    ],
    12: [
        { id: "speakers", text: "Parlantes" },
        { id: "powerPlant", text: "Planta" },
        { id: "luxuryRims", text: "Rines de lujo" },
        { id: "safetyFilm", text: "Película de seguridad" },
        { id: "reverseCamera", text: "Cámara de reversa" },
        { id: "roofRack", text: "Canasta / Parrilla de techo" }
    ],
    13: [
        { id: "acceleration", text: "Aceleración" },
        { id: "handling", text: "Maniobrabilidad" },
        { id: "alignment", text: "Ángulo de alineación" },
        { id: "braking", text: "Condición de frenado" },
        { id: "clutch", text: "Condición de embrague" },
        { id: "gearboxEngine", text: "Relación caja-motor" },
        { id: "vibrations", text: "Vibraciones" },
        { id: "steeringBehavior", text: "Comportamiento de la dirección" },
        { id: "highwayTest", text: "Prueba en carretera" }
    ]
};

// ============ UTILIDADES ============
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('es-CO', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    });
}

function sanitizeText(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatCurrency(value) {
    if (!value || isNaN(value)) return '$0';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0
    }).format(value);
}

function parseMoney(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/[^0-9.]/g, '')) || 0;
}

// ============ AUTOGUARDADO ============
function autoSaveDraft() {
    if (window._isResetting) return;

    const draft = {};
    document.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.id && el.type !== 'file') draft[el.id] = el.value;
    });
    localStorage.setItem('peritaje_draft', JSON.stringify({
        data: draft,
        section: currentSection,
        timestamp: Date.now()
    }));
    showDraftStatus();
}

function showDraftStatus() {
    const status = document.getElementById('draftStatus');
    if (!status) return;
    status.classList.add('show');
    status.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Borrador guardado';
    setTimeout(() => status.classList.remove('show'), 2000);
}

function loadDraft() {
    const raw = localStorage.getItem('peritaje_draft');
    if (!raw) return;
    try {
        const { data, section, timestamp } = JSON.parse(raw);
        if (!data) return;

        if (timestamp && (Date.now() - timestamp) > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('peritaje_draft');
            return;
        }

        const tieneDatos = Object.values(data).some(v => v && String(v).trim() !== '');
        if (!tieneDatos) {
            localStorage.removeItem('peritaje_draft');
            return;
        }

        Object.entries(data).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el && val !== undefined && val !== null) {
                el.value = val;
            }
        });

        if (section > 1 && section <= totalSections) {
            document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
            const secEl = document.getElementById(`section-${section}`);
            if (secEl) secEl.classList.add('active');
            currentSection = section;
            updateProgress(section);
        }
    } catch(e) {
        console.warn('Draft corrupto', e);
        localStorage.removeItem('peritaje_draft');
    }
}

let saveTimer;
document.addEventListener('input', () => {
    if (window._isResetting) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(autoSaveDraft, 2500);
});

// ============ NAVEGACIÓN ============
function updateProgress(section) {
    const percent = (section / totalSections) * 100;
    const bar = document.getElementById('progressBar');
    const label = document.getElementById('progressLabel');
    if (bar) bar.style.width = `${percent}%`;
    if (label) label.textContent = `Paso ${section} de ${totalSections}`;
}

function nextSection(sectionNumber) {
    document.getElementById(`section-${currentSection}`)?.classList.remove('active');
    document.getElementById(`section-${sectionNumber}`)?.classList.add('active');
    currentSection = sectionNumber;
    updateProgress(sectionNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    autoSaveDraft();
}

function prevSection(sectionNumber) {
    document.getElementById(`section-${currentSection}`)?.classList.remove('active');
    document.getElementById(`section-${sectionNumber}`)?.classList.add('active');
    currentSection = sectionNumber;
    updateProgress(sectionNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    autoSaveDraft();
}

function backToForm() {
    if (!confirm('¿Volver al formulario? Podrá corregir los datos.')) return;
    document.getElementById('finalReport').style.display = 'none';
    document.getElementById('evaluationForm').style.display = 'block';
    document.getElementById('finalReport').innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ VALIDACIÓN ============
function validateSection(section, event) {
    // BLOQUEAR cualquier comportamiento por defecto (submit, recarga, etc.)
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    let isValid = true;
    const sectionEl = document.getElementById(`section-${section}`);
    if (!sectionEl) return;

    sectionEl.querySelectorAll('.validation-error').forEach(e => e.style.display = 'none');

    sectionEl.querySelectorAll('select[required], input[required]').forEach(element => {
        if (!element.value.trim()) {
            const errEl = document.getElementById(`${element.id}Error`);
            if (errEl) errEl.style.display = 'block';
            element.style.borderColor = 'var(--bad)';
            isValid = false;
        } else {
            element.style.borderColor = '#e0e0e0';
        }
    });

    if (section === 1) {
        const vin = document.getElementById('vehicleChassis').value.trim().toUpperCase();
        if (vin && !/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
            alert('El VIN/Chasis debe tener 17 caracteres válidos (sin I, O, Q).');
            isValid = false;
        }
        const year = parseInt(document.getElementById('vehicleModel').value);
        const cy = new Date().getFullYear() + 1;
        if (year && (year < 1950 || year > cy)) {
            alert('Año del vehículo inválido.');
            isValid = false;
        }
        const km = document.getElementById('vehicleMileage').value;
        if (km && (isNaN(km) || parseInt(km) < 0 || parseInt(km) > 2000000)) {
            alert('Kilometraje inválido.');
            isValid = false;
        }
    }

    if (section === 3) {
        const mv = parseMoney(document.getElementById('marketValue').value);
        const fv = parseMoney(document.getElementById('fasecoldaValue').value);
        const ev = parseMoney(document.getElementById('expertValue').value);
        if (!mv || !fv || !ev) {
            alert('Los valores comerciales deben ser números válidos.');
            isValid = false;
        }
    }

    if (section === 14) {
        const photos = ['photoFront', 'photoSide', 'photoRear', 'photoEngine']
            .map(id => document.getElementById(id).files.length)
            .reduce((a, b) => a + b, 0);
        if (photos === 0) {
            alert('Debe subir al menos una fotografía principal del vehículo.');
            isValid = false;
        }
    }

    if (isValid) {
        if (section < totalSections) {
            nextSection(section + 1);
        } else {
            generateReport();
        }
    } else {
        const firstError = sectionEl.querySelector('.validation-error[style*="display: block"]');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ============ ANEXOS ============
function addAnexo() {
    anexoCounter++;
    const id = anexoCounter;
    const container = document.getElementById('anexosContainer');
    if (!container) return;

    const div = document.createElement('div');
    div.className = 'anexo-item';
    div.id = `anexo-${id}`;
    div.innerHTML = `
        <div class="anexo-header">
            <span><i class="fas fa-image"></i> Anexo #${id}</span>
            <button type="button" class="btn-remove-anexo" onclick="removeAnexo(${id})" title="Eliminar">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <input type="file" accept="image/*" onchange="previewAnexo(${id}, this)">
        <input type="text" placeholder="Descripción de lo que muestra la foto (obligatorio)"
               id="anexoDesc-${id}" oninput="autoSaveDraft()">
        <img class="anexo-preview" id="anexoPreview-${id}" alt="Anexo ${id}">
    `;
    container.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeAnexo(id) {
    const el = document.getElementById(`anexo-${id}`);
    if (el && confirm('¿Eliminar este anexo?')) el.remove();
}

function previewAnexo(id, input) {
    const preview = document.getElementById(`anexoPreview-${id}`);
    if (input.files && input.files[0] && preview) {
        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function getAnexosData() {
    const anexos = [];
    document.querySelectorAll('.anexo-item').forEach(item => {
        const id = item.id.replace('anexo-', '');
        const desc = item.querySelector('input[type="text"]').value.trim();
        const preview = item.querySelector('.anexo-preview');
        if (preview && preview.src && preview.src.startsWith('data:image')) {
            anexos.push({
                number: id,
                description: desc || 'Sin descripción',
                dataUrl: preview.src
            });
        }
    });
    return anexos;
}

// ============ CÁLCULOS ============
function calculateScores() {
    const scores = {};
    for (const sectionId in sectionQuestions) {
        if (!sectionQuestions.hasOwnProperty(sectionId)) continue;
        let total = 0, count = 0;
        sectionQuestions[sectionId].forEach(q => {
            const el = document.getElementById(q.id);
            if (!el) return;
            const v = el.value;
            let pts = 0;
            if (v === 'Bueno' || v === 'Sí') { pts = 100; count++; }
            else if (v === 'Regular') { pts = 60; count++; }
            else if (v === 'Malo' || v === 'No') { pts = 0; count++; }
            else if (v === 'N/A') { /* no cuenta */ }
            else { count++; }
            total += pts;
        });
        scores[sectionId] = count > 0 ? Math.round(total / count) : 0;
    }
    return scores;
}

function calculateGlobalScore(sectionScores) {
    let totalWeighted = 0, totalWeight = 0, criticalPenalty = 0;
    let criticalBelow40 = false;

    const chassisEl = document.getElementById('chassis');
    const chassisBad = chassisEl && chassisEl.value === 'Malo';

    const criticalSections = [4, 7, 8];

    for (const section in sectionScores) {
        if (!sectionWeights[section]) continue;
        let s = sectionScores[section];
        const secNum = parseInt(section);

        if (criticalSections.includes(secNum)) {
            if (s < 40) {
                s = Math.max(0, s - 45);
                criticalPenalty += 25;
                criticalBelow40 = true;
            } else if (s < 60) {
                s = Math.max(0, s - 25);
                criticalPenalty += 15;
            } else if (s < 70) {
                s = Math.max(0, s - 15);
                criticalPenalty += 8;
            }
        }

        totalWeighted += s * sectionWeights[section];
        totalWeight += sectionWeights[section];
    }

    const base = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;

    if (criticalBelow40) return Math.min(base, 60);
    if (chassisBad) return Math.min(base, 65);

    return Math.max(0, base - criticalPenalty);
}

// ============ GENERAR INFORME ============
async function generateReport() {
    document.getElementById('evaluationForm').style.display = 'none';
    document.getElementById('finalReport').style.display = 'block';

    const v = (id) => sanitizeText(document.getElementById(id)?.value || '');
    const vehicleData = {
        class: v('vehicleClass'), brand: v('vehicleBrand'), line: v('vehicleLine'),
        body: v('vehicleBody'), model: v('vehicleModel'),
        nationality: v('vehicleNationality'), doors: v('vehicleDoors'),
        transmission: v('vehicleTransmission'), engine: v('vehicleEngine'),
        fuel: v('vehicleFuel'), traction: v('vehicleTraction'),
        paint: v('vehiclePaint'), service: v('vehicleService'),
        mileage: v('vehicleMileage'), color: v('vehicleColor'),
        absBrakes: v('vehicleAbsBrakes'),
        chassis: v('vehicleChassis'), serial: v('vehicleSerial'),
        motor: v('vehicleMotor'), plate: v('vehiclePlate')
    };

    const sectionScores = calculateScores();
    const globalScore = calculateGlobalScore(sectionScores);
    const peritajeDateTime = getCurrentDateTime();
    const reportNumber = `PE-${Date.now().toString(36).toUpperCase()}`;
    const isApproved = globalScore >= 75;

    window._currentScores = sectionScores;
    window._currentReportNumber = reportNumber;

    const reportHTML = buildReportHTML({
        vehicleData, globalScore, peritajeDateTime, reportNumber, isApproved
    });

    document.getElementById('finalReport').innerHTML = reportHTML;
    loadReportImages();
    animateCommercialValues();
    animateScoreCircle(globalScore);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Guardar en background SIN bloquear la vista
    guardarEnBaseDeDatos(reportNumber)
        .then(result => {
            console.log('✅ Informe guardado exitosamente:', result.numeroReporte);
        })
        .catch(err => {
            console.error('❌ Error al guardar (el informe sigue visible):', err);
        });
}

function buildReportHTML({ vehicleData, globalScore, peritajeDateTime, reportNumber, isApproved }) {
    const qrData = encodeURIComponent(`PERITAJE:${reportNumber}|PLACA:${vehicleData.plate || 'N/A'}|FECHA:${peritajeDateTime}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;

    return `
        <div class="report-header">
            <div class="report-header-content">
                <div class="report-logo">
                    <div class="report-logo-img">
                        <img src="Logoperito.png" alt="Perito Expert" onerror="this.parentElement.innerHTML='PERITO EXPERT'">
                    </div>
                </div>
                <div class="report-title-block">
                    <h2>Informe de Inspección Técnica</h2>
                    <div class="report-number-badge">${reportNumber}</div>
                </div>
            </div>
        </div>

        <div class="report-meta-bar">
            <div class="report-meta-item">
                <span class="label">Fecha y hora</span>
                <span class="value">${peritajeDateTime}</span>
            </div>
            <div class="report-meta-item">
                <span class="label">Vehículo</span>
                <span class="value">${vehicleData.brand || '—'} ${vehicleData.line || ''}</span>
            </div>
            <div class="report-meta-item">
                <span class="label">Placa</span>
                <span class="value">${vehicleData.plate || 'N/A'}</span>
            </div>
            <div class="report-meta-item">
                <span class="label">Resultado</span>
                <span class="value" style="color: ${isApproved ? 'var(--good)' : 'var(--bad)'}">
                    ${isApproved ? '✓ APROBADO' : '✗ NO APROBADO'}
                </span>
            </div>
        </div>

        <div class="vehicle-showcase">
            <div class="vehicle-photos-grid">
                ${photoBox('reportPhotoFront', 'Frontal')}
                ${photoBox('reportPhotoSide', 'Lateral')}
                ${photoBox('reportPhotoRear', 'Trasera')}
                ${photoBox('reportPhotoEngine', 'Motor')}
            </div>
            <div class="vehicle-data-panel">
                <h3><i class="fas fa-car"></i> Ficha Técnica del Vehículo</h3>
                <div class="vehicle-info-grid">
                    ${infoItem('Clase', vehicleData.class)}
                    ${infoItem('Marca', vehicleData.brand)}
                    ${infoItem('Línea', vehicleData.line)}
                    ${infoItem('Carrocería', vehicleData.body)}
                    ${infoItem('Modelo', vehicleData.model)}
                    ${infoItem('Nacionalidad', vehicleData.nationality)}
                    ${infoItem('Puertas', vehicleData.doors)}
                    ${infoItem('Caja', vehicleData.transmission)}
                    ${infoItem('Cilindraje', vehicleData.engine)}
                    ${infoItem('Combustible', vehicleData.fuel)}
                    ${infoItem('Tracción', vehicleData.traction)}
                    ${infoItem('Pintura', vehicleData.paint)}
                    ${infoItem('Servicio', vehicleData.service)}
                    ${infoItem('Kilometraje', vehicleData.mileage)}
                    ${infoItem('Color', vehicleData.color)}
                    ${infoItem('ABS', vehicleData.absBrakes)}
                    ${infoItem('VIN/Chasis', vehicleData.chassis)}
                    ${infoItem('Serial', vehicleData.serial)}
                    ${infoItem('Motor', vehicleData.motor)}
                    ${infoItem('Placa', vehicleData.plate)}
                </div>
            </div>
        </div>

        <div class="commercial-values-section">
            <h3 class="report-section-title"><i class="fas fa-dollar-sign"></i> Valores Comerciales</h3>
            ${generateCommercialValuesHTML()}
        </div>

        <div class="report-section">
            
            ${buildSectionBlock(2, 'Documentación', 'fa-file-contract', 'checklist')}
            ${buildSectionBlock(4, 'Fuga de Fluidos', 'fa-tint', 'checklist', true)}
            ${buildSectionBlock(5, 'Sistema Eléctrico', 'fa-bolt', 'checklist-full')}
            ${buildSectionBlock(6, 'Inspección Visual y Técnica', 'fa-search', 'checklist-full')}
            ${buildSectionBlock(7, 'Estado del Motor', 'fa-cogs', 'checklist-full', true)}
            ${buildSectionBlock(8, 'Transmisión / Caja', 'fa-cog', 'checklist-full', true)}
            ${buildSectionBlock(9, 'Llantas', 'fa-circle-notch', 'checklist')}
            ${buildSectionBlock(10, 'Tren Delantero y Suspensión', 'fa-tools', 'checklist-full')}
            ${buildSectionBlock(11, 'Interior del Vehículo', 'fa-chair', 'checklist-full')}
            ${buildSectionBlock(12, 'Accesorios', 'fa-star', 'checklist')}
            ${buildSectionBlock(13, 'Prueba de Ruta', 'fa-road', 'checklist-full')}
        </div>

        <div class="report-section">
            <div class="observations-box">
                <h3><i class="fas fa-comment-alt"></i> Observaciones del Perito</h3>
                <p>${sanitizeText(document.getElementById('observations').value) || 'Sin observaciones adicionales.'}</p>
            </div>
        </div>

        <div class="global-result-card ${isApproved ? 'approved' : 'rejected'}" id="globalResultCard">
            <div class="result-stamp ${isApproved ? 'approved' : 'rejected'}" id="globalStamp">
                ${isApproved ? '✓ APROBADO' : '✗ NO APROBADO'}
            </div>
            <div class="result-title-main">Resultado Final de la Evaluación</div>
            <div class="result-score-circle">
                <svg class="result-score-svg" viewBox="0 0 200 200">
                    <circle class="result-score-track" cx="100" cy="100" r="90"></circle>
                    <circle class="result-score-fill ${isApproved ? 'approved' : 'rejected'}"
                            cx="100" cy="100" r="90"
                            stroke-dasharray="565"
                            stroke-dashoffset="565"
                            id="scoreCircle"></circle>
                </svg>
                <div class="result-score-number" id="globalScoreNumber">${globalScore}<span class="pct">%</span></div>
                <div class="result-score-caption">PUNTAJE GLOBAL</div>
            </div>
            <div class="result-message" id="globalMessage">
                Vehículo <span class="highlight ${isApproved ? 'approved' : 'rejected'}" id="globalHighlight">
                    ${isApproved ? 'APROBADO' : 'NO APROBADO'}
                </span> según criterios de evaluación
            </div>
            <div class="result-subtext">Puntuación mínima requerida: 75%</div>
            <div class="global-edit-hint" onclick="enableGlobalScoreEdit(this)" title="Clic para editar el puntaje">
                Resultado
            </div>
        </div>

        ${generateAnexosHTML()}

        <div class="qr-verification">
            <img src="${qrUrl}" alt="QR de verificación">
            <div class="qr-text">
                <strong><i class="fas fa-qrcode"></i> Verificación de Autenticidad</strong>
                Escanee este código QR para verificar la autenticidad de este informe.
                Número de peritaje: <strong>${reportNumber}</strong>
            </div>
        </div>

        <div class="signature-area">
            <div class="signature-box">
                <div class="role">Perito Responsable</div>
                <div class="signature-line">Firma</div>
            </div>
            <div class="signature-box">
                <div class="role">Cliente / Asegurado</div>
                <div class="signature-line">Firma</div>
            </div>
        </div>

        ${buildLegalClauses()}

        <div class="report-footer">
            <div class="footer-grid">
                <div class="footer-item"><i class="fas fa-globe"></i> peritoexpert.com.co</div>
                <div class="footer-item"><i class="fas fa-phone"></i> 300 715 2606</div>
                <div class="footer-item"><i class="fas fa-envelope"></i> peritoexpert.bogota@gmail.com</div>
            </div>
            <div class="footer-note">
                Este informe es confidencial y propiedad de PERITOEXPERT. Su distribución está sujeta a autorización. 
                Vigencia: 7 días después de la inspección visual. La evaluación se basa en inspección visual y pruebas 
                funcionales al momento de la revisión. PERITOEXPERT no se hace responsable por fallas mecánicas 
                posteriores a la inspección.
            </div>
        </div>

        <div class="action-buttons">
            <button type="button" onclick="backToForm()" class="btn-action btn-back">
                <i class="fas fa-arrow-left"></i> Corregir Formulario
            </button>
            <button type="button" onclick="printReport()" class="btn-action btn-print">
                <i class="fas fa-print"></i> Imprimir
            </button>
            <button type="button" onclick="saveAsPDF(event)" class="btn-action btn-pdf">
                <i class="fas fa-file-pdf"></i> Guardar PDF
            </button>
            <button type="button" onclick="newEvaluation()" class="btn-action btn-secondary">
                <i class="fas fa-plus"></i> Nueva Evaluación
            </button>
        </div>
    `;
}

function photoBox(id, caption) {
    return `
        <div class="vehicle-photo-box">
            <img src="#" id="${id}" alt="${caption}" style="display:none;" onload="this.style.display='block'; this.nextElementSibling && (this.nextElementSibling.style.display='none')">
            <div class="no-photo">Sin imagen</div>
            <div class="photo-caption">${caption}</div>
        </div>
    `;
}

function infoItem(label, value) {
    return `
        <div class="vehicle-info-item">
            <span class="label">${label}</span>
            <span class="value">${value || '—'}</span>
        </div>
    `;
}

function buildSectionBlock(sectionId, title, icon, layoutClass, isCritical = false) {
    const score = (window._currentScores && window._currentScores[sectionId] != null)
        ? window._currentScores[sectionId] : 0;
    const criticalTag = isCritical ? '<span style="color: var(--bad); font-size: 11px; margin-left: 8px;">(SECCIÓN CRÍTICA)</span>' : '';
    const scoreColor = score < 70 && isCritical ? 'var(--bad)' : 'var(--f1-accent)';

    const criticalAlert = (isCritical && score < 70)
        ? `<div class="critical-section-alert">
               <i class="fas fa-exclamation-triangle"></i>
               <strong>SECCIÓN CRÍTICA:</strong> Esta sección obtuvo ${score}% (menor al 70% requerido).
               Se recomienda revisión detallada de este sistema.
           </div>`
        : '';

    const legendHTML = (parseInt(sectionId) === 4)
        ? `<div class="legend-bar">
               <span class="legend-item"><span class="color-dot good"></span> Bueno/No</span>
               <span class="legend-item"><span class="color-dot regular"></span> Regular</span>
               <span class="legend-item"><span class="color-dot bad"></span> Malo/Sí</span>
               <span class="legend-item"><span class="color-dot na"></span> N/A</span>
           </div>`
        : `<div class="legend-bar">
               <span class="legend-item"><span class="color-dot good"></span> Bueno/Sí</span>
               <span class="legend-item"><span class="color-dot regular"></span> Regular</span>
               <span class="legend-item"><span class="color-dot bad"></span> Malo/No</span>
               <span class="legend-item"><span class="color-dot na"></span> N/A</span>
           </div>`;

    return `
        <div class="subsection" style="margin-bottom: 30px;">
            <h3 class="report-section-title" style="font-size: 15px;">
                <i class="fas ${icon}"></i> ${title} ${criticalTag}
            </h3>
            ${criticalAlert}
            ${legendHTML}
            <div class="${layoutClass}">
                ${generateChecklistItems(sectionId)}
            </div>
            <div class="score-card">
                <div class="score-card-header">
                    <span class="score-card-label">Puntuación ${title}</span>
                    <span class="score-card-value" style="color: ${scoreColor}">${score}%</span>
                </div>
                <div class="gauge">
                    <div class="gauge-value" style="left: ${score}%;"></div>
                </div>
            </div>
        </div>
    `;
}

function generateChecklistItems(sectionId) {
    if (!sectionQuestions[sectionId]) return '';
    let html = '';
    sectionQuestions[sectionId].forEach(q => {
        const el = document.getElementById(q.id);
        if (!el) return;
        const value = el.value;
        let cls = 'na', txt = 'N/A';
        if (value === 'Bueno' || value === 'Sí') { cls = 'good'; txt = '✓'; }
        else if (value === 'Regular') { cls = 'regular'; txt = '~'; }
        else if (value === 'Malo' || value === 'No') { cls = 'bad'; txt = '✗'; }

        html += `
            <div class="check-item ${cls}">
                <div class="status status-${cls}">${txt}</div>
                <div>${q.text}</div>
            </div>
        `;
    });
    return html;
}

function generateCommercialValuesHTML() {
    const mv = parseMoney(document.getElementById('marketValue').value);
    const fv = parseMoney(document.getElementById('fasecoldaValue').value);
    const ev = parseMoney(document.getElementById('expertValue').value);
    const av = parseMoney(document.getElementById('accessoriesValue').value);

    const values = [mv, fv, ev].filter(v => v > 0);
    const minV = values.length ? Math.min(...values) : 0;
    const maxV = values.length ? Math.max(...values) : 0;
    const avgV = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    const maxBar = Math.max(mv, fv, ev, av) || 1;

    const pct = (v) => Math.round((v / maxBar) * 100);

    return `
        <div class="value-chart-item">
            <div class="value-chart-label"><span>Revista Motor</span><span>${formatCurrency(mv)}</span></div>
            <div class="value-bar-bg">
                <div class="value-bar-fill" style="width: 0%" data-target="${pct(mv)}">${pct(mv)}%</div>
            </div>
        </div>
        <div class="value-chart-item">
            <div class="value-chart-label"><span>Fasecolda</span><span>${formatCurrency(fv)}</span></div>
            <div class="value-bar-bg">
                <div class="value-bar-fill" style="width: 0%" data-target="${pct(fv)}">${pct(fv)}%</div>
            </div>
        </div>
        <div class="value-chart-item">
            <div class="value-chart-label"><span>Peritoexpert.com</span><span>${formatCurrency(ev)}</span></div>
            <div class="value-bar-bg">
                <div class="value-bar-fill" style="width: 0%" data-target="${pct(ev)}">${pct(ev)}%</div>
            </div>
        </div>
        <div class="value-chart-item">
            <div class="value-chart-label"><span>Accesorios</span><span>${formatCurrency(av)}</span></div>
            <div class="value-bar-bg">
                <div class="value-bar-fill" style="width: 0%" data-target="${pct(av)}">${pct(av)}%</div>
            </div>
        </div>
        <div class="value-comparison-bar">
            <div class="value-comparison-item"><div class="label">Mínimo</div><div class="value">${formatCurrency(minV)}</div></div>
            <div class="value-comparison-item avg"><div class="label">Promedio</div><div class="value">${formatCurrency(avgV)}</div></div>
            <div class="value-comparison-item"><div class="label">Máximo</div><div class="value">${formatCurrency(maxV)}</div></div>
        </div>
    `;
}

function generateAnexosHTML() {
    const anexos = getAnexosData();
    if (anexos.length === 0) return '';

    return `
        <div class="anexos-gallery-section">
            <div class="anexos-gallery-header">
                <h2><i class="fas fa-paperclip"></i> Anexos Fotográficos <span class="count-badge">${anexos.length}</span></h2>
            </div>
            <div class="anexos-gallery-grid">
                ${anexos.map(a => `
                    <div class="anexo-gallery-card">
                        <img src="${a.dataUrl}" alt="Anexo ${a.number}">
                        <div class="anexo-gallery-caption">
                            <span class="num">${a.number}</span>
                            ${sanitizeText(a.description)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============ EDICIÓN DEL PUNTAJE GLOBAL ============
function enableGlobalScoreEdit(element) {
    const globalResult = element.closest('.global-result-card');
    if (!globalResult) return;

    const scoreNumber = globalResult.querySelector('.result-score-number');
    const currentText = scoreNumber.textContent.replace('%', '');
    const currentScore = parseInt(currentText);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 100;
    input.value = currentScore;
    input.style.cssText = `
        font-size: 52px;
        font-weight: 900;
        color: white;
        background: transparent;
        border: 2px solid rgba(0, 210, 190, 0.6);
        border-radius: 8px;
        padding: 5px 15px;
        width: 160px;
        text-align: center;
        z-index: 2;
        position: relative;
        outline: none;
    `;

    const pctSpan = scoreNumber.querySelector('.pct');
    scoreNumber.innerHTML = '';
    scoreNumber.appendChild(input);
    if (pctSpan) scoreNumber.appendChild(pctSpan);

    input.focus();
    input.select();

    function saveGlobalScore() {
        let newScore = parseInt(input.value);
        if (isNaN(newScore) || newScore < 0) newScore = 0;
        if (newScore > 100) newScore = 100;

        scoreNumber.innerHTML = `${newScore}<span class="pct">%</span>`;

        const isApproved = newScore >= 75;

        globalResult.className = `global-result-card ${isApproved ? 'approved' : 'rejected'}`;

        const stamp = document.getElementById('globalStamp');
        if (stamp) {
            stamp.textContent = isApproved ? '✓ APROBADO' : '✗ NO APROBADO';
            stamp.className = `result-stamp ${isApproved ? 'approved' : 'rejected'}`;
        }

        const highlight = document.getElementById('globalHighlight');
        if (highlight) {
            highlight.textContent = isApproved ? 'APROBADO' : 'NO APROBADO';
            highlight.className = `highlight ${isApproved ? 'approved' : 'rejected'}`;
        }

        const circle = document.getElementById('scoreCircle');
        if (circle) {
            const offset = 565 - (565 * newScore / 100);
            circle.style.strokeDashoffset = offset;
            circle.className = `result-score-fill ${isApproved ? 'approved' : 'rejected'}`;
        }
    }

    input.addEventListener('blur', saveGlobalScore);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur();
        }
    });
}

// ============ CLÁUSULAS LEGALES ============
function buildLegalClauses() {
    return `
        <div class="legal-clauses">
            <div class="highlight-block">
                <h6 style="font-size: 8.5px; color: var(--f1-red); margin-bottom: 5px; font-weight: bold; text-align: center; text-transform: uppercase;">
                    DECLARACIONES, AUTORIZACIONES Y CONDICIONES DEL SERVICIO
                </h6>
                <p style="font-size: 8.5px; color: #333; margin-bottom: 5px; text-align: center; font-weight: bold;">
                    PERITOEXPERT S.A.S.
                </p>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Declaración de veracidad y procedencia del vehículo</p>
                    <p style="margin: 2px 0; text-align: justify;">Declaro bajo gravedad de juramento que toda la información y documentación suministrada a PERITOEXPERT S.A.S. es veraz, completa y corresponde a la realidad. Así mismo, manifiesto que el vehículo presentado para la inspección es de procedencia lícita. En consecuencia, asumo de manera exclusiva cualquier responsabilidad de tipo penal, civil, administrativa o fiscal que se derive de esta orden de trabajo, eximiendo a PERITOEXPERT de cualquier responsabilidad por información falsa, incompleta u omitida.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Autorización para consulta de información</p>
                    <p style="margin: 2px 0; text-align: justify;">Autorizo expresa e irrevocablemente a PERITOEXPERT para consultar mi información personal y la del vehículo en el Registro Único Nacional de Tránsito (RUNT), así como en otras entidades públicas o privadas afiliadas o relacionadas, con el fin de solicitar, consultar y validar la información del vehículo identificado con la placa consignada en el informe de inspección.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Prestación del servicio</p>
                    <p style="margin: 2px 0; text-align: justify;">PERITOEXPERT. presta al cliente el servicio de peritaje automotriz, el cual puede incluir inspección técnica, validación de asegurabilidad y avalúo comercial referencial, de acuerdo con el alcance contratado y las condiciones establecidas en el presente informe.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Inspección de asegurabilidad</p>
                    <p style="margin: 2px 0; text-align: justify;">La empresa se compromete a realizar la inspección de asegurabilidad del vehículo conforme a los criterios técnicos, protocolos internos y convenios vigentes con las compañías aseguradoras, cuando aplique, aclarando que el dictamen emitido corresponde exclusivamente al estado observable del vehículo al momento de la inspección.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Avalúo comercial</p>
                    <p style="margin: 2px 0; text-align: justify;">PERITOEXPERT. se compromete a realizar el avalúo comercial del vehículo conforme a metodologías, referencias del mercado y procedimientos internos establecidos. El resultado del avalúo no compromete a la empresa con la comercialización del automotor, ni constituye una obligación de compra, venta o intermediación.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Notificaciones y reportes</p>
                    <p style="margin: 2px 0; text-align: justify;">PERITOEXPERT bajo ninguna circunstancia realizará notificaciones, reportes, alertas o registros ante autoridades, aseguradoras o terceros respecto al vehículo durante la ejecución del peritaje, salvo que exista una obligación legal expresa que así lo exija.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Derecho de suspensión o retiro del vehículo</p>
                    <p style="margin: 2px 0; text-align: justify;">La empresa se reserva el derecho de suspender la inspección o retirar el vehículo del proceso cuando este represente un riesgo para la seguridad del personal, presente fallas mecánicas graves, condiciones estructurales peligrosas o cualquier situación que pueda comprometer la integridad del vehículo o de los inspectores.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">No realización de reparaciones</p>
                    <p style="margin: 2px 0; text-align: justify;">PERITOEXPERT no realiza ningún tipo de reparación, ajuste, mantenimiento ni modificación al vehículo inspeccionado. Todas las pruebas y verificaciones realizadas son únicamente de carácter diagnóstico y observacional.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Resultados del informe</p>
                    <p style="margin: 2px 0; text-align: justify;">La empresa no emite conceptos, resultados ni conclusiones distintas a las derivadas directamente de la inspección realizada. PERITOEXPERT S.A.S. no recomienda talleres, empresas ni terceros para la reparación o intervención del vehículo.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Interpretación del informe</p>
                    <p style="margin: 2px 0; text-align: justify;">Los arreglos, reparaciones o decisiones que se deriven del informe de inspección no comprometen a PERITOEXPERT, teniendo en cuenta que el informe puede estar sujeto a diversas interpretaciones técnicas por parte de terceros.</p>
                </div>

                <div style="margin-bottom: 6px;">
                    <p style="margin: 2px 0; font-weight: bold;">Exoneración por daños durante la inspección</p>
                    <p style="margin: 2px 0; text-align: justify;">PERITOEXPERT no se hace responsable por daños que se presenten durante la inspección cuando estos se deban a condiciones preexistentes del vehículo, desgaste natural o falta de mantenimiento, incluyendo, pero sin limitarse a: bomba de gasolina eléctrica (por bajo nivel de combustible), correa de repartición (por incumplimiento de mantenimientos recomendados por el fabricante), bobinas electrónicas, guayas de acelerador, embrague, frenos, capó, elementos eléctricos, bombillos de farolas, luces de freno, luces exploradoras, motor, caja o transmisión, así como cualquier otro componente que falle por uso previo o deterioro anterior al ingreso del vehículo al peritaje.</p>
                </div>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">SUSPENSIÓN</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> PERITOEXPERT realiza una inspección visual de los componentes visibles del sistema de suspensión, tales como: tijeras, barra estabilizadora, espirales, tensores, bujes, muñecos, soportes, brazos axiales, terminales, rótulas y muelles. Adicionalmente, se efectúa una verificación básica del rebote del vehículo mediante la aplicación de fuerza manual.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> La validación visual y la prueba de rebote se realizan sin desmontar ningún componente del vehículo, y se limitan únicamente a los elementos accesibles durante la inspección.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> La evaluación del estado funcional interno de espirales de suspensión, ballestas, barras de torsión, amortiguadores presurizados, sistemas hidráulicos o neumáticos de suspensión, sensores, actuadores o controladores electrónicos asociados al sistema. Tampoco se determina la vida útil restante de los elementos de suspensión, tales como tijeras, espirales, tensores, barra estabilizadora, bujes o componentes similares.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">FRENOS</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> El peritaje incluye un diagnóstico visual y una verificación física básica del funcionamiento del pedal de freno y del freno de estacionamiento. Se revisa visualmente el estado de los discos de freno, el nivel del líquido de frenos y la posible presencia de fugas en las líneas hidráulicas visibles.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> La verificación del estado de los discos se limita a una inspección visual, por lo cual el resultado no garantiza el desempeño funcional del sistema de frenos en condiciones reales de uso.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> La determinación del nivel de desgaste o vida útil de pastillas, bandas, zapatas o elementos de fricción. No se evalúa el estado funcional ni la durabilidad de guayas, bomba de freno, freno de mano ni sistemas de asistencia. No se valida el funcionamiento de sensores, módulos electrónicos EBD, ABS u otros sistemas de control de frenado. No se analiza la calidad del líquido de frenos ni se realizan pruebas de ruta.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">DIRECCIÓN</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> PERITOEXPERT verifica visualmente la existencia de fugas de aceite en la caja de dirección y en el depósito del sistema hidráulico. Se inspecciona el estado visible de guardapolvos, brazos de dirección y axiales, así como la presencia de pines de seguridad en terminales y rótulas, cuando aplique.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> Esta revisión es de carácter visual y no implica el uso de equipos profesionales de diagnóstico para validar el desempeño interno del sistema.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se realizan mediciones de alineación como camber, caster, convergencia o divergencia. No se evalúa la suavidad, precisión o confort del timón. No se valida el estado funcional interno de la caja de dirección, holguras internas, desgaste de componentes ni su vida útil.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">LLANTAS</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Se inspecciona el estado del labrado y de la banda radial de las llantas en uso, verificando que cumplan con las profundidades mínimas exigidas por la normativa técnica vigente.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> La estimación de vida útil de las llantas se realiza con base en la profundidad del labrado, la cual puede variar considerablemente dependiendo del tipo de conducción y uso posterior del vehículo.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se revisan componentes internos de las llantas ni se detectan deformaciones internas o externas no visibles a simple vista.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">RINES</h6>
                <p style="margin: 2px 0;">PERITOEXPERT no valida si los rines presentan procesos previos de rectificación, reconstrucción, deformación estructural, fisuras o desbalanceo.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">SISTEMA ELÉCTRICO</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Se verifica el funcionamiento observable de los sistemas eléctricos y electrónicos del vehículo, incluyendo: techo corredizo (si aplica), retrovisores eléctricos, limpiabrisas delantero y trasero, nivel de líquido limpiaparabrisas, luces (altas, bajas, direccionales, estacionarias, freno, reversa, placa, antiniebla, luz interior y exploradoras), aire acondicionado, calefacción, desempañador, tablero de instrumentos (radio, velocímetro, tacómetro, reloj, pito y testigos) y sistema de bloqueo central.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> La revisión se realiza de forma visual y funcional básica. El correcto funcionamiento depende del estado de carga de la batería al momento del peritaje.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se determina la vida útil de componentes eléctricos ni la potencia real de iluminación. No se inspeccionan conexiones eléctricas internas. No se valida el funcionamiento de alarmas originales o genéricas, funciones automáticas de elevalunas, retracción de espejos ni sensores o módulos electrónicos de seguridad o confort.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">TRANSMISIÓN DE POTENCIA</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Inspección visual del estado de ejes cardánicos y crucetas, verificación de fugas de fluidos en diferencial, caja de transmisión y bomba de embrague. Se revisa el nivel del líquido de embrague cuando aplique y el estado visible de guardapolvos de semiejes.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> La inspección se realiza con el vehículo en condición estacionaria, sin encendido prolongado ni uso de equipos especializados.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se valida el funcionamiento interno de la caja de velocidades ni del diferencial. No se evalúa desgaste interno del embrague, selectores de cambio, transmisiones automáticas, manuales, CVT o secuenciales. No se inspeccionan juntas homocinéticas, rodamientos, ruidos internos, ni sistemas de tracción integral.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">CHASIS</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Revisión visual de puntas de chasis delanteras y traseras, piso de carrocería, baúl, panel trasero, parales, traviesas, largueros, capota, soldaduras y sellantes estructurales, así como la originalidad del sistema de identificación.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> Un buen estado visual no garantiza que el vehículo conserve las medidas de alineación originales, ya que pueden existir deformaciones no perceptibles.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se realiza medición de cotas estructurales, distancia entre ejes ni inspección de áreas no visibles sin desmontaje.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">PINTURA</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Validación visual del estado de la pintura y medición del espesor de micras para identificar posibles intervenciones.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se determina si la pintura es de fábrica ni se realizan pruebas de tono, imprimación o adherencia.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">ACCESORIOS</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Inventario visual de accesorios adicionales al equipamiento original y estimación referencial de su valor.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> Los accesorios solo se consideran como valor adicional y no garantizan funcionamiento correcto.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se valida el estado funcional ni comercial real de los accesorios.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">MOTOR</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Revisión visual de fugas de fluidos, sistema de escape en baja, radiador, niveles de aceite y refrigerante, estado de correas y originalidad de identificación.</p>
                <p style="margin: 2px 0;"><strong>Observaciones:</strong> No se realiza diagnóstico con el motor en funcionamiento ni análisis interno del motor.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se evalúa desgaste interno, emisiones contaminantes, ruidos normales ni calidad de fluidos.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">CARROCERÍA</h6>
                <p style="margin: 2px 0;"><strong>Alcance del servicio:</strong> Inspección visual de tapicería, componentes de confort, amortiguadores de baúl y capó, lámina, pintura y ajustes de piezas externas.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> No se valida estanqueidad, ruidos, ni estructuras internas no visibles.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">VALORES COMERCIALES - PERITOEXPERT</h6>
                <p style="margin: 2px 0;">Los valores entregados son referenciales, basados en fuentes del mercado colombiano y no constituyen un valor definitivo de compra, venta o aseguramiento.</p>
            </div>

            <div style="margin-bottom: 8px;">
                <h6 style="font-size: 8.5px; color: #333; margin-bottom: 3px; font-weight: bold;">TESTIGOS DE ALERTA (TABLERO)</h6>
                <p style="margin: 2px 0;">Se verifica el encendido y apagado correcto de los testigos al iniciar el vehículo.</p>
                <p style="margin: 2px 0;"><strong>Este servicio NO comprende:</strong> Diagnóstico de fallas electrónicas ni lectura de códigos mediante escáner.</p>
            </div>
        </div>
    `;
}

// ============ IMÁGENES ============
function loadReportImages() {
    const map = {
        Front: 'reportPhotoFront',
        Side: 'reportPhotoSide',
        Rear: 'reportPhotoRear',
        Engine: 'reportPhotoEngine'
    };
    Object.entries(map).forEach(([key, targetId]) => {
        const input = document.getElementById(`photo${key}`);
        const img = document.getElementById(targetId);
        if (!img) return;
        if (input && input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                img.src = e.target.result;
                img.style.display = 'block';
                const noPhoto = img.nextElementSibling;
                if (noPhoto && noPhoto.classList.contains('no-photo')) noPhoto.style.display = 'none';
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
}

// ============ ANIMACIONES ============
function animateCommercialValues() {
    setTimeout(() => {
        document.querySelectorAll('.value-bar-fill').forEach(bar => {
            const target = bar.getAttribute('data-target');
            bar.style.width = `${target}%`;
        });
    }, 300);
}

function animateScoreCircle(globalScore) {
    const circle = document.getElementById('scoreCircle');
    if (!circle) return;
    const offset = 565 - (565 * globalScore / 100);
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 300);
}

// ============ PDF / IMPRIMIR / NUEVA ============
function saveAsPDF(event) {
    const element = document.getElementById('finalReport');
    const plate = document.getElementById('vehiclePlate').value || 'reporte';
    const date = new Date().toISOString().split('T')[0];

    const opt = {
        margin: [8, 8, 8, 8],
        filename: `Peritaje_${plate}_${date}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
            scale: 2, useCORS: true, letterRendering: true,
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight
        },
        jsPDF: { unit: 'in', format: [11, 17], orientation: 'portrait', compress: true },
        pagebreak: {
            mode: ['css', 'legacy'],
            avoid: [
                '.score-card', '.anexo-gallery-card', '.report-section',
                '.global-result-card', '.vehicle-showcase', '.signature-area',
                '.subsection', '.report-footer', '.qr-verification'
            ]
        }
    };

    const btn = event.currentTarget;
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
            alert('Error al generar el PDF.');
        });
}

function printReport() { window.print(); }

function newEvaluation() {
    if (!confirm('¿Iniciar nueva evaluación? Se perderán los datos actuales.')) return;

    window._isResetting = true;

    if (typeof saveTimer !== 'undefined' && saveTimer) {
        clearTimeout(saveTimer);
        saveTimer = null;
    }

    localStorage.removeItem('peritaje_draft');

    const form = document.getElementById('evaluationForm');
    try { form.reset(); } catch (e) {}

    form.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.type === 'file') {
            try { el.value = ''; } catch (e) {}
        } else if (el.tagName === 'SELECT') {
            el.selectedIndex = 0;
            el.value = '';
        } else if (el.type === 'checkbox' || el.type === 'radio') {
            el.checked = false;
        } else {
            el.value = '';
        }
        el.style.borderColor = '#e0e0e0';
    });

    form.querySelectorAll('.validation-error').forEach(e => {
        e.style.display = 'none';
    });

    document.querySelectorAll('.photo-preview').forEach(p => {
        p.style.display = 'none';
        p.removeAttribute('src');
        p.src = '';
    });

    const cont = document.getElementById('anexosContainer');
    if (cont) cont.innerHTML = '';
    anexoCounter = 0;

    document.getElementById('finalReport').style.display = 'none';
    document.getElementById('finalReport').innerHTML = '';
    form.style.display = 'block';

    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    const sec1 = document.getElementById('section-1');
    if (sec1) sec1.classList.add('active');
    currentSection = 1;
    updateProgress(1);

    window._currentScores = null;
    window._currentReportNumber = null;

    localStorage.removeItem('peritaje_draft');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        window._isResetting = false;
        localStorage.removeItem('peritaje_draft');
    }, 800);
}

// ============ GUARDAR EN BASE DE DATOS ============
async function guardarEnBaseDeDatos(reportNumber) {
    const formData = new FormData();

    const respuestas = {};
    document.querySelectorAll('select, input[type="text"], input[type="number"], textarea').forEach(el => {
        if (el.id) respuestas[el.id] = el.value;
    });

    const vehicleData = {
        class: document.getElementById('vehicleClass')?.value || '',
        brand: document.getElementById('vehicleBrand')?.value || '',
        line: document.getElementById('vehicleLine')?.value || '',
        body: document.getElementById('vehicleBody')?.value || '',
        model: document.getElementById('vehicleModel')?.value || '',
        nationality: document.getElementById('vehicleNationality')?.value || '',
        doors: document.getElementById('vehicleDoors')?.value || '',
        transmission: document.getElementById('vehicleTransmission')?.value || '',
        engine: document.getElementById('vehicleEngine')?.value || '',
        fuel: document.getElementById('vehicleFuel')?.value || '',
        traction: document.getElementById('vehicleTraction')?.value || '',
        paint: document.getElementById('vehiclePaint')?.value || '',
        service: document.getElementById('vehicleService')?.value || '',
        mileage: document.getElementById('vehicleMileage')?.value || '',
        color: document.getElementById('vehicleColor')?.value || '',
        absBrakes: document.getElementById('vehicleAbsBrakes')?.value || '',
        chassis: document.getElementById('vehicleChassis')?.value || '',
        serial: document.getElementById('vehicleSerial')?.value || '',
        motor: document.getElementById('vehicleMotor')?.value || '',
        plate: document.getElementById('vehiclePlate')?.value || ''
    };

    const valores = {
        marketValue: parseMoney(document.getElementById('marketValue')?.value || 0),
        fasecoldaValue: parseMoney(document.getElementById('fasecoldaValue')?.value || 0),
        expertValue: parseMoney(document.getElementById('expertValue')?.value || 0),
        accessoriesValue: parseMoney(document.getElementById('accessoriesValue')?.value || 0)
    };

    const puntajeGlobal = parseInt(document.getElementById('globalScoreNumber')?.textContent) || 0;
    const aprobado = document.getElementById('globalStamp')?.textContent.includes('APROBADO') || false;

    const user = JSON.parse(localStorage.getItem('perito_user') || '{}');

    const data = {
        numeroReporte: reportNumber || window._currentReportNumber || `PE-${Date.now()}`,
        vehicleData,
        valores,
        puntajeGlobal,
        aprobado,
        respuestas,
        observaciones: document.getElementById('observations')?.value || '',
        htmlInforme: document.getElementById('finalReport').innerHTML,
        creadoPor: user.username || 'anónimo'
    };

    formData.append('data', JSON.stringify(data));

    ['photoFront', 'photoSide', 'photoRear', 'photoEngine'].forEach(id => {
        const input = document.getElementById(id);
        if (input && input.files[0]) {
            const tipo = id.replace('photo', '').toLowerCase();
            formData.append('fotos', input.files[0], tipo);
        }
    });

    document.querySelectorAll('.anexo-item').forEach((item, i) => {
        const fileInput = item.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
            formData.append('fotos', fileInput.files[0], `anexo-${i}`);
        }
    });

    console.log('📤 Enviando peritaje al servidor...');

    const response = await fetch(`${API_BASE_URL}/peritajes`, {
        method: 'POST',
        body: formData
    });

    const textoRespuesta = await response.text();
    console.log('📥 Respuesta del servidor (status ' + response.status + ')');

    let result;
    try {
        result = JSON.parse(textoRespuesta);
    } catch (e) {
        console.error('❌ El servidor devolvió HTML en lugar de JSON:', textoRespuesta.substring(0, 300));
        throw new Error('El servidor devolvió un error interno. Revisa la terminal del backend.');
    }

    if (result.ok) {
        console.log('✅ Peritaje guardado:', result.numeroReporte);
        return result;
    } else {
        console.error('❌ Error del servidor:', result.error);
        throw new Error(result.error || 'Error desconocido del servidor');
    }
}

// ============ SESIÓN ============
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('perito_user') || 'null');
    if (user) {
        const welcome = document.getElementById('welcomeUser');
        if (welcome) welcome.textContent = `Hola, ${user.nombre}`;
    }

    document.querySelectorAll('.photo-upload').forEach(input => {
        input.addEventListener('change', function() {
            const previewId = 'preview' + this.id.replace('photo', '');
            const preview = document.getElementById(previewId);
            if (this.files && this.files[0] && preview) {
                const reader = new FileReader();
                reader.onload = e => {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    loadDraft();
});

function cerrarSesion() {
    if (!confirm('¿Cerrar sesión?')) return;
    localStorage.removeItem('perito_user');
    window.location.href = 'login.html';
}