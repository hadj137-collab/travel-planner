/**
 * Smart Packing & Travel Checklist Component
 */

export function renderChecklist(tripData, containerEl) {
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
      <!-- Packing List -->
      <div class="checklist-group glass-panel animate-fade-in">
        <h3 class="checklist-title">
          <span>🎒</span> 智慧行李檢查表
        </h3>
        <div id="packing-items-list">
          ${defaultPacking.map((item, idx) => `
            <label class="checklist-item">
              <input type="checkbox" class="checklist-checkbox" id="chk-${idx}">
              <span class="checklist-text">${item}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Travel Tips -->
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

  // Bind checkbox state persistence
  containerEl.querySelectorAll('.checklist-checkbox').forEach(chk => {
    chk.addEventListener('change', () => {
      const textNode = chk.nextElementSibling;
      if (chk.checked) {
        textNode.style.textDecoration = 'line-through';
        textNode.style.opacity = '0.5';
      } else {
        textNode.style.textDecoration = 'none';
        textNode.style.opacity = '1';
      }
    });
  });
}
