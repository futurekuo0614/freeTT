import { addSubtitleLine, resetSubtitles } from './subtitle_ui.js';

let subtitleIndex = 1;
let subtitleLog = [];

export async function translateTextToChinese(text, timestamp) {
  const OPENAI_API_KEY = window.OPENAI_API_KEY;

  if (!OPENAI_API_KEY || OPENAI_API_KEY.includes("%")) {
    console.error("❌ 未正確設定 OPENAI_API_KEY");
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "你是一位專業日文翻譯員，請將日文翻成中文。" },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content ?? "[翻譯失敗]";
    addSubtitleLine(timestamp, result);
    subtitleLog.push({ index: subtitleIndex++, time: timestamp, text: result });
  } catch (err) {
    console.error("🔴 翻譯請求錯誤", err);
  }
}

export function getSubtitleLog() {
  return subtitleLog;
}

export function clearSubtitleLog() {
  subtitleLog = [];
  subtitleIndex = 1;
  resetSubtitles();
}
