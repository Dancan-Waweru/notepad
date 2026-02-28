import { removeCanvar } from "./index.js";

export function canvar() {

    const canvars = document.querySelector(".canvar");
     if(canvars) canvars.remove();

    const controlPanel = document.querySelector(".controlPanel");
    if (controlPanel) controlPanel.remove();

    const inspire = document.querySelector(".inspire");
    if (inspire) inspire.remove();

    const canvar = document.createElement("div");
    canvar.classList.add("canvar");

    const main = document.getElementById("main");
    main.appendChild(canvar);

    const button = document.createElement("button");
    button.classList.add("dash")
    button.id="close"
    button.style.position="absolute"
    button.style.left="96%"
    button.style.top="2%"
    const image = document.createElement("img");
    image.src = "../icons/close.svg";

    button.appendChild(image);
    canvar.appendChild(button);

    button.addEventListener("click", () => {
        removeCanvar();
    });


}
