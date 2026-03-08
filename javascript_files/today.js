// today.js
import { today as getToday } from "./time.js";
import { inspire } from "./inspiration.js";
import { userInput } from "./userInput.js";
import { GroupTask, Goal, Habit, dashboard, ToDo } from "./toDo.js";
import { ritual } from "./ritual.js";
import {CTA, text, button, showPopup} from "./CTA.js"

export const dayState = {
  groups: [],
  date: null,
  inspiration: null,

  async init() {
    this.date = getToday();
    this.inspiration = await inspire();
  },

  async changeDate() {
    const current = getToday();

    if (current !== this.date) {
      this.date = current;
      this.reloadHabits();
      this.recordHabits?.(); // optional, if you have recordHabits
      console.log("it is a new day!");

      this.inspiration = await inspire();

      const el = document.getElementById("inspiration");
      if (el) el.textContent = this.inspiration;

      this.reloadHabits();
    } else {
      console.log("why is this day so long!");
    }
  },

  addHabit(){
    showPopup("sorry we can't do that here, proceed to milestones and add a habit there");
    userInput("sorry we can't do that here, proceed to milestones and add a habit there", (name)=>{
      showPopup("sorry can't do that here.");
    })
  },

  loadHabits() {
    const habitGroups = dashboard.groups.filter(g => g.type === "habits");
    if (habitGroups.length === 0) return false;

    habitGroups.forEach(group => this.groups.push(group));
    return true;
  },

  reloadHabits() {
    const habits = this.groups.filter(g => g.type === "habits");
    habits.forEach(habit => habit.clearTasks());
  },

  find(name) {
    return this.groups.find(g => g.name === name);
  },

  addGoal() {
    userInput("What is the name of the goal?", (name) => {
      const smallname = name.toLowerCase();
      this.groups.push(new Goal(smallname));
      ritual(this); // pass dayState explicitly
      return true;
    });
  },

  listContents(target) {
    this.loadHabits();

    if (this.groups.length !== 0) {
      this.groups.forEach((group, i) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.textContent = group.name;
        tr.classList.add("groupTask");
        tr.appendChild(td);

        setTimeout(() => target.appendChild(tr), 100 * i);
      });
    } else {
      const tr = document.createElement("tr");
      const td = document.createElement("td");

      td.textContent = "no set tasks";
      tr.classList.add("groupTask");
      tr.appendChild(td);

      setTimeout(() => target.appendChild(tr), 100);
    }
  },

  calculateProgress(){
    let total=0;
    let output=0;

    if (this.groups.length<=0) {
      return 0;
    }

    this.groups.forEach(group=>{
      total+=group.progress
    });

    let size=(this.groups.length)*100;

    output=Math.floor((total*100)/size)

    return output;

  }
};

export default dayState;