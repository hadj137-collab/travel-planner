/**
 * Timeline & Daily Schedule View Component
 */

const CATEGORY_ICONS = {
  sightseeing: '🏛️',
  food: '🍜',
  shopping: '🛍️',
  accommodation: '🏨',
  transport: '🚃',
  default: '📍'
};

export function renderTimeline(tripData, containerEl, onSelectActivityCallback) {
  if (!tripData || !tripData.itinerary || !tripData.itinerary.length) {
    containerEl.innerHTML = '<div class="glass-panel" style="padding: 2rem; text-align: center;">尚未有行程資料</div>';
    return;
  }

  let activeDayIndex = 0;

  function updateView() {
    const dayData = tripData.itinerary[activeDayIndex];

    containerEl.innerHTML = `
      <!-- Day Tabs Navigation -->
      <div class="timeline-days-nav">
        ${tripData.itinerary.map((d, idx) => `
          <button class="day-chip ${idx === activeDayIndex ? 'active' : ''}" data-day-index="${idx}">
            Day ${d.day}: ${d.date_title || `第 ${d.day} 天`}
          </button>
        `).join('')}
      </div>

      <!-- Timeline List -->
      <div class="timeline-list">
        ${dayData.activities.map((act, actIdx) => {
          const icon = CATEGORY_ICONS[act.category] || CATEGORY_ICONS.default;
          return `
            <div class="timeline-card glass-panel animate-fade-in" style="animation-delay: ${actIdx * 0.08}s;" data-lat="${act.lat}" data-lng="${act.lng}">
              <div class="timeline-node">${icon}</div>
              <div class="activity-header">
                <span class="activity-time">⏰ ${act.time}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">NT$ ${act.estimated_cost || 0}</span>
              </div>
              <h3 class="activity-title">${act.title}</h3>
              <p class="activity-description">${act.description}</p>
              ${act.tips ? `<div style="font-size: 0.8rem; color: var(--accent-cyan); background: rgba(6,182,212,0.08); padding: 6px 12px; border-radius: var(--radius-md); margin-bottom: 12px;">💡 貼心小提醒：${act.tips}</div>` : ''}
              
              <div class="activity-footer">
                <span>📍 ${act.location}</span>
                <a href="${act.google_maps_url || `https://maps.google.com/?q=${encodeURIComponent(act.title)}`}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 4px;">
                  開啓導航 ↗
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Bind Day Switchers
    containerEl.querySelectorAll('.day-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeDayIndex = parseInt(btn.getAttribute('data-day-index'), 10);
        updateView();
        if (onSelectActivityCallback) {
          onSelectActivityCallback(tripData.itinerary[activeDayIndex]);
        }
      });
    });

    // Bind Activity Card Click linkage
    containerEl.querySelectorAll('.timeline-card').forEach(card => {
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
