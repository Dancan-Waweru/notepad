import { getDate, time, calendar } from "./time.js";
import{ DayGroup, Reminder, bridge} from "./reminders.js"
import {GroupTask, Goal, Habit, dashboard, ToDo} from "./toDo.js"
import {canvar} from "./canvas.js"
import {ritual} from "./ritual.js"
import {typeWriter} from "./typeWriter.js"
import {CTA, text, button, showPopup} from "./CTA.js"
import {DOMrem} from "./DOMrem.js";
import { today as getToday } from "./time.js";
import daystate from "./today.js";
import {inspire} from "./inspiration.js"
import {userInput} from "./userInput.js"
import {changeWallArt, wallpaper} from "./wallpaper.js"

daystate.init()

wallpaper();


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


	let todaysRem = bridge.find(getToday());

	function para() {
	  let p = document.createElement("p");

	  if (todaysRem && todaysRem.reminders.length > 0) {
	    p.textContent = todaysRem.reminders[0].name;
	  } else {
	    p.textContent = "no set reminders :(";
	  }

	  return p;
	}

	feature(
	  "reminders",
	  "reminders",
	  para,
	  `${todaysRem && todaysRem.reminders.length > 0 
	      ? todaysRem.reminders.length 
	      : "no"} more reminders`
		);

let holidayData;

async function loadHolidays() {
  try {
    const response = await fetch(`../javascript_files/holidays.json?t=${Date.now()}`);
    holidayData = await response.json();

    startApp(); // run the rest only after data loads
  } catch (error) {
    console.error("Holiday file failed to load:", error);
  }
}

loadHolidays();

function getHoliday(damonth) {
  const found = holidayData.holidays.find(h => h.date === damonth);

  if (found) {
    return found.holiday;
  } else {
    return "nothing special today :)";
  }
}

function startApp() {
  let daMonth = `${new Date().getMonth()}-${new Date().getDate()}`;
  feature("time", getDate(), time, getHoliday(daMonth));
}


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
	


	feature("progress", `Objectives: ${daystate.calculateProgress()}% complete`, progressAnime, `${daystate.groups.length} incomplete tasks`)

	function progressAnime(){
	let a = document.createElement("span");
a.textContent = "●";                    
a.style.color="#C3C3C3";
a.style.fontSize="2rem"

let b= document.createElement("span"); 
b.textContent = "●";                    
b.style.color="#202022";
b.style.fontSize="2rem"

let d= document.createElement("span"); 
d.textContent = "●";                    
d.style.color="#878787";
d.style.fontSize="2rem"

let c=document.createElement("p");
c.appendChild(b);
c.appendChild(d);
c.appendChild(a);
return (c);
	}

}

controlPanel();

daystate.changeDate();

function article(){
	let div = document.createElement("div");
	div.classList.add("inspire");

  let article = document.createElement('article');
  article.textContent = daystate.inspiration;
  article.style.fontSize="2rem";
  article.style.textAlign="center";
  article.id="inspiration";

div.appendChild(article)
	target.appendChild(div);
}

article();




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
	ritual(daystate);
});

document.getElementById("reminders").addEventListener("click", () => {
	canvar();
	DOMrem();
});

document.getElementById("notes").addEventListener("click", () => {
	canvar();
});


document.getElementById("wallpaper").addEventListener("click", () => {
	canvar();
	changeWallArt();
});