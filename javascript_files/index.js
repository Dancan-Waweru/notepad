import { getDate, time, calendar } from "./time.js";
import{ DayGroup, Reminder, bridge} from "./reminders.js"
import {GroupTask, Goal, Habit, dashboard, ToDo} from "./toDo.js"
import {canvar} from "./canvas.js"
import {ritual} from "./ritual.js"
import {typeWriter} from "./typeWriter.js"
import {CTA, text, button, showPopup} from "./CTA.js"
import {DOMrem} from "./DOMrem.js";


bridge.add("2026-1-28");
let today=bridge.find("2026-1-28");
let reminder1=today.addReminder("wash the dishes");
let reminder2=today.addReminder("clean the house");
let reminder3=today.addReminder("Inter-University CTF challenges");
let reminder4=today.addReminder("tenis at 5");




let target=document.getElementById('main');

function controlPanel(){

	let controlPanel=document.createElement('div');
	controlPanel.classList.add("controlPanel");
	target.appendChild(controlPanel);

	function feature(name, title, paragraph, small){
		let div=document.createElement('div');
		div.id=name;
		div.classList.add("features");

		let h2=document.createElement("h2");
		h2.classList.add("odd");//you can use bHive
		h2.textContent=title;

		let adiva=document.createElement('div');
		adiva.appendChild(paragraph());
		adiva.classList.add("controlP");


		let smallText=document.createElement('small');
		smallText.textContent=small;

		controlPanel.appendChild(div);
		div.appendChild(h2);
		div.appendChild(adiva);
		div.appendChild(smallText);
	}

	function para() {
    let p=document.createElement("p");
    p.textContent = `${today.reminders[0].name}`;
    return p;  
}


	feature("reminders", "reminders", para, `${today.reminders.length-1} more reminders`);


	feature("time", getDate(), time, "nothing special today");

if (document.querySelector("#time p")) {
	setInterval(() => {
    let newTime = time(); // new element
    let old = document.querySelector("#time p");

    try{
    	    old.replaceWith(newTime);
    }
    catch(error){
    	console.log("it seems theres a small problem here read this: ", error.message)
    }

}, 1000);  
}
	


	feature("progress", "70% complete", progressAnime, "15 incomplete tasks")

	function progressAnime(){
	let a = document.createElement("span");
a.textContent = "●";                    
a.style.color="grey";
a.style.fontSize="2rem"

let b= document.createElement("span"); 
b.textContent = "●";                    
b.style.color="black";
b.style.fontSize="2rem"

let c=document.createElement("p");
c.appendChild(a);
c.appendChild(b);
return (c);
	}

}

controlPanel();

function article(){
	let div = document.createElement("div");
	div.classList.add("inspire");



	fetch('../javascript_files/index.json')
  .then(res => res.json())
  .then(data => {
    const articleElement = random(data); // pass data into random
    div.appendChild(articleElement); // example: add it to page
  })
  .catch(err => console.error(err));

function random(data){
  let article = document.createElement('article');
  article.textContent = `"`+data[Math.floor(Math.random() * data.length)];
  article.style.fontSize="2rem";
  article.style.textAlign="center"
  return article;
}

	target.appendChild(div);
}

article();

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
      ritual();
      showPopup("saved !")
    }
  });


}


userInput("hello there, my name is ..., my parent, is still figuring out my name :) ", 50, "placeholder");

export function removeCanvar() {
    const canvar = document.querySelector(".canvar");
    if (canvar) canvar.remove();

  controlPanel();
  article();
}


document.getElementById("calendar").addEventListener("click", () => {
	canvar();
	calendar();
});

document.getElementById("tasks").addEventListener("click", () => {

	canvar();
	ritual();
});

document.getElementById("reminders").addEventListener("click", () => {
	canvar();
	DOMrem();
});

document.getElementById("notes").addEventListener("click", () => {
	canvar();
});

