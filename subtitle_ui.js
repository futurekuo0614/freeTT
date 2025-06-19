export function addSubtitleLine(time, text) {
  const display = document.getElementById("subtitleDisplay");
  const line = document.createElement("div");
  line.textContent = `[${time}] ${text}`;
  display.appendChild(line);
  display.scrollTop = display.scrollHeight;
}

export function resetSubtitles() {
  document.getElementById("subtitleDisplay").innerHTML = "";
}
