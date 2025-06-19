import { getSubtitleLog } from './main.js';

export function saveSRT() {
  const lines = getSubtitleLog().map((entry, idx) => {
    const startTime = entry.time + ",000";
    const endTime = entry.time + ",999";
    return `${idx + 1}\n${startTime} --> ${endTime}\n${entry.text}\n`;
  }).join("\n");

  const blob = new Blob([lines], { type: "text/plain" });
  triggerDownload(blob, "subtitles.srt");
}

export function saveSRTasTXT() {
  const lines = getSubtitleLog().map((entry) => `[${entry.time}] ${entry.text}`).join("\n");
  const blob = new Blob([lines], { type: "text/plain" });
  triggerDownload(blob, "subtitles.txt");
}

function triggerDownload(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
