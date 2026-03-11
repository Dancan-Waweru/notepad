

export function wallpaper(wallpaper="../wallpapers/hubert-buratynski-V30noriNZxI-unsplash.jpg"){
	document.body.style.backgroundImage=`url(${wallpaper})`;
    localStorage.setItem("wall", JSON.stringify(wallpaper));
}

export function changeWallArt() {

    let options = [
        "../wallpapers/hubert-buratynski-V30noriNZxI-unsplash.jpg",
        "../wallpapers/atul-pandey-plLJdnoVWbM-unsplash.jpg",
        "../wallpapers/avin-cp-zYA-kwUxNqM-unsplash.jpg",
        "../wallpapers/dave-hoefler-GQychZgUqgA-unsplash.jpg",
        "../wallpapers/andrew-s-s-05NO4Xw6Y-unsplash.jpg"
    ];

    let h2 = document.createElement("h2");
    h2.textContent = "Choose wallpaper";

    let choices = document.createElement("div");
    choices.style.display = "flex";
    choices.style.gap = "1rem";
    choices.style.flexWrap = "wrap";

    const canvar = document.querySelector(".canvar");
    canvar.appendChild(h2);
    canvar.appendChild(choices);

    options.forEach(name => {

        // container for each image
        let container = document.createElement("div");
        container.style.height = "30vh";
        container.style.flex = "1";       // flexible width
        container.style.cursor = "pointer";
        container.style.overflow = "hidden";
        container.style.borderRadius = "4px";
        container.classList.add("wall-option")


        // image
        let img = document.createElement("img");
        img.src = "../wallpapers/" + name;
        img.style.height = "100%";
        img.style.width = "100%";
        img.style.objectFit = "cover";

        container.appendChild(img);
        choices.appendChild(container);

        // click listener
        container.addEventListener("click", () => {
            wallpaper(name);
        });

    });

}