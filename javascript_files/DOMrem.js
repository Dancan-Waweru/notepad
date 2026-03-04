import{ DayGroup, Reminder, bridge} from "./reminders.js"
import daystate from "./today.js";
import { today as getToday } from "./time.js";

export function DOMrem(date=getToday(), txtRem="today") {


	 let test = document.querySelector(".simple");
     if(test) test.remove();

             let test5 = document.querySelector(".select");
     if(test5) test5.remove();
 


	let reminderCard=document.createElement("div");
	reminderCard.classList.add("simple");

	const canvar = document.querySelector(".canvar");
	canvar.appendChild(reminderCard);

	let container4=document.createElement("div");
	reminderCard.appendChild(container4);

	container4.style.width="100%";
	container4.style.color="black"

	let h2=document.createElement("h2");
	h2.textContent="Reminders. Date:_"+txtRem;
	h2.style.backgroundColor="#00BBC9"
	h2.style.fontWeight="100"
	h2.style.fontFamily="Nunito";

	container4.appendChild(h2);

	let table=document.createElement("table")
	table.id="list";
	table.style.marginLeft="-1 rem";

let reminderz = bridge.find(date);

console.log(reminderz);console.log("check here");

if (!reminderz) {
    bridge.add(date);
    reminderz = bridge.find(date);
}



	if(reminderz && reminderz.reminders.length>0){

	reminderz.reminders.forEach((rem, i) => {
		let tr=document.createElement("tr");
		let td=document.createElement("td");
		td.style.fontSize="1.3rem"

		td.textContent=rem.name;
		tr.appendChild(td);

        setTimeout(() => {
		table.appendChild(tr)
        }, 100 * i);
	})}
	else{
		let tr=document.createElement("tr");
		let td=document.createElement("td");
		td.style.fontSize="1.3rem"

		td.textContent="click add to add a reminder :) "
		tr.appendChild(td);
		table.appendChild(tr)
	}

	container4.appendChild(table);

	const add = document.createElement("button");
add.textContent = "add + ";
add.classList.add("txtAdd");

add.addEventListener("click", () => {
	reminderz.addReminder(date); 
})

  container4.appendChild(add)

}