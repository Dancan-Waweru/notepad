import {userInput} from "./userInput.js"
import {DOMrem} from "./DOMrem.js";
import {CTA, text, button, showPopup} from "./CTA.js"


export class DayGroup {
    constructor(date) {
        this.date = date;
        this.reminders = [];
    }

    addReminder(date) {
        userInput("what would you like me to remind you?", (name)=>{
        const clean = name.toLowerCase();
	    if (this.findReminder(clean)) return false;
	    this.reminders.push(new Reminder(clean));
        DOMrem(date); 
        showPopup("added a reminder")
	    return true;});
    }

    removeReminder(name) {
    	const clean = name.toLowerCase();
        const i = this.reminders.findIndex(r => r.name ===clean);
        if (i !== -1) this.reminders.splice(i, 1);
        return true;
    }


    findReminder(name) {
        return this.reminders.find(r => r.name === name);
    }


    totalReminders() {
        return this.reminders.length;
    }
}

export class Reminder {
    constructor(name) {
        this.name = name;
        this.seen = false;
    }

    markRead() {
        this.seen = true;
    }
}

export const bridge = {
    groups: [],

    find(date) {
        return this.groups.find(g => g.date === date);
    },

    add(date) {
        if (this.find(date)) return false;
        this.groups.push(new DayGroup(date));
        return true;
    },

    remove(date) {
        const i = this.groups.findIndex(g => g.date === date);
        if (i !== -1) this.groups.splice(i, 1);
    }
};
