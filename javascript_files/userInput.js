import {typeWriter} from "./typeWriter.js"
export function userInput(prompt, callback = () => {}) {

	    const initial = document.querySelector(".textarea");
     if(initial) initial.remove();


  const box = document.createElement("textarea");
  box.classList.add("textarea");
    document.body.appendChild(box);
    typeWriter(box, prompt)

  box.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      callback(box.value);
      userInput("waiting");
    }
  });


}