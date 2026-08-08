/**
 * RoamAI Travel Planner - Standalone Bundle JS
 * (Eliminates browser file:// CORS restrictions for seamless double-click operation)
 */

(function () {
  'use strict';

  // --- 1. Taiwan Demo Data & API Service ---
  const TAIWAN_DEMO_TRIPS = {
    "台北 3 天 2 夜文青美食之旅": {
      "trip_title": "台北 3 天 2 夜文青美食與秘境巡禮",
      "destination": "台北市, 台灣",
      "total_days": 3,
      "currency": "TWD",
      "estimated_total_cost_per_person": 8500,
      "summary": "深度探索台北文青街區、大稻埕百年風華、象山夜景與士林夜市在地隱藏美食。",
      "itinerary": [
        {
          "day": 1,
          "date_title": "大稻埕風華與西門町夜生活",
          "activities": [
            {
              "time": "10:30 - 13:00",
              "title": "大稻埕迪化街散策 & 老宅咖啡",
              "category": "sightseeing",
              "location": "迪化街商圈",
              "description": "漫步南北貨與布業老街，探訪孵化文創門市與老宅烘焙咖啡。",
              "estimated_cost": 350,
              "lat": 25.0565,
              "lng": 121.5103,
              "google_maps_url": "https://maps.google.com/?q=Dihua+Street+Taipei",
              "tips": "推薦嘗試霞海城隍廟附近的古早味青草茶。"
            },
            {
              "time": "13:30 - 15:30",
              "title": "永樂市場在地小吃（林合發油飯/丸隆生魚行）",
              "category": "food",
              "location": "永樂市場",
              "description": "享用排隊名店古早味油飯與新鮮平價立吞生魚片。",
              "estimated_cost": 400,
              "lat": 25.0537,
              "lng": 121.5100,
              "google_maps_url": "https://maps.google.com/?q=Yongle+Fabric+Market",
              "tips": "油飯限量販售，建議早點抵達。"
            },
            {
              "time": "18:00 - 21:00",
              "title": "西門町徒步區 & 萬年大樓懷舊遊戲",
              "category": "shopping",
              "location": "西門町徒步區",
              "description": "感受台北潮流文化，探訪萬年大樓模型玩具店與阿宗麵線。",
              "estimated_cost": 800,
              "lat": 25.0422,
              "lng": 121.5080,
              "google_maps_url": "https://maps.google.com/?q=Ximending+Taipei",
              "tips": "阿宗麵線無座位，大家都在街頭站著享用。"
            }
          ]
        },
        {
          "day": 2,
          "date_title": "中山赤峰街文青雜貨與象山夕陽",
          "activities": [
            {
              "time": "11:00 - 14:00",
              "title": "中山赤峰街獨立選物店與拉麵巡禮",
              "category": "shopping",
              "location": "赤峰街商圈",
              "description": "穿梭打鐵街老巷弄，打卡獨立書店、古著選品店與勝王拉麵。",
              "estimated_cost": 650,
              "lat": 25.0552,
              "lng": 121.5204,
              "google_maps_url": "https://maps.google.com/?q=Chifeng+Street+Taipei",
              "tips": "週末午後人潮較多，熱門咖啡館需現場候位。"
            },
            {
              "time": "16:30 - 18:30",
              "title": "象山親山步道健行俯瞰 Taipei 101 夕陽",
              "category": "sightseeing",
              "location": "象山六巨石觀景台",
              "description": "登高遠眺台北盆地，捕捉夕陽餘暉與 Taipei 101 的壯麗燈光。",
              "estimated_cost": 0,
              "lat": 25.0274,
              "lng": 121.5707,
              "google_maps_url": "https://maps.google.com/?q=Xiangshan+Six+Giant+Rocks",
              "tips": "階梯較陡峭，建議穿著舒適運動鞋並備妥防蚊液。"
            },
            {
              "time": "19:30 - 21:30",
              "title": "臨江街(通化)夜市探訪在地隱藏美食",
              "category": "food",
              "location": "通化夜市",
              "description": "品嚐御品元冰火湯圓、梁記滷味與上海生煎包。",
              "estimated_cost": 350,
              "lat": 25.0305,
              "lng": 121.5549,
              "google_maps_url": "https://maps.google.com/?q=Tonghua+Night+Market",
              "tips": "冰火湯圓淋上桂花蜜口感層次極佳。"
            }
          ]
        },
        {
          "day": 3,
          "date_title": "松煙文創園區與信義區商圈打卡",
          "activities": [
            {
              "time": "10:00 - 12:30",
              "title": "松山文創園區與誠品生活松菸店",
              "category": "sightseeing",
              "location": "松山文創園區",
              "description": "參觀菸廠古蹟展覽、逛誠品選品店與生態池散步。",
              "estimated_cost": 250,
              "lat": 25.0438,
              "lng": 121.5606,
              "google_maps_url": "https://maps.google.com/?q=Songshan+Cultural+and+Creative+Park",
              "tips": "園區內有眾多台灣設計師品牌門市。"
            },
            {
              "time": "13:00 - 15:30",
              "title": "信義區商圈與四四南村眷村文化",
              "category": "sightseeing",
              "location": "四四南村",
              "description": "在眷村老建築前拍 Taipei 101 全景，逛好丘貝果文創市集。",
              "estimated_cost": 300,
              "lat": 25.0314,
              "lng": 121.5619,
              "google_maps_url": "https://maps.google.com/?q=Sishi+Nan+Village",
              "tips": "好丘的厚醬貝果是必吃招牌產品。"
            }
          ]
        }
      ],
      "budget_breakdown": {
        "transportation": 800,
        "accommodation": 4200,
        "food": 2500,
        "tickets_and_shopping": 1000
      },
      "packing_list": [
        "悠遊卡 / 一卡通 (捷運與公車必備)",
        "輕便雨具 (台北午後易有雷陣雨)",
        "舒適健行鞋 (步道與老街漫步)",
        "個人隨身藥品與防蚊液"
      ],
      "travel_tips": [
        "台北捷運車廂內嚴禁飲食與吸菸。",
        "公車上下車皆需刷卡，捷運轉乘公車享有優惠折扣。"
      ]
    }
  };

  async function generateItinerary(promptText, apiKey = '') {
    if (!apiKey) {
      await new Promise(r => setTimeout(r, 800));
      return {
        ...TAIWAN_DEMO_TRIPS["台北 3 天 2 夜文青美食之旅"],
        is_demo: true
      };
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `你是一位專精於台灣國內旅遊（台北、新北、宜蘭、花蓮、台中、台南、高雄、台東、日月潭、墾丁等台灣各地）的專業旅遊規劃師。
根據使用者的提示詞需求，為使用者規劃一份位於台灣內部地區的詳細旅遊行程。
費用請全部使用新台幣 (TWD / NT$) 計算。

請嚴格遵守以下格式回傳完整的 JSON 數據，不得包含任何 Markdown 外框（如不可包含 \`\`\`json）：
{
  "trip_title": "行程標題 (如：台南 3 天 2 夜古蹟美食漫遊)",
  "destination": "目的地 (如：台南市, 台灣)",
  "total_days": 數字 (天數),
  "currency": "TWD",
  "estimated_total_cost_per_person": 每人總預算數字 (新台幣),
  "summary": "2-3 句簡短行程亮點總結",
  "itinerary": [
    {
      "day": 1,
      "date_title": "當天主題標題",
      "activities": [
        {
          "time": "時間範圍 (如: 09:00 - 11:30)",
          "title": "景點或活動名稱",
          "category": "sightseeing | food | shopping | accommodation | transport 擇一",
          "location": "具體地點名稱",
          "description": "活動詳細描述",
          "estimated_cost": 預估花費數字(TWD),
          "lat": 緯度數字(台灣境內座標),
          "lng": 經度數字(台灣境內座標),
          "google_maps_url": "https://maps.google.com/?q=地點名稱",
          "tips": "在地實用建議"
        }
      ]
    }
  ],
  "budget_breakdown": {
    "transportation": 交通費用數字,
    "accommodation": 住宿費用數字,
    "food": 餐飲費用數字,
    "tickets_and_shopping": 門票與購物數字
  },
  "packing_list": ["防曬用品", "悠遊卡", "雨具"],
  "travel_tips": ["台灣國內旅遊貼心提醒1", "貼心提醒2"]
}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${systemPrompt}\n\n使用者提示詞：${promptText}` }]
          }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.error?.message || `API 呼叫失敗 (HTTP ${response.status})`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Gemini API 未能產生有效內容");

      const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch (err) {
      console.error('Gemini API Error:', err);
      throw err;
    }
  }

  // --- 2. Leaflet Map Engine & Taiwan Landmark Geo-Correction ---
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
  let currentTripDataForMap = null;

  function initMap(mapElementId = 'map') {
    const mapEl = document.getElementById(mapElementId);
    if (!mapEl || typeof L === 'undefined') return;

    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
    }

    mapInstance = L.map(mapElementId).setView([24.1477, 120.6736], 8);

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

  function renderMapDaySelector(tripData, activeDayIndex) {
    const mapPanel = document.getElementById('panel-map');
    if (!mapPanel || !tripData) return;

    let selectorBar = document.getElementById('map-day-selector');
    if (!selectorBar) {
      selectorBar = document.createElement('div');
      selectorBar.id = 'map-day-selector';
      selectorBar.style.cssText = 'display:flex;gap:8px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px;flex-wrap:wrap;align-items:center;';
      // Insert before the map-container-wrapper
      const mapWrapper = mapPanel.querySelector('.map-container-wrapper');
      if (mapWrapper) {
        mapPanel.insertBefore(selectorBar, mapWrapper);
      } else {
        mapPanel.prepend(selectorBar);
      }
    }

    selectorBar.innerHTML = `
      <span style="font-size:0.8rem;color:var(--text-muted);font-weight:600;white-space:nowrap;display:flex;align-items:center;padding:4px 0;">🗺️ 查看日期：</span>
      ${tripData.itinerary.map((d, idx) => `
        <button class="map-day-chip ${idx === activeDayIndex ? 'active' : ''}" data-map-day="${idx}"
          style="padding:6px 14px;border-radius:999px;border:1px solid var(--glass-border);font-size:0.8rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.15s;background:${idx === activeDayIndex ? 'var(--accent-cyan)' : 'var(--bg-dark-card)'};color:${idx === activeDayIndex ? '#0f172a' : 'var(--text-muted)'}">
          Day ${d.day}: ${d.date_title || `第 ${d.day} 天`}
        </button>
      `).join('')}
    `;

    selectorBar.querySelectorAll('.map-day-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const dayIdx = parseInt(btn.getAttribute('data-map-day'), 10);
        renderMapDaySelector(tripData, dayIdx);
        updateMapMarkers(tripData.itinerary[dayIdx]?.activities || []);
        // Invalidate map size after re-render
        if (mapInstance) setTimeout(() => mapInstance.invalidateSize(), 100);
      });
    });
  }

  function updateMapMarkers(activities = []) {
    if (!mapInstance || !markersLayerGroup) return;

    markersLayerGroup.clearLayers();
    if (routePolyline) {
      mapInstance.removeLayer(routePolyline);
      routePolyline = null;
    }

    if (mapInstance) {
      setTimeout(() => mapInstance.invalidateSize(), 150);
    }

    if (!activities || !activities.length) return;

    const latLngs = [];

    // Build geo list, then detect & spread duplicate coordinates
    const geoList = activities.map((act, idx) => {
      const geo = getCorrectedLocation(act);
      return { act, idx, lat: geo.lat, lng: geo.lng, corrected: geo.corrected };
    }).filter(g => g.lat && g.lng);

    // Group entries sharing the same coordinate (rounded to 4 decimal places ~11m)
    const coordGroups = {};
    geoList.forEach(g => {
      const key = `${g.lat.toFixed(4)},${g.lng.toFixed(4)}`;
      if (!coordGroups[key]) coordGroups[key] = [];
      coordGroups[key].push(g);
    });

    // For groups with >1 marker, spread them in a small circle so all are visible
    const SPREAD_RADIUS = 0.0014; // ~155 m
    Object.values(coordGroups).forEach(group => {
      if (group.length < 2) return;
      group.forEach((g, i) => {
        const angle = (2 * Math.PI / group.length) * i - Math.PI / 2;
        g.lat = g.lat + SPREAD_RADIUS * Math.sin(angle);
        g.lng = g.lng + SPREAD_RADIUS * Math.cos(angle);
      });
    });

    geoList.forEach(({ act, idx, lat, lng, corrected }) => {
      const pos = [lat, lng];
      latLngs.push(pos);

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
          <h4 style="margin-bottom: 4px; font-weight: 700;">${act.title} ${corrected ? '<span style="font-size:10px; color:#059669; background:#ecfdf5; padding:1px 4px; border-radius:3px;">📍已精確校正</span>' : ''}</h4>
          <p style="font-size: 12px; color: #475569; margin-bottom: 6px;">⏰ ${act.time}</p>
          <p style="font-size: 12px; margin-bottom: 8px;">${act.description}</p>
          <a href="${act.google_maps_url || `https://maps.google.com/?q=${encodeURIComponent(act.title)}`}" target="_blank" style="color: #2563eb; font-size: 12px; font-weight: 600;">
            開啓 Google 地圖導航 ↗
          </a>
        </div>
      `;
      marker.bindPopup(popupHtml);
    });

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

  // --- 3. View Renderers ---
  const CATEGORY_ICONS = {
    sightseeing: '🏛️',
    food: '🍜',
    shopping: '🛍️',
    accommodation: '🏨',
    transport: '🚃',
    default: '📍'
  };

  function renderTimeline(tripData, containerEl) {
    if (!tripData || !tripData.itinerary || !tripData.itinerary.length) {
      containerEl.innerHTML = '<div class="glass-panel" style="padding: 2rem; text-align: center;">尚未有行程資料</div>';
      return;
    }

    let activeDayIndex = 0;

    function updateView() {
      const dayData = tripData.itinerary[activeDayIndex];

      containerEl.innerHTML = `
        <div class="timeline-days-nav">
          ${tripData.itinerary.map((d, idx) => `
            <button class="day-chip ${idx === activeDayIndex ? 'active' : ''}" data-day-index="${idx}">
              Day ${d.day}: ${d.date_title || `第 ${d.day} 天`}
            </button>
          `).join('')}
        </div>

        <div class="timeline-day-summary" style="display:flex;align-items:center;margin-bottom:1rem;padding:0.5rem 0.75rem;background:rgba(6,182,212,0.06);border-radius:var(--radius-lg);border:1px solid rgba(6,182,212,0.15);">
          <span style="font-size:0.85rem;color:var(--text-muted);">📅 ${dayData.date_title || `第 ${activeDayIndex+1} 天`} · <strong style="color:var(--text-main);">${dayData.activities.length} 個行程</strong></span>
        </div>

        <div class="timeline-list">
          ${dayData.activities.map((act, actIdx) => {
            const icon = CATEGORY_ICONS[act.category] || CATEGORY_ICONS.default;
            const geo = getCorrectedLocation(act);
            return `
              <div class="timeline-card glass-panel animate-fade-in" style="animation-delay: ${actIdx * 0.08}s; cursor: pointer;" data-lat="${geo.lat}" data-lng="${geo.lng}" title="點擊在地圖上查看此景點">
                <div class="timeline-node">${icon}</div>
                <div class="activity-header">
                  <span class="activity-time">⏰ ${act.time}</span>
                </div>
                <h3 class="activity-title">${act.title}</h3>
                <p class="activity-description">${act.description}</p>
                ${act.tips ? `<div style="font-size: 0.8rem; color: var(--accent-cyan); background: rgba(6,182,212,0.08); padding: 6px 12px; border-radius: var(--radius-md); margin-bottom: 12px;">💡 貼心小提醒：${act.tips}</div>` : ''}
                
                <div class="activity-footer">
                  <span>📍 ${act.location}</span>
                  <a href="${act.google_maps_url || `https://maps.google.com/?q=${encodeURIComponent(act.title)}`}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 4px;" onclick="event.stopPropagation()">
                    開啓導航 ↗
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      containerEl.querySelectorAll('.day-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          activeDayIndex = parseInt(btn.getAttribute('data-day-index'), 10);
          updateView();
          if (tripData.itinerary[activeDayIndex]) {
            updateMapMarkers(tripData.itinerary[activeDayIndex].activities || []);
            renderMapDaySelector(tripData, activeDayIndex);
          }
        });
      });

      containerEl.querySelectorAll('.timeline-card').forEach((card, cardIdx) => {
        card.addEventListener('click', () => {
          const lat = parseFloat(card.getAttribute('data-lat'));
          const lng = parseFloat(card.getAttribute('data-lng'));
          if (lat && lng && window.focusMapLocation) {
            window.focusMapLocation(lat, lng);
          }
        });
      });
    }

    updateView();
  }

  function renderBudget(tripData, containerEl) {
    if (!tripData) return;

    const budget = tripData.budget_breakdown || {
      transportation: 1500,
      accommodation: 4500,
      food: 2500,
      tickets_and_shopping: 1500
    };

    const totalCost = (budget.transportation || 0) + 
                      (budget.accommodation || 0) + 
                      (budget.food || 0) + 
                      (budget.tickets_and_shopping || 0);

    const categories = [
      { label: '交通費用', value: budget.transportation || 0, icon: '🚃', color: '#3b82f6' },
      { label: '住宿費用', value: budget.accommodation || 0, icon: '🏨', color: '#6366f1' },
      { label: '美食餐飲', value: budget.food || 0, icon: '🍜', color: '#06b6d4' },
      { label: '門票與購物', value: budget.tickets_and_shopping || 0, icon: '🛍️', color: '#10b981' }
    ];

    containerEl.innerHTML = `
      <div class="glass-panel" style="padding: 2rem; margin-bottom: 1.5rem; text-align: center; background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15)); border: 1px solid var(--accent-cyan);">
        <h3 style="font-size: 1rem; color: var(--text-muted); margin-bottom: 0.5rem;">全行程每人預估花費</h3>
        <div style="font-size: 3rem; font-weight: 800; color: var(--text-main); font-family: 'Outfit', sans-serif;">
          NT$ ${totalCost.toLocaleString()}
        </div>
        <p style="font-size: 0.875rem; color: var(--accent-cyan); margin-top: 0.25rem;">
          以 ${tripData.total_days || 3} 天行程估算 (單位：新台幣 TWD)
        </p>
      </div>

      <div class="budget-grid">
        ${categories.map(cat => {
          const percent = totalCost > 0 ? Math.round((cat.value / totalCost) * 100) : 0;
          return `
            <div class="budget-card glass-panel animate-fade-in">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">${cat.icon}</div>
              <h4 style="font-size: 1rem; color: var(--text-muted);">${cat.label}</h4>
              <div class="budget-amount">NT$ ${cat.value.toLocaleString()}</div>
              <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">佔比 ${percent}%</div>
              
              <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;">
                <div style="width: ${percent}%; height: 100%; background: ${cat.color}; border-radius: 999px;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderChecklist(tripData, containerEl) {
    if (!tripData) return;

    const defaultPacking = tripData.packing_list || [
      "身分證 / 健保卡 / 駕駛執照",
      "悠遊卡 / 一卡通 (大眾運輸必備)",
      "手機充電器與行動電源",
      "個人隨身常備藥品",
      "折疊晴雨傘 (台灣天氣多變)",
      "舒適健行鞋 / 慢跑鞋",
      "換洗衣物與個人盥洗用品",
      "現金與信用卡"
    ];

    const travelTips = tripData.travel_tips || [
      "台灣超商 (7-11 / 全家) 密集度高，提供 ATM 提款、悠遊卡加值與便民服務。",
      "搭乘台北/高雄捷運及公車時請遵守秩序，車廂內禁止飲食。",
      "台灣天氣夏季多陣雨且較炎熱，建議做好防曬與補充水分。"
    ];

    containerEl.innerHTML = `
      <div class="checklist-container">
        <div class="checklist-group glass-panel animate-fade-in">
          <h3 class="checklist-title">
            <span>🎒</span> 智慧行李檢查表
            <span id="checklist-progress" style="margin-left:auto;font-size:0.8rem;font-weight:600;color:var(--accent-cyan);">0 / ${defaultPacking.length}</span>
          </h3>
          <div style="width:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:999px;margin-bottom:1rem;overflow:hidden;">
            <div id="checklist-progress-bar" style="height:100%;width:0%;background:var(--accent-cyan);border-radius:999px;transition:width 0.3s;"></div>
          </div>
          <div id="packing-items-list">
            ${defaultPacking.map((item, idx) => `
              <label class="checklist-item" style="cursor:pointer;">
                <input type="checkbox" class="checklist-checkbox" id="chk-${idx}">
                <span class="checklist-text">${item}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="checklist-group glass-panel animate-fade-in" style="animation-delay: 0.1s;">
          <h3 class="checklist-title">
            <span>💡</span> 台灣在地旅遊須知 & 小貼士
          </h3>
          <ul style="list-style: none; padding: 0;">
            ${travelTips.map(tip => `
              <li style="font-size: 0.875rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; gap: 0.5rem; align-items: flex-start;">
                <span style="color: var(--accent-cyan); font-weight: bold;">•</span>
                <span>${tip}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;

    let checkedCount = 0;
    const total = defaultPacking.length;

    function updateProgress() {
      const pct = Math.round((checkedCount / total) * 100);
      const progressEl = document.getElementById('checklist-progress');
      const barEl = document.getElementById('checklist-progress-bar');
      if (progressEl) progressEl.textContent = `${checkedCount} / ${total}`;
      if (barEl) barEl.style.width = pct + '%';
      if (barEl) barEl.style.background = pct === 100 ? 'var(--accent-emerald)' : 'var(--accent-cyan)';
    }

    containerEl.querySelectorAll('.checklist-checkbox').forEach(chk => {
      chk.addEventListener('change', () => {
        const textNode = chk.nextElementSibling;
        if (chk.checked) {
          textNode.style.textDecoration = 'line-through';
          textNode.style.opacity = '0.5';
          checkedCount++;
        } else {
          textNode.style.textDecoration = 'none';
          textNode.style.opacity = '1';
          checkedCount--;
        }
        updateProgress();
      });
    });
  }

  function exportICS(tripData) {
    if (!tripData || !tripData.itinerary) return;

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//RoamAI Travel Planner//TW',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${tripData.trip_title || '台灣旅遊行程'}`
    ];

    const nowStr = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const today = new Date();

    tripData.itinerary.forEach((day, dayIdx) => {
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + dayIdx + 1);
      const dateStr = eventDate.toISOString().slice(0, 10).replace(/-/g, '');

      day.activities.forEach((act) => {
        icsContent.push(
          'BEGIN:VEVENT',
          `UID:roamai-${Date.now()}-${Math.random().toString(36).substr(2, 5)}@roamai.tw`,
          `DTSTAMP:${nowStr}`,
          `DTSTART;VALUE=DATE:${dateStr}`,
          `SUMMARY:${act.title} (${act.category || '活動'})`,
          `DESCRIPTION:${(act.description || '').replace(/\n/g, ' ')}\\n\\n地點: ${act.location || ''}`,
          `LOCATION:${act.location || ''}`,
          'END:VEVENT'
        );
      });
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${tripData.trip_title || 'travel_itinerary'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function copyTextItinerary(tripData) {
    if (!tripData) return;

    let text = `✈️ 【${tripData.trip_title}】\n📍 目的地：${tripData.destination}\n💰 預估每人預算：NT$ ${tripData.estimated_total_cost_per_person?.toLocaleString()}\n\n`;

    tripData.itinerary.forEach((day) => {
      text += `📅 Day ${day.day}: ${day.date_title}\n`;
      day.activities.forEach((act) => {
        text += `  • ${act.time} ${act.title} (${act.location})\n`;
      });
      text += `\n`;
    });

    text += `✨ 由 RoamAI 智慧旅遊規劃器產生`;

    navigator.clipboard.writeText(text).then(() => {
      alert('行程文字已成功複製到剪貼簿！可直接貼上分享給好友。');
    }).catch(() => {
      alert('複製成功（或請手動複製）。');
    });
  }

  // --- 4. Main App Controller ---
  class MainApp {
    constructor() {
      this.apiKey = localStorage.getItem('roamai_gemini_key') || '';
      this.favorites = JSON.parse(localStorage.getItem('roamai_favorites') || '[]');
      this.currentTrip = null;
      this.activeTab = 'timeline';
      this.isDark = true;
      this.initMapReady = false;

      this.initElements();
      this.bindEvents();
      this.setupPresets();
    }

    initElements() {
      this.loadingOverlay = document.getElementById('loading-overlay');
      this.dashboard = document.getElementById('dashboard');
      this.tripTitleEl = document.getElementById('trip-title');
      this.tripMetaEl = document.getElementById('trip-meta');
      
      this.tabTimeline = document.getElementById('tab-timeline');
      this.tabMap = document.getElementById('tab-map');
      this.tabChecklist = document.getElementById('tab-checklist');

      this.panelTimeline = document.getElementById('panel-timeline');
      this.panelMap = document.getElementById('panel-map');
      this.panelChecklist = document.getElementById('panel-checklist');

      this.apiKeyModal = document.getElementById('api-key-modal');
      this.apiKeyInput = document.getElementById('api-key-input');
      this.favoritesModal = document.getElementById('favorites-modal');
      this.favoritesListContainer = document.getElementById('favorites-list-container');
      this.bookmarkBtn = document.getElementById('bookmark-trip-btn');
      this.promptInput = document.getElementById('prompt-input');
      this.generateBtn = document.getElementById('generate-btn');
    }

    setupPresets() {
      const chipsContainer = document.getElementById('preset-chips');
      const presets = [
        "台北 3 天 2 夜文青美食與老街巡禮，兩人同行，預算約 9000",
        "台南 3 天 2 夜國華街小吃與老宅古蹟之旅，放鬆慢活風格",
        "花蓮宜蘭 4 天 3 夜山海景觀與夜市美食慢遊，自駕行程",
        "台中日月潭 3 天 2 夜網美打卡與湖光山色之旅，大眾運輸",
        "墾丁 3 天 2 夜水上活動與恆春古城夕陽渡假之旅"
      ];

      if (chipsContainer) {
        chipsContainer.innerHTML = `
          <span class="chip-label">💡 熱門台灣靈感：</span>
          ${presets.map(p => `
            <button class="chip-btn" data-preset="${p}">
              ${p.split('，')[0]}
            </button>
          `).join('')}
        `;

        chipsContainer.querySelectorAll('.chip-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            if (this.promptInput) {
              this.promptInput.value = btn.getAttribute('data-preset');
              this.promptInput.focus();
            }
          });
        });
      }
    }

    bindEvents() {
      // Generate Button Click
      if (this.generateBtn) {
        this.generateBtn.addEventListener('click', () => {
          const val = this.promptInput ? this.promptInput.value.trim() : '';
          if (!val) {
            alert('請先輸入您的旅遊需求提示詞（例如：「台南 3 天 2 夜美食之旅」）');
            if (this.promptInput) this.promptInput.focus();
            return;
          }
          this.handleGenerate(val);
        });
      }

      // Theme Toggle
      const themeBtn = document.getElementById('theme-btn');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          this.isDark = !this.isDark;
          document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
          themeBtn.textContent = this.isDark ? '🌙' : '☀️';
        });
      }

      // Favorites Modal Triggers
      const favoritesBtn = document.getElementById('favorites-btn');
      const closeFavoritesBtn = document.getElementById('close-favorites-btn');
      const clearFavoritesBtn = document.getElementById('clear-favorites-btn');

      if (favoritesBtn) {
        favoritesBtn.addEventListener('click', () => {
          this.renderFavoritesModal();
          if (this.favoritesModal) this.favoritesModal.classList.add('active');
        });
      }

      if (closeFavoritesBtn) {
        closeFavoritesBtn.addEventListener('click', () => {
          if (this.favoritesModal) this.favoritesModal.classList.remove('active');
        });
      }

      if (clearFavoritesBtn) {
        clearFavoritesBtn.addEventListener('click', () => {
          if (!this.favorites.length) return;
          if (confirm('確定要清空所有已收藏的行程嗎？')) {
            this.favorites = [];
            localStorage.setItem('roamai_favorites', JSON.stringify([]));
            this.renderFavoritesModal();
            this.updateBookmarkButtonState();
          }
        });
      }

      // Bookmark Current Trip Button
      if (this.bookmarkBtn) {
        this.bookmarkBtn.addEventListener('click', () => {
          this.toggleFavoriteCurrentTrip();
        });
      }

      // API Key Modal
      const apiKeyBtn = document.getElementById('api-key-btn');
      const saveApiKeyBtn = document.getElementById('save-api-key-btn');
      const closeApiKeyBtn = document.getElementById('close-api-key-btn');

      if (apiKeyBtn) {
        apiKeyBtn.addEventListener('click', () => {
          if (this.apiKeyInput) this.apiKeyInput.value = this.apiKey;
          if (this.apiKeyModal) this.apiKeyModal.classList.add('active');
        });
      }

      if (closeApiKeyBtn) {
        closeApiKeyBtn.addEventListener('click', () => {
          if (this.apiKeyModal) this.apiKeyModal.classList.remove('active');
        });
      }

      if (saveApiKeyBtn) {
        saveApiKeyBtn.addEventListener('click', () => {
          this.apiKey = this.apiKeyInput.value.trim();
          localStorage.setItem('roamai_gemini_key', this.apiKey);
          if (this.apiKeyModal) this.apiKeyModal.classList.remove('active');
          alert(this.apiKey ? 'API 金鑰已成功儲存！' : '已清除 API 金鑰（將使用台灣預設示範模式）');
        });
      }

      // Tabs Switcher
      const tabs = [
        { btn: this.tabTimeline, panel: this.panelTimeline, name: 'timeline' },
        { btn: this.tabMap, panel: this.panelMap, name: 'map' },
        { btn: this.tabChecklist, panel: this.panelChecklist, name: 'checklist' }
      ];

      tabs.forEach(t => {
        if (t.btn) {
          t.btn.addEventListener('click', () => {
            tabs.forEach(x => {
              if (x.btn) x.btn.classList.remove('active');
              if (x.panel) x.panel.classList.remove('active');
            });
            t.btn.classList.add('active');
            if (t.panel) t.panel.classList.add('active');
            this.activeTab = t.name;

            if (t.name === 'map') {
              setTimeout(() => {
                if (!this.initMapReady) {
                  initMap('map');
                  this.initMapReady = true;
                }
                if (mapInstance) {
                  mapInstance.invalidateSize();
                }
                if (this.currentTrip && this.currentTrip.itinerary) {
                  renderMapDaySelector(this.currentTrip, 0);
                  updateMapMarkers(this.currentTrip.itinerary[0]?.activities || []);
                }
              }, 150);
            }
          });
        }
      });

      // Export Buttons
      const exportIcsBtn = document.getElementById('export-ics-btn');
      const shareBtn = document.getElementById('share-btn');

      if (exportIcsBtn) {
        exportIcsBtn.addEventListener('click', () => exportICS(this.currentTrip));
      }
      if (shareBtn) {
        shareBtn.addEventListener('click', () => copyTextItinerary(this.currentTrip));
      }

      // Re-prompt Assistant Bar
      const repromptBtn = document.getElementById('reprompt-btn');
      const repromptInput = document.getElementById('reprompt-input');

      if (repromptBtn && repromptInput) {
        repromptBtn.addEventListener('click', () => {
          const text = repromptInput.value.trim();
          if (!text) return;
          this.handleGenerate(`基於現有行程（${this.currentTrip?.trip_title || ''}），進行以下微調要求：${text}`);
          repromptInput.value = '';
        });
      }
    }

    async handleGenerate(promptText) {
      if (this.loadingOverlay) this.loadingOverlay.classList.add('active');

      try {
        const tripData = await generateItinerary(promptText, this.apiKey);
        this.currentTrip = tripData;
        this.renderDashboard();
      } catch (err) {
        alert(`生成失敗: ${err.message}`);
      } finally {
        if (this.loadingOverlay) this.loadingOverlay.classList.remove('active');
      }
    }

    renderDashboard() {
      if (!this.currentTrip) return;

      if (this.dashboard) {
        this.dashboard.classList.remove('dashboard-hidden');
        this.dashboard.scrollIntoView({ behavior: 'smooth' });
      }

      if (this.tripTitleEl) this.tripTitleEl.textContent = this.currentTrip.trip_title;
      if (this.tripMetaEl) {
        this.tripMetaEl.innerHTML = `
          <span class="trip-meta-item">📍 ${this.currentTrip.destination}</span>
          <span class="trip-meta-item">🗓️ ${this.currentTrip.total_days} 天行程</span>
          ${this.currentTrip.is_demo ? '<span style="color: var(--accent-amber); font-weight: 600; padding: 2px 8px; background: rgba(245, 158, 11, 0.15); border-radius: var(--radius-sm); margin-left: 8px;">💡 示範模式（點右上角🔑設定 API Key 解鎖自由生成）</span>' : ''}
        `;
      }

      // Render timeline view
      if (this.panelTimeline) renderTimeline(this.currentTrip, this.panelTimeline);

      // Always initialize map (not lazy)
      currentTripDataForMap = this.currentTrip;
      if (!this.initMapReady) {
        initMap('map');
        this.initMapReady = true;
      }
      if (this.currentTrip.itinerary && this.currentTrip.itinerary[0]) {
        updateMapMarkers(this.currentTrip.itinerary[0].activities || []);
        // Render map day selector starting at day 0
        renderMapDaySelector(this.currentTrip, 0);
      }

      // Render checklist
      if (this.panelChecklist) renderChecklist(this.currentTrip, this.panelChecklist);

      this.updateBookmarkButtonState();
    }

    toggleFavoriteCurrentTrip() {
      if (!this.currentTrip) return;
      
      const tripId = this.currentTrip.trip_title;
      const index = this.favorites.findIndex(f => f.trip_title === tripId);

      if (index > -1) {
        this.favorites.splice(index, 1);
        alert('已將該行程從收藏中移除。');
      } else {
        this.favorites.unshift({
          ...this.currentTrip,
          saved_at: new Date().toLocaleDateString('zh-TW')
        });
        alert('⭐ 已成功加入我的收藏！');
      }

      localStorage.setItem('roamai_favorites', JSON.stringify(this.favorites));
      this.updateBookmarkButtonState();
    }

    updateBookmarkButtonState() {
      if (!this.bookmarkBtn || !this.currentTrip) return;
      const isFav = this.favorites.some(f => f.trip_title === this.currentTrip.trip_title);

      if (isFav) {
        this.bookmarkBtn.innerHTML = '★ 已收藏';
        this.bookmarkBtn.style.background = 'rgba(245, 158, 11, 0.2)';
        this.bookmarkBtn.style.borderColor = 'var(--accent-amber)';
        this.bookmarkBtn.style.color = 'var(--accent-amber)';
      } else {
        this.bookmarkBtn.innerHTML = '⭐ 收藏行程';
        this.bookmarkBtn.style.background = '';
        this.bookmarkBtn.style.borderColor = '';
        this.bookmarkBtn.style.color = '';
      }
    }

    renderFavoritesModal() {
      if (!this.favoritesListContainer) return;

      if (!this.favorites || !this.favorites.length) {
        this.favoritesListContainer.innerHTML = `
          <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⭐</div>
            <p>目前尚無收藏的行程。</p>
            <p style="font-size: 0.8rem; margin-top: 0.25rem;">在生成行程後，點擊「⭐ 收藏行程」即可儲存於此處！</p>
          </div>
        `;
        return;
      }

      this.favoritesListContainer.innerHTML = this.favorites.map((trip, idx) => `
        <div class="glass-panel" style="padding: 1.25rem; margin-bottom: 0.875rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-left: 3px solid var(--accent-amber);">
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">${trip.trip_title}</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; gap: 0.75rem;">
              <span>📍 ${trip.destination}</span>
              <span>🗓️ ${trip.total_days} 天</span>
              <span>🕒 收藏時間：${trip.saved_at || '近期'}</span>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-primary load-fav-btn" data-fav-idx="${idx}" style="padding: 6px 12px; font-size: 0.8rem;">
              載入行程
            </button>
            <button class="btn btn-secondary delete-fav-btn" data-fav-idx="${idx}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--accent-rose);">
              🗑️
            </button>
          </div>
        </div>
      `).join('');

      // Bind Load Events
      this.favoritesListContainer.querySelectorAll('.load-fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-fav-idx'), 10);
          const favTrip = this.favorites[idx];
          if (favTrip) {
            this.currentTrip = favTrip;
            this.renderDashboard();
            if (this.favoritesModal) this.favoritesModal.classList.remove('active');
          }
        });
      });

      // Bind Delete Events
      this.favoritesListContainer.querySelectorAll('.delete-fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-fav-idx'), 10);
          this.favorites.splice(idx, 1);
          localStorage.setItem('roamai_favorites', JSON.stringify(this.favorites));
          this.renderFavoritesModal();
          this.updateBookmarkButtonState();
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.roamApp = new MainApp();

    // Register Service Worker for PWA Android support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('SW registration skipped:', err);
      });
    }
  });
})();
