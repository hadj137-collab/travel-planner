/**
 * Hero Input & Taiwan Preset Chips Component
 */

export const TAIWAN_PRESETS = [
  "台北 3 天 2 夜文青美食與老街巡禮，兩人同行，預算約 9000",
  "台南 3 天 2 夜國華街小吃與老宅古蹟之旅，放鬆慢活風格",
  "花蓮宜蘭 4 天 3 夜山海景觀與夜市美食慢遊，自駕行程",
  "台中日月潭 3 天 2 夜網美打卡與湖光山色之旅，大眾運輸",
  "墾丁 3 天 2 夜水上活動與恆春古城夕陽渡假之旅"
];

export function setupHeroInput(onGenerateCallback) {
  const promptInput = document.getElementById('prompt-input');
  const generateBtn = document.getElementById('generate-btn');
  const chipsContainer = document.getElementById('preset-chips');

  // Render Preset Chips
  if (chipsContainer) {
    chipsContainer.innerHTML = `
      <span class="chip-label">💡 熱門台灣靈感：</span>
      ${TAIWAN_PRESETS.map((preset, index) => `
        <button class="chip-btn" data-preset="${preset}">
          ${preset.split('，')[0]}
        </button>
      `).join('')}
    `;

    chipsContainer.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-preset');
        promptInput.value = text;
        promptInput.focus();
      });
    });
  }

  // Bind Generate Event
  if (generateBtn && promptInput) {
    generateBtn.addEventListener('click', () => {
      const val = promptInput.value.trim();
      if (!val) {
        alert('請先輸入您的旅遊需求提示詞（例如：「台南 3 天 2 夜美食之旅」）');
        promptInput.focus();
        return;
      }
      onGenerateCallback(val);
    });
  }
}
