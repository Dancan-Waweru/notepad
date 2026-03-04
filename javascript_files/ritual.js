import { GroupTask, Goal, Habit, dashboard, ToDo} from "./toDo.js"
import {CTA, text, button, showPopup} from "./CTA.js"
import {typeWriter} from "./typeWriter.js"
import daystate from "./today.js";

let spreadsheet=daystate;

export function ritual(){
	// create container
        let test = document.querySelector(".simple");
     if(test) test.remove();


const simple = document.createElement("div");
simple.classList.add("simple");

let acontainer=document.createElement("div");
acontainer.style.display="flex";
acontainer.style.justifyContent="left";
acontainer.style.width="100%"

// create buttons
const buttonOne = document.createElement("button");
const buttonTwo = document.createElement("button");

buttonOne.textContent = "ritual";
buttonTwo.textContent = "to do's";

// initial classes
buttonOne.classList.add("ritual");   // always has ritual
buttonTwo.classList.add("active");   // first active on load



// toggle logic: exchange classes
  function activateButton(activeBtn, inactiveBtn) {
    activeBtn.classList.add("active");
    activeBtn.classList.remove("ritual");

    inactiveBtn.classList.remove("active");
    inactiveBtn.classList.add("ritual");
    console.log("something is messing with my head.")
  }

  // Function that only updates table content
  function renderTable() {
    const table = document.getElementById("list");

    // Remove old rows except header
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    // Populate table with current spreadsheet data
    spreadsheet.listContents(table);
  }

// events
buttonOne.addEventListener("click", () => {
    activateButton(buttonOne, buttonTwo);
    spreadsheet=dashboard;
    renderTable();
});

buttonTwo.addEventListener("click", () => {
    activateButton(buttonTwo, buttonOne);
    spreadsheet=daystate;
    renderTable();
});

// append buttons to container
acontainer.appendChild(buttonOne);
acontainer.appendChild(buttonTwo);

simple.appendChild(acontainer)

// append container to .canvar
const canvar = document.querySelector(".canvar");
canvar.appendChild(simple);

    const test5 = document.getElementsByTagName("hr")[0];
     if(test5) test5.remove();

    const hr=document.createElement("hr");
    canvar.appendChild(hr);
    hr.style.marginTop="8vh";

    const test2 = document.getElementById("list");
     if(test2) test2.remove();


const table = document.createElement("table");
const tr = document.createElement("tr");
const th = document.createElement("th");
th.textContent = "tasks";
tr.appendChild(th);
table.appendChild(tr);
canvar.appendChild(table);
table.id = "list";

spreadsheet.listContents(table);

// Add event listener for row clicks
table.addEventListener("click", function(event) {
    // Find the closest <tr> that was clicked
    const clickedRow = event.target.closest("tr");
    if (!clickedRow) return;

    // Get the text content of the clicked row
    const rowText = clickedRow.textContent.trim();

    // Find the corresponding task object
    const task = spreadsheet.find(rowText);

    // If task exists, call its listContents method with the clicked row as target
    if (task) {
        task.listContents(clickedRow);
    }
});



const test3 = document.querySelector(".txtAdd");
if (test3) test3.remove();


    const add = document.createElement("button");
add.textContent = "add + ";
add.classList.add("txtAdd");

add.addEventListener("click", () => {
  let dialog = CTA();
  let title = text("add a goal or a habit");

  let todo = button("goal");
  todo.title = "add goal";
  todo.addEventListener("click", ()=>{dialog.close();
    spreadsheet.addGoal(); dialog.remove(); ritual();
})

  let goal = button("habit");
  goal.title = "add a habit";
  goal.addEventListener("click", ()=>{dialog.close(); spreadsheet.addHabit(); dialog.remove(); ritual();})

  let smll=document.createElement("small");
  smll.textContent="press esc to remove"

  document.body.appendChild(dialog);
  dialog.appendChild(title);
  dialog.appendChild(todo);
  dialog.appendChild(goal);
  dialog.appendChild(smll);
  dialog.showModal();
});

canvar.appendChild(add);


}





