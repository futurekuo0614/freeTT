import { translateTextToChinese } from './main.js';

export function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("❌ 此瀏覽器不支援語音辨識，請使用 Chrome");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "ja-JP";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    const transcript = last[0].transcript;
    const timestamp = new Date().toISOString().substring(11, 19);
    translateTextToChinese(transcript, timestamp);
  };

  recognition.onerror = (e) => console.error("🔴 語音辨識錯誤", e);

  recognition.start();
}
