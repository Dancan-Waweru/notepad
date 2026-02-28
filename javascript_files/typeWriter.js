import {userInput} from "./index.js"

export function typeWriter(element, text, speed = 50, mode = "placeholder") {
  let index = 0;
  let buffer = "";

  const runsequence = setInterval(() => {
    if (index >= text.length) {
      clearInterval(runsequence);
      element[mode] = buffer;
      return;
    }

    buffer += text[index];
    element[mode] = buffer + "●";
    index++;
  }, speed);
}

