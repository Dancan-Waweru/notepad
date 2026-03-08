import {userInput} from "./userInput.js"
import {ritual} from "./ritual.js"



export class GroupTask {
  constructor(name) {
    this.name = name;
    this.toDos = [];
    this.progress=0;
  }

  addToDo(target) {
        userInput("what is the to do?", (name)=>{
   const clean = name.toLowerCase();
    if (this.findToDo(clean)) return false;

    this.toDos.push(new ToDo(clean));
    this.listContents(target); console.log("please respond.")
    return true;
    })


  }

listContents(target) {
    // Clear previous wrapper if it exists
    let existing = document.getElementById("tableTasks");
    if (existing) existing.remove();

    // Create wrapper div
    const tableTasks = document.createElement("div");
    tableTasks.id = "tableTasks";
    target.appendChild(tableTasks);

    // Create table
    const table = document.createElement("table");
    tableTasks.appendChild(table);

    // Create add button
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.classList.add("txtAdd");

    const self = this;
    addButton.addEventListener("click", function () {
        self.addToDo(target);
        self.updateProgress();
    });

    // Delete button
const deleteButton = document.createElement("button");
deleteButton.classList.add("txtAdd");

// Add the image
const img = document.createElement("img");
img.src = "../icons/delete.svg";
img.alt = "Delete completed";
img.style.width = "16px";
img.style.height = "16px";
deleteButton.appendChild(img);

    // Insert button above table


let progress=document.createElement("div");
progress.textContent=this.calculateProgress()+"% complete";
progress.classList.add("txtAdd");
progress.id = "progressText";



let container=document.createElement("div");
container.style.display="flex";
container.style.gap="1rem";
container.style.borderBottom="1px solid black";
container.style.borderLeft="1px solid black";
container.style.borderRadius="2px";
container.style.padding="0.3rem"
container.style.margin="0.5rem";

container.appendChild(addButton);
container.appendChild(deleteButton);
container.appendChild(progress);

tableTasks.insertBefore(container, table);

// Event listener to delete all completed todos
deleteButton.addEventListener("click", () => {
    this.clearTasks(); 
    this.updateProgress();
});



    // Populate rows
    this.toDos.forEach(todo => {
        const tr = document.createElement("tr");

        // Add class based on done state
        tr.classList.add(todo.done ? "complete" : "pending");

        // Attach the actual todo object to the row
        tr.todo = todo;

        // Name cell
        const tdName = document.createElement("td");
        const fullName = todo.name;
        const maxLength = 72;
        const displayName = fullName.length > maxLength
            ? fullName.slice(0, maxLength) + "..."
            : fullName;
        tdName.textContent = displayName;
        tdName.title = fullName;
        tdName.style.minWidth = "40vw";
        tr.appendChild(tdName);

        // Status cell
        const tdStatus = document.createElement("td");
        tdStatus.textContent = todo.done ? "complete" : "pending";
        tr.appendChild(tdStatus);

        table.appendChild(tr);
    });

    // Event listener for row clicks to toggle done
    table.addEventListener("click", (event) => {
        const clickedRow = event.target.closest("tr");
        if (!clickedRow) return;

        const todo = clickedRow.todo;

        // Toggle done
        todo.done = !todo.done;

        // Update row class
        clickedRow.classList.toggle("complete", todo.done);
        clickedRow.classList.toggle("pending", !todo.done);

        // Update status cell
        clickedRow.children[1].textContent = todo.done ? "complete" : "pending";
        this.updateProgress();
    });
}


  findToDo(name) {
    return this.toDos.find(t => t.name === name);
  }

  totalToDo() {
    return this.toDos.length;
  }

  calculateProgress() {
    const total = this.totalToDo();
    if (total === 0) return 0;

    let completed = 0;
    for (const todo of this.toDos) {
      if (todo.done) completed++;
    }

    let output=Math.floor((completed * 100) / total)
    this.progress=output;
    return output;
  }

  updateProgress() {
    const p = document.getElementById("progressText");
    if (p) {
        p.textContent = this.calculateProgress() + "% complete";
    }
}

  // contract: children MUST decide what this means
  clearTasks() {
    throw new Error("clearTasks() must be implemented by subclass");
  }
}


export class Goal extends GroupTask {
  constructor(goal, when) {
    super(goal);               // wake up the parent
    this.type = "goal";
    this.when = when;
  }

  clearTasks() {
     const toDelete = this.toDos.filter(t => t.done);
    
    toDelete.forEach(todo => {
        // Remove from array
        const index = this.toDos.indexOf(todo);
        if (index !== -1) this.toDos.splice(index, 1);

        // Remove corresponding row from the DOM
        const rows = document.querySelectorAll("#tableTasks tr");
        rows.forEach(row => {
            if (row.todo === todo) {
                row.remove();
            }
        });
    });
  }
}

export class Habit extends GroupTask {
  constructor(name) {
    super(name);               // still required
    this.type = "habit";
  }

    addHabit(name){
        const clean = name.toLowerCase();
    if (this.findToDo(clean)) return false;

    this.toDos.push(new Habit(clean));
    return true;
  }

  clearTasks() {
    for (const todo of this.toDos) {
      todo.done = false;
      console.log("test if it is working");
      this.listContents();
    }
  }
}



export class ToDo {
  constructor(name) {
    this.name = name;
    this.done = false;
  }

  markDone() {
    this.done = true;
  }

  edit(name) {
    this.name = name.toLowerCase();
  }
}

export const dashboard = {
  groups: [],

  find(name) {
    return this.groups.find(g => g.name === name);
  },

  addGoal() {
    console.log("system is responding");
    userInput("what is the name of the goal", (name)=>{
        let smallname=name.toLowerCase();
    this.groups.push(new Goal(smallname));
    ritual(this)
    return true;
    })


  },

   addHabit(name) {
   userInput("give your habit a name", (name)=>{
          if (this.find(name)) return false;
          let smallname=name.toLowerCase();
    this.groups.push(new Habit(smallname));
    ritual(this)
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
}


  }
