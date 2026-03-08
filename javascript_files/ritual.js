// ritual.js
import { dashboard } from "./toDo.js";
import { CTA, text, button } from "./CTA.js";
import { typeWriter } from "./typeWriter.js";

export function ritual(dayState) {

  let spreadsheet = dayState; // start by viewing dayState

  const test = document.querySelector(".simple");
  if (test) test.remove();

  const testhr = document.getElementById("hr");
  if (testhr) testhr.remove();

  const simple = document.createElement("div");
  simple.classList.add("simple");

  const acontainer = document.createElement("div");
  acontainer.style.display = "flex";
  acontainer.style.justifyContent = "left";
  acontainer.style.width = "100%";

  const buttonOne = document.createElement("button");
  const buttonTwo = document.createElement("button");

  buttonOne.textContent = "ritual";
  buttonTwo.textContent = "to do's";

  buttonOne.classList.add("ritual");
  buttonTwo.classList.add("active");

  function activateButton(activeBtn, inactiveBtn) {
    activeBtn.classList.add("active");
    activeBtn.classList.remove("ritual");

    inactiveBtn.classList.remove("active");
    inactiveBtn.classList.add("ritual");
  }

  function renderTable() {
    const table = document.getElementById("list");

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    spreadsheet.listContents(table);
  }

  // SWITCH VIEW
  buttonOne.addEventListener("click", () => {
    activateButton(buttonOne, buttonTwo);
    spreadsheet = dashboard;   // switch to dashboard
    renderTable();
  });

  buttonTwo.addEventListener("click", () => {
    activateButton(buttonTwo, buttonOne);
    spreadsheet = dayState;    // switch back to dayState
    renderTable();
  });

  acontainer.appendChild(buttonOne);
  acontainer.appendChild(buttonTwo);
  simple.appendChild(acontainer);

  const canvar = document.querySelector(".canvar");
  canvar.appendChild(simple);

  const hr = document.createElement("hr");
  hr.style.marginTop = "8vh";
  hr.id="hr";
  canvar.appendChild(hr);

  const oldTable = document.getElementById("list");
  if (oldTable) oldTable.remove();

  const table = document.createElement("table");
  table.id = "list";

  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = "tasks";

  tr.appendChild(th);
  table.appendChild(tr);

  canvar.appendChild(table);

  renderTable();

  table.addEventListener("click", (event) => {

    const clickedRow = event.target.closest("tr");
    if (!clickedRow) return;

    const rowText = clickedRow.textContent.trim();

    const task = spreadsheet.find(rowText);

    if (task) {
      task.listContents(clickedRow);
    }

  });

  const oldAdd = document.querySelector(".txtAdd");
  if (oldAdd) oldAdd.remove();

  const add = document.createElement("button");
  add.textContent = "add + ";
  add.classList.add("txtAdd");

  add.addEventListener("click", () => {

    const dialog = CTA();
    const title = text("add a goal or a habit");

    const goalBtn = button("goal");
    goalBtn.addEventListener("click", () => {
      dialog.close();
      spreadsheet.addGoal();
      dialog.remove();
      renderTable();
    });

    const habitBtn = button("habit");
    habitBtn.addEventListener("click", () => {
      dialog.close();
      spreadsheet.addHabit?.();
      dialog.remove();
      renderTable();
    });

    const smll = document.createElement("small");
    smll.textContent = "press esc to remove";

    dialog.appendChild(title);
    dialog.appendChild(goalBtn);
    dialog.appendChild(habitBtn);
    dialog.appendChild(smll);

    document.body.appendChild(dialog);
    dialog.showModal();

  });

  canvar.appendChild(add);
}