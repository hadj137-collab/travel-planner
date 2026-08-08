/**
 * Export Tools (.ics Calendar, Print PDF, Text Share)
 */

export function exportICS(tripData) {
  if (!tripData || !tripData.itinerary) {
    alert('無行程數據可供匯出');
    return;
  }

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
        `DESCRIPTION:${(act.description || '').replace(/\n/g, ' ')}\\n\\n地點: ${act.location || ''}\\n小貼士: ${act.tips || '無'}`,
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

export function copyTextItinerary(tripData) {
  if (!tripData) return;

  let text = `✈️ 【${tripData.trip_title}】\n📍 目的地：${tripData.destination}\n🗓️ ${tripData.total_days} 天行程\n\n`;

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
    alert('複製失敗，請手動選取文字。');
  });
}
