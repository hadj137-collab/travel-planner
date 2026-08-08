/**
 * RoamAI Travel Planner - Main Application Controller
 */

import { generateItinerary, TAIWAN_DEMO_TRIPS } from './api.js';
import { setupHeroInput } from './components/heroInput.js';
import { renderTimeline } from './components/timeline.js';
import { initMap, updateMapMarkers } from './components/map.js';
import { renderBudget } from './components/budget.js';
import { renderChecklist } from './components/checklist.js';
import { exportICS, copyTextItinerary } from './export.js';

class App {
  constructor() {
    this.apiKey = localStorage.getItem('roamai_gemini_key') || '';
    this.currentTrip = null;
    this.activeTab = 'timeline';
    this.isDark = true;

    this.initElements();
    this.bindEvents();
    this.initMapReady = false;
  }

  initElements() {
    this.loadingOverlay = document.getElementById('loading-overlay');
    this.dashboard = document.getElementById('dashboard');
    this.tripTitleEl = document.getElementById('trip-title');
    this.tripMetaEl = document.getElementById('trip-meta');
    
    this.tabTimeline = document.getElementById('tab-timeline');
    this.tabMap = document.getElementById('tab-map');
    this.tabBudget = document.getElementById('tab-budget');
    this.tabChecklist = document.getElementById('tab-checklist');

    this.panelTimeline = document.getElementById('panel-timeline');
    this.panelMap = document.getElementById('panel-map');
    this.panelBudget = document.getElementById('panel-budget');
    this.panelChecklist = document.getElementById('panel-checklist');

    this.apiKeyModal = document.getElementById('api-key-modal');
    this.apiKeyInput = document.getElementById('api-key-input');
  }

  bindEvents() {
    // Single Prompt Setup
    setupHeroInput((promptText) => this.handleGenerate(promptText));

    // Theme Toggle
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        this.isDark = !this.isDark;
        document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
        themeBtn.textContent = this.isDark ? '🌙' : '☀️';
      });
    }

    // API Key Modal Trigger & Save
    const apiKeyBtn = document.getElementById('api-key-btn');
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    const closeApiKeyBtn = document.getElementById('close-api-key-btn');

    if (apiKeyBtn) {
      apiKeyBtn.addEventListener('click', () => {
        if (this.apiKeyInput) this.apiKeyInput.value = this.apiKey;
        this.apiKeyModal.classList.add('active');
      });
    }

    if (closeApiKeyBtn) {
      closeApiKeyBtn.addEventListener('click', () => {
        this.apiKeyModal.classList.remove('active');
      });
    }

    if (saveApiKeyBtn) {
      saveApiKeyBtn.addEventListener('click', () => {
        this.apiKey = this.apiKeyInput.value.trim();
        localStorage.setItem('roamai_gemini_key', this.apiKey);
        this.apiKeyModal.classList.remove('active');
        alert(this.apiKey ? 'API 金鑰已儲存！' : '已清除 API 金鑰（將使用預設台灣演示模式）');
      });
    }

    // View Switcher Tabs
    const tabs = [
      { btn: this.tabTimeline, panel: this.panelTimeline, name: 'timeline' },
      { btn: this.tabMap, panel: this.panelMap, name: 'map' },
      { btn: this.tabBudget, panel: this.panelBudget, name: 'budget' },
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
          t.panel.classList.add('active');
          this.activeTab = t.name;

          if (t.name === 'map') {
            setTimeout(() => {
              if (!this.initMapReady) {
                initMap('map');
                this.initMapReady = true;
              }
              if (this.currentTrip && this.currentTrip.itinerary) {
                updateMapMarkers(this.currentTrip.itinerary[0]?.activities || []);
              }
            }, 100);
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
    this.loadingOverlay.classList.add('active');

    try {
      const tripData = await generateItinerary(promptText, this.apiKey);
      this.currentTrip = tripData;
      this.renderDashboard();
    } catch (err) {
      alert(`生成失敗: ${err.message}`);
    } finally {
      this.loadingOverlay.classList.remove('active');
    }
  }

  renderDashboard() {
    if (!this.currentTrip) return;

    this.dashboard.classList.remove('dashboard-hidden');
    this.dashboard.scrollIntoView({ behavior: 'smooth' });

    // Summary Card Header
    if (this.tripTitleEl) this.tripTitleEl.textContent = this.currentTrip.trip_title;
    if (this.tripMetaEl) {
      this.tripMetaEl.innerHTML = `
        <span class="trip-meta-item">📍 ${this.currentTrip.destination}</span>
        <span class="trip-meta-item">🗓️ ${this.currentTrip.total_days} 天行程</span>
        <span class="trip-meta-item">💰 每人預估：NT$ ${this.currentTrip.estimated_total_cost_per_person?.toLocaleString()}</span>
        ${this.currentTrip.is_demo ? '<span style="color: var(--accent-amber); font-weight: 600; padding: 2px 8px; background: rgba(245, 158, 11, 0.15); border-radius: var(--radius-sm); margin-left: 8px;">💡 示範模式（點右上角🔑設定 Key 解鎖自由生成）</span>' : ''}
      `;
    }

    // Render Timeline View
    renderTimeline(this.currentTrip, this.panelTimeline, (dayData) => {
      if (this.initMapReady) {
        updateMapMarkers(dayData.activities || []);
      }
    });

    // Render Map View
    if (!this.initMapReady) {
      initMap('map');
      this.initMapReady = true;
    }
    if (this.currentTrip.itinerary && this.currentTrip.itinerary[0]) {
      updateMapMarkers(this.currentTrip.itinerary[0].activities || []);
    }

    // Render Budget & Checklist
    renderBudget(this.currentTrip, this.panelBudget);
    renderChecklist(this.currentTrip, this.panelChecklist);
  }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.roamApp = new App();
});
