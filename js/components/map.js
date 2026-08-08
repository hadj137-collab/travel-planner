/**
 * Leaflet.js Interactive Map Component for Taiwan Itineraries
 */

const TAIWAN_LANDMARKS_GEO = {
  "香格里拉休閒農場": [24.6304, 121.7242],
  "香格里拉農場": [24.6304, 121.7242],
  "香格里拉冬山河渡假飯店": [24.6785, 121.8152],
  "梅花湖": [24.6465, 121.7345],
  "羅東夜市": [24.6766, 121.7708],
  "斑比山丘": [24.6385, 121.7315],
  "張美阿嬤農場": [24.6645, 121.6780],
  "太平山": [24.4925, 121.5342],
  "清水地熱": [24.6125, 121.5645],
  "國立傳統藝術中心": [24.6865, 121.8242],
  "傳藝中心": [24.6865, 121.8242],
  "礁溪溫泉": [24.8290, 121.7735],
  "外澳沙灘": [24.8770, 121.8415],
  "蘭陽博物館": [24.8692, 121.8322],
  "龜山島": [24.8420, 121.9510],
  "迪化街": [25.0565, 121.5103],
  "象山": [25.0274, 121.5707],
  "台北101": [25.0339, 121.5645],
  "松山文創園區": [25.0438, 121.5606],
  "四四南村": [25.0314, 121.5619],
  "赤峰街": [25.0552, 121.5204],
  "國華街": [22.9972, 120.1970],
  "安平古堡": [22.9997, 120.1605],
  "赤崁樓": [22.9975, 120.2026],
  "七星潭": [24.0305, 121.6322],
  "東大門夜市": [23.9745, 121.6110],
  "太魯閣": [24.1585, 121.6220],
  "日月潭": [23.8517, 120.9165],
  "清境農場": [24.0585, 121.1632],
  "墾丁國家公園": [21.9482, 120.7975],
  "鵝鑾鼻燈塔": [21.9015, 120.8525],
  "恆春古城": [22.0042, 120.7442]
};

function getCorrectedLocation(act) {
  const nameStr = (act.title + ' ' + (act.location || '')).toLowerCase();
  for (const [key, coords] of Object.entries(TAIWAN_LANDMARKS_GEO)) {
    if (nameStr.includes(key.toLowerCase())) {
      return { lat: coords[0], lng: coords[1], corrected: true };
    }
  }
  return { lat: act.lat, lng: act.lng, corrected: false };
}

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
    const geo = getCorrectedLocation(act);
    const useLat = geo.lat;
    const useLng = geo.lng;

    if (useLat && useLng) {
      const pos = [useLat, useLng];
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
          <h4 style="margin-bottom: 4px; font-weight: 700;">${act.title} ${geo.corrected ? '<span style="font-size:10px; color:#059669; background:#ecfdf5; padding:1px 4px; border-radius:3px;">📍已精確校正</span>' : ''}</h4>
          <p style="font-size: 12px; color: #475569; margin-bottom: 6px;">⏰ ${act.time}</p>
          <p style="font-size: 12px; margin-bottom: 8px;">${act.description}</p>
          <a href="${act.google_maps_url || `https://maps.google.com/?q=${encodeURIComponent(act.title)}`}" target="_blank" style="color: #2563eb; font-size: 12px; font-weight: 600;">
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
