import {TaskAtom} from "./taskAtom";
import {TaskList} from "./taskList";

const doCalculus = new TaskAtom("Do Calculus");
const doPhysics = new TaskAtom("Do Physics");
const buyMilk = new TaskAtom("Buy some milk");
const buyApples = new TaskAtom("Buy some apples");
const buyPie = new TaskAtom("Buy a pie");
const playSnooker = new TaskAtom("Play snooker");

const doHomework = new TaskList("Do homework");
doHomework.addSubtask(doCalculus);
doHomework.addSubtask(doPhysics);

const goGrocery = new TaskList("Go to the grocery store");
goGrocery.addSubtask(buyMilk);
goGrocery.addSubtask(buyApples);
goGrocery.addSubtask(buyPie);

doCalculus.markDone();
goGrocery.markDone();

const todoToday = new TaskList("To do today");
todoToday.addSubtask(playSnooker);
todoToday.addSubtask(doHomework);
todoToday.addSubtask(goGrocery);

console.log(todoToday.toString());
