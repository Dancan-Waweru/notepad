import {userInput} from "./index.js"


export class DayGroup {
    constructor(date) {
        this.date = date;
        this.reminders = [];
    }

    addReminder(name) {
        const clean = name.toLowerCase();
	    if (this.findReminder(clean)) return false;
	    this.reminders.push(new Reminder(clean));
	    return true;
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
