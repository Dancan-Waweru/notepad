export function CTA(){
	let dialog=document.createElement("dialog");
	dialog.classList.add("CTA");
	return dialog;

}

export function text(text){
	let p=document.createElement("p");
	p.textContent=text;
	p.classList.add("CTA");
	return p;
}

export function button(text) {
	let button=document.createElement("button");
	button.classList.add("CTA");
	button.textContent=text;
	return button;
}

export function showPopup(text) {
    const div = document.createElement("div");

    // Set the text
    div.textContent = text;

    // Style the div
    Object.assign(div.style, {
        position: "fixed",       // Stay in place even when scrolling
        top: "10%",
        left: "90%",
        backgroundColor: "#00BBC9",
        color: "white",
        padding: "8px 12px",
        minWidth: "100px",
        minHeight: "40px",
        borderRadius: "2px",
        zIndex: "9999",         // Ensure it appears over everything
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontSize: "14px",
        boxSizing: "border-box",
    });

    div.className = "float-up";

    // Add to body
    document.body.appendChild(div);

    // Remove after 1.5 seconds
    setTimeout(() => {
        div.remove();
    }, 3000);

    console.log("updated content");
}


