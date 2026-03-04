import{ DayGroup, Reminder, bridge} from "./reminders.js"
import {DOMrem} from "./DOMrem.js"

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

let day = days[new Date().getDay()];
let month = months[new Date().getMonth()];
let date = new Date().getDate();
let year = new Date().getFullYear();

export function getDate() {
  return `${date}: ${month}, ${year}`;
}

export function time() {
  let hour = new Date().getHours().toString().padStart(2, '0');
  let minutes = new Date().getMinutes().toString().padStart(2, '0');
  let p = document.createElement("p");
  p.textContent = `${hour}:${minutes}`;
  return p;
}

// -------------------- NEW: HOLIDAY LOADER --------------------

let holidayData = { holidays: [] };

async function loadHolidays() {
  try {
    const response= await fetch(`../javascript_files/holidays.json?t=${Date.now()}`);/*this is the original code. okay when we are ready to ship modify this part.await fetch('../javascript_files/holidays.json'); */
    holidayData = await response.json();
  } catch (error) {
    console.error("Holiday file failed to load:", error);
  }
}

function getHoliday(month, day) {
  const key = `${month}-${day}`;
  const found = holidayData.holidays.find(h => h.date === key);
  return found ? found.holiday : null;
}

// -------------------- CALENDAR --------------------

export async function calendar() {

  // NEW: wait for holiday file before rendering
  await loadHolidays();

  const canvar = document.querySelector(".canvar");

  const oldSimple = document.querySelector(".simple");
  if (oldSimple) oldSimple.remove();

  const oldSelect = document.querySelector(".select");
  if (oldSelect) oldSelect.remove();

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const selectDiv = document.createElement("div");
  selectDiv.classList.add("select");
  canvar.appendChild(selectDiv);

  function createControl(labelArray, getValue, setValue) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("control");

    const leftBtn = document.createElement("button");
    leftBtn.textContent = "<";

    const text = document.createElement("span");
    text.textContent = labelArray ? labelArray[getValue()] : getValue();

    const rightBtn = document.createElement("button");
    rightBtn.textContent = ">";

    leftBtn.addEventListener("click", () => {
      setValue(-1);
      render();
    });

    rightBtn.addEventListener("click", () => {
      setValue(1);
      render();
    });

    wrapper.appendChild(text);
    wrapper.appendChild(leftBtn);
    wrapper.appendChild(rightBtn);

    return { wrapper, text };
  }

  const monthControl = createControl(
    months,
    () => currentMonth,
    (dir) => {
      currentMonth += dir;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
  );

  const yearControl = createControl(
    null,
    () => currentYear,
    (dir) => {
      currentYear += dir;
    }
  );

  selectDiv.appendChild(monthControl.wrapper);
  selectDiv.appendChild(yearControl.wrapper);

  const simple = document.createElement("div");
  simple.classList.add("simple");
  canvar.appendChild(simple);

  function buildCalendar(year, month) {
    let result = [];
    let week = new Array(7).fill("");

    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();

    let day = 1;

    for (let i = firstDay; i < 7 && day <= lastDate; i++) {
      week[i] = day++;
    }

    result.push(week);

    while (day <= lastDate) {
      week = new Array(7).fill("");
      for (let i = 0; i < 7 && day <= lastDate; i++) {
        week[i] = day++;
      }
      result.push(week);
    }

    return result;
  }



  function render() {
    simple.innerHTML = "";

    monthControl.text.textContent = months[currentMonth];
    yearControl.text.textContent = currentYear;

    const calendarData = buildCalendar(currentYear, currentMonth);

    let container2 = document.createElement("div");
    simple.appendChild(container2);

    const table = document.createElement("table");
    table.id = "calendar";
    container2.appendChild(table);
    table.style.marginLeft = "7vw";
    table.style.position = "fixed";
    table.style.zIndex = "50";

    const daysShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    daysShort.forEach(d => {
      const th = document.createElement("th");
      th.style.width="10vw";
      th.textContent = d;
      headerRow.appendChild(th);
    });

    const today = new Date();
    today.setHours(0,0,0,0);

    let container3 = document.createElement("div");
    container2.appendChild(container3);

    const table2 = document.createElement("table");
    container3.appendChild(table2);
    container3.classList.add("container3");

    calendarData.forEach(week => {
      const row = document.createElement("tr");
      table2.appendChild(row);

      week.forEach(day => {

        function rem(currentYear, currentMonth, day) {
          const dateString = `${currentYear}-${currentMonth}-${day}`;

          const reminderVariable = bridge.find(dateString);

          const txtRem=`${months[currentMonth]}_${day}_${currentYear}`;

          if (reminderVariable) {
            DOMrem(dateString, txtRem);
          } else {
            bridge.add(dateString);
            DOMrem(dateString, txtRem);
          }
        }

        const td = document.createElement("td");
        const container = document.createElement("div");
        container.classList.add("dateContainer");

        if (day !== "") {

          let bigTxt = document.createElement("h1");
          bigTxt.textContent = day;
          container.appendChild(bigTxt);

          const thisDate = new Date(currentYear, currentMonth, day);
          thisDate.setHours(0,0,0,0);

          if (thisDate < today) container.classList.add("past");
          else if (thisDate.getTime() === today.getTime()) container.classList.add("present");
          else container.classList.add("future");

          // NEW: holiday check
          const holidayName = getHoliday(currentMonth, day);
            const holidayDiv = document.createElement("div");
            holidayDiv.classList.add("holidayTag");

          if (holidayName) {
            const small = document.createElement("small");
            small.textContent = holidayName;
            small.style.color="black"

            holidayDiv.appendChild(small);
          }else{
                        const small = document.createElement("small");
            small.textContent = "no holiday";
            small.style.color="black"

            holidayDiv.appendChild(small);
          }

function reminderz() {
    // Make sure these are defined
    let currentDisplay = `${currentYear}-${currentMonth}-${day}`;

    let reminderz = bridge.find(currentDisplay);

    if (reminderz && reminderz.reminders && reminderz.reminders.length > 0) {
        // Take only the first 4 reminders
        reminderz.reminders.slice(0, 4).forEach(rm => {
            console.log("system.check();");

            let smalltxt = document.createElement("small");

            const fullName = rm.name;
            const maxLength = 20;
            const displayName = fullName.length > maxLength
                ? fullName.slice(0, maxLength) + "..."
                : fullName;

            smalltxt.textContent = displayName;
            smalltxt.style.color="black"
           smalltxt.style.display = "block";
smalltxt.style.width = "100%";
smalltxt.style.textAlign="right"

            // Append the element to the container
            holidayDiv.appendChild(smalltxt);
        });
    } else {
       let smalltxt = document.createElement("small");
       let displayName="no reminders"
            smalltxt.textContent = displayName;
            smalltxt.style.color="black"
           smalltxt.style.display = "block";
            smalltxt.style.width = "100%";
            smalltxt.style.textAlign="right"
              holidayDiv.appendChild(smalltxt);
    }
}

          reminderz();
            container.appendChild(holidayDiv)
        }

        td.appendChild(container);
        row.appendChild(td);

            td.addEventListener("click", () => {
      rem(currentYear, currentMonth, day);
    });
      });
    });
  }

  render();
}

export function today() {
  let date = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();

  let today = `${year}-${month}-${date}`;
  return today;
}