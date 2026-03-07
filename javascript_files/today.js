
import { today as getToday } from "./time.js";
import {userInput, inspire} from "./index.js"
import { GroupTask, Goal, Habit, dashboard, ToDo} from "./toDo.js"

export const dayState = {
  groups: [],
  date: getToday(),
  inspiration:inspire(),

  changeDate() {
    const current = getToday();

    if (current !== this.date) {
      this.date = current;
      this.reloadHabits();
      this.recordHabits();
      console.log("it is a new day!");
    } else {
      console.log("why is this day so long!");
    }

    this.inspiration;
  },

loadHabit() {

  const habitGroups = dashboard.groups.filter(g => g.type === "habits");
  if (habitGroups.length === 0) return false;

  habitGroups.forEach(group => {
    this.groups.push(group);
  });

  return true;
},

  reloadHabits() {
    this.habits.forEach(habit => {
      habit.status = false;
    });
  },

    find(name) {
    return this.groups.find(g => g.name === name);
  },


    addGoal() {
    userInput("what is the name of the goal", (name)=>{
        let smallname=name.toLowerCase();
    this.groups.push(new Goal(smallname));
    return true;
    })


  },

  listContents(target) {
    if (this.groups.length !== 0) {
        this.groups.forEach((group, i) => {
            let tr = document.createElement("tr");
            let td = document.createElement("td");

            td.textContent = group.name;
            tr.classList.add("groupTask");

            tr.appendChild(td);

            // Delay each row based on its index
            setTimeout(() => {
                target.appendChild(tr);
            }, 100 * i);
        });
    } else {
        let tr = document.createElement("tr");
        let td = document.createElement("td");

        td.textContent = "no set tasks";
        tr.classList.add("groupTask");

        tr.appendChild(td);

        setTimeout(() => {
            target.appendChild(tr);
        }, 100);
    }
},



};

export default dayState;
