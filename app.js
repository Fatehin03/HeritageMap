// --- CONFIGURATION ---
const FOCUS_COORDS = [31.9522, 35.2332];
const INITIAL_ZOOM = 2; // Start zoomed out for the "Fly-in" effect
const FOCUS_ZOOM = 8;

// --- INITIALIZE MAP ---
const map = L.map('map', {
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: true,
    zoomControl: false // We will move it to the right for a cleaner look
}).setView(FOCUS_COORDS, INITIAL_ZOOM);

// Move zoom controls to the right
L.control.zoom({ position: 'bottomright' }).addTo(map);

// Add a high-end "Voyager" Base Layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// --- GEODATA: PALESTINE BOUNDARY ---
// This covers the entire territory as a single entity
const palestineBoundary = {
    "type": "Feature",
    "properties": { "name": "Palestine" },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [34.21, 31.22], [34.40, 31.50], [34.70, 31.90], 
            [35.00, 32.50], [35.20, 32.90], [35.60, 33.30], 
            [35.90, 33.00], [35.60, 32.50], [35.40, 31.50], 
            [35.50, 29.50], [34.80, 29.50], [34.21, 31.22]
        ]]
    }
};

// --- STYLING & LAYERS ---
const geoLayer = L.geoJSON(palestineBoundary, {
    style: {
        color: "#059669",      // Emerald-600
        weight: 3,
        fillColor: "#10b981",  // Emerald-500
        fillOpacity: 0.2,
        dashArray: '5, 5'      // Professional dashed border
    }
}).addTo(map);

// Add Permanent Text Label
L.marker(FOCUS_COORDS, { opacity: 0 }).addTo(map)
    .bindTooltip("PALESTINE", { 
        permanent: true, 
        direction: 'center', 
        className: 'custom-label' 
    }).openTooltip();

// --- INTERACTIVE FUNCTIONS ---

function closeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        // Cinematic fly-in effect after closing modal
        resetView();
    }, 500);
}

function resetView() {
    map.flyTo(FOCUS_COORDS, FOCUS_ZOOM, {
        duration: 3,
        easeLinearity: 0.25
    });
}
