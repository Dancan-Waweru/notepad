import {userInput} from "./userInput.js"
import {DOMrem} from "./DOMrem.js";
import {CTA, text, button, showPopup} from "./CTA.js"

const STORAGE_KEY = "reminderData";

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

            bridge.save(); // save after change

            DOMrem(date); 
            showPopup("added a reminder");
            return true;
        });
    }

    removeReminder(name) {
        const clean = name.toLowerCase();
        const i = this.reminders.findIndex(r => r.name === clean);

        if (i !== -1) {
            this.reminders.splice(i, 1);
            bridge.save(); // save after deletion
        }

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
        bridge.save(); // save when state changes
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
        this.save(); // persist change
        return true;
    },

    remove(date) {
        const i = this.groups.findIndex(g => g.date === date);
        if (i !== -1) {
            this.groups.splice(i, 1);
            this.save();
        }
    },

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.groups));
    },

    load() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return;

        const parsed = JSON.parse(data);

        // rebuild class instances
        this.groups = parsed.map(g => {
            const group = new DayGroup(g.date);

            group.reminders = g.reminders.map(r => {
                const rem = new Reminder(r.name);
                rem.seen = r.seen;
                return rem;
            });

            return group;
        });
    }
};

// load reminders when module runs
bridge.load();