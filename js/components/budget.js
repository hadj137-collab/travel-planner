/**
 * Budget Breakdown & Expense Stats Component
 */

export function renderBudget(tripData, containerEl) {
  if (!tripData) return;

  const budget = tripData.budget_breakdown || {
    transportation: 1500,
    accommodation: 4500,
    food: 2500,
    tickets_and_shopping": 1500
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
    <!-- Top Summary Card -->
    <div class="glass-panel" style="padding: 2rem; margin-bottom: 1.5rem; text-align: center; background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15)); border: 1px solid var(--accent-cyan);">
      <h3 style="font-size: 1rem; color: var(--text-muted); margin-bottom: 0.5rem;">全行程每人預估花費</h3>
      <div style="font-size: 3rem; font-weight: 800; color: var(--text-main); font-family: 'Outfit', sans-serif;">
        NT$ ${totalCost.toLocaleString()}
      </div>
      <p style="font-size: 0.875rem; color: var(--accent-cyan); margin-top: 0.25rem;">
        以 ${tripData.total_days || 3} 天行程估算 (單位：新台幣 TWD)
      </p>
    </div>

    <!-- Category Breakdown Grid -->
    <div class="budget-grid">
      ${categories.map(cat => {
        const percent = totalCost > 0 ? Math.round((cat.value / totalCost) * 100) : 0;
        return `
          <div class="budget-card glass-panel animate-fade-in">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${cat.icon}</div>
            <h4 style="font-size: 1rem; color: var(--text-muted);">${cat.label}</h4>
            <div class="budget-amount">NT$ ${cat.value.toLocaleString()}</div>
            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">佔比 ${percent}%</div>
            
            <!-- Progress Bar -->
            <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;">
              <div style="width: ${percent}%; height: 100%; background: ${cat.color}; border-radius: 999px;"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="glass-panel" style="padding: 1.25rem; font-size: 0.875rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
      <span>ℹ️</span>
      <span>溫馨提醒：以上費用為 AI 根據台灣國內市場行情所做之預估，實際花費因季節、淡旺季及個人消費習慣而異。</span>
    </div>
  `;
}
