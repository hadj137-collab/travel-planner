/**
 * Leaflet.js Interactive Map Component for Taiwan Itineraries
 */

let mapInstance = null;
let markersLayerGroup = null;
let routePolyline = null;

export function initMap(mapElementId = 'map') {
  const mapEl = document.getElementById(mapElementId);
  if (!mapEl || typeof L === 'undefined') return;

  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  // Taiwan default center (Taipei 25.033, 121.5654)
  mapInstance = L.map(mapElementId).setView([25.0330, 121.5654], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(mapInstance);

  markersLayerGroup = L.layerGroup().addTo(mapInstance);

  window.focusMapLocation = (lat, lng, zoom = 15) => {
    if (mapInstance && lat && lng) {
      mapInstance.flyTo([lat, lng], zoom, { duration: 1.2 });
    }
  };

  setTimeout(() => {
    if (mapInstance) mapInstance.invalidateSize();
  }, 200);
}

export function updateMapMarkers(activities = []) {
  if (!mapInstance || !markersLayerGroup) return;

  markersLayerGroup.clearLayers();
  if (routePolyline) {
    mapInstance.removeLayer(routePolyline);
    routePolyline = null;
  }

  if (!activities || !activities.length) return;

  const latLngs = [];

  activities.forEach((act, idx) => {
    if (act.lat && act.lng) {
      const pos = [act.lat, act.lng];
      latLngs.push(pos);

      // Create Custom HTML Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="
          width: 32px; 
          height: 32px; 
          background: linear-gradient(135deg, #6366f1, #06b6d4); 
          color: #fff; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-weight: 800; 
          font-size: 14px; 
          box-shadow: 0 4px 12px rgba(6,182,212,0.6); 
          border: 2px solid #ffffff;">
          ${idx + 1}
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(pos, { icon: customIcon }).addTo(markersLayerGroup);
      
      const popupHtml = `
        <div style="font-family: inherit; color: #0f172a;">
          <h4 style="margin-bottom: 4px; font-weight: 700;">${act.title}</h4>
          <p style="font-size: 12px; color: #475569; margin-bottom: 6px;">⏰ ${act.time}</p>
          <p style="font-size: 12px; margin-bottom: 8px;">${act.description}</p>
          <a href="${act.google_maps_url || '#'}" target="_blank" style="color: #2563eb; font-size: 12px; font-weight: 600;">
            開啓 Google 地圖導航 ↗
          </a>
        </div>
      `;
      marker.bindPopup(popupHtml);
    }
  });

  // Draw Polyline connect routes
  if (latLngs.length > 1) {
    routePolyline = L.polyline(latLngs, {
      color: '#06b6d4',
      weight: 4,
      opacity: 0.8,
      dashArray: '8, 8'
    }).addTo(mapInstance);

    mapInstance.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
  } else if (latLngs.length === 1) {
    mapInstance.setView(latLngs[0], 14);
  }
}
