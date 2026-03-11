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
  // load saved date if it exists
  const savedDate = localStorage.getItem("date");
  console.log(savedDate);
  this.date = savedDate ? JSON.parse(savedDate) : this.changeDate();
  

  // load inspiration from memory if it exists
  const savedInspiration = localStorage.getItem("inspiration");
  this.inspiration = savedInspiration ? JSON.parse(savedInspiration) : await inspire();

  // load groups
  this.loadMemory();

  // update DOM
  const el = document.getElementById("inspiration");
  if (el) el.textContent = this.inspiration;
},


async changeDate() {
  const current = getToday();

  if (current !== this.date) {
    // new day detected
    this.date = current;
    this.reloadHabits();
    this.recordHabits?.();
    console.log("it is a new day!");

    this.inspiration = await inspire();

    // save both date and inspiration
    localStorage.setItem("inspiration", JSON.stringify(this.inspiration));
    localStorage.setItem("date", JSON.stringify(this.date));
    console.log(this.date);
    console.log(this.inspiration);

  } else {
    console.log("why is this day so long!");
    // no need to fetch inspiration, it is already loaded from memory
  }

  // always update DOM
  const el = document.getElementById("inspiration");
  if (el) el.textContent = this.inspiration;
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

  // total will store the sum of progress from all groups
  let total = 0;

  // final percentage that will be returned
  let output = 0;

  // if there are no groups there is no progress
  if (this.groups.length <= 0) {
    return 0;
  }

  // we store finished groups here first
  // we DO NOT delete while looping through groups
  // because modifying an array while iterating can break the loop
  const finished = [];

  // loop through every group
  this.groups.forEach(group => {

    // add this group's progress to the total
    total += group.progress;

    // if a group is complete mark it for removal
    if (group.progress >= 100) {
      finished.push(group.name);
    }

  });

  // maximum possible progress
  // example: 3 groups → 300 total possible progress
  let size = (this.groups.length) * 100;

  // calculate percentage of total progress
  output = Math.floor((total * 100) / size);

  // now remove groups that reached 100%
  // we do this AFTER the loop to avoid array mutation issues
  finished.forEach(name => {
    this.deleteGroup(name);
  });

  // return the overall progress
  return output;

},

  deleteGroup(name){
  const index = this.groups.findIndex(g => g.name === name);

  if(index === -1){
    console.log("group not found");
    return;
  }

  this.groups.splice(index,1);

  console.log("group removed:", name);
},

saveMemory(){

  // convert groups into a simple object structure
  const data = this.groups.map(group => ({
    name: group.name,
    type: group.type
  }));

  // store it as a string
  localStorage.setItem("dayStateGroups", JSON.stringify(data));

  console.log("saved");

}, 

loadMemory(){

  const raw = localStorage.getItem("dayStateGroups");

  // nothing saved yet
  if(!raw){
    console.log("nothing saved yet");
    return;
  }

  console.log("I found data, proceeding with extraction");

  const data = JSON.parse(raw);

  data.forEach(item => {

    if(item.type === "goal"){
      this.groups.push(new Goal(item.name));
    }

    if(item.type === "habit"){
      this.groups.push(new Habit(item.name));
    }

    if(item.type === "todo"){
      this.groups.push(new ToDo(item.name));
    }

  });

}

};

export default dayState;