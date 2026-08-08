/**
 * Google AI Studio (Gemini API) Integration Service
 * Specializing in Taiwan Local Travel Itinerary Generation
 */

export const TAIWAN_DEMO_TRIPS = {
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

export async function generateItinerary(promptText, apiKey = '') {
  if (!apiKey) {
    console.log('No API Key provided. Returning Taiwan fallback mock data.');
    await new Promise(r => setTimeout(r, 1000));
    // 提示使用者目前使用演示資料
    return {
      ...TAIWAN_DEMO_TRIPS["台北 3 天 2 夜文青美食之旅"],
      is_demo: true
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const systemPrompt = `你是一位專精於台灣國內旅遊（台北、新北、宜蘭、花蓮、台中、台南、高雄、台東、日月潭、墾丁等台灣各地）的專業旅遊規劃師。
根據使用者的提示詞需求，為使用者規劃一份**位於台灣內部地區**的詳細旅遊行程。
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
