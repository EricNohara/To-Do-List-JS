import { refreshTasks, renderTasks } from "./tasksView.js";
import {
  checkboxes,
  removeBtns,
  checkedHandler,
  removedHandler,
  getCheckBoxes,
  getRemoveBtns,
} from "./taskActionView.js";

const addItemForm = document.querySelector(".form-add-item");
const question1 = document.getElementById("question1");
const question2 = document.getElementById("question2");
const requiredQuestion = document.querySelector(".required-question");

let taskArr = [];

//function to handle submission of the form
const submitHandler = function (e) {
  e.preventDefault();

  const task = question1.value;
  const time = question2.value;

  if (task === "") {
    requiredQuestion.classList.add("required");
    return;
  }

  const taskInfo = { task, time };

  requiredQuestion.classList.remove("required");

  taskArr.push(taskInfo);

  //reset form values
  question1.value = "";
  question2.value = "";
  question1.blur();
  question2.blur();

  //render the new list
  refreshTasks();
  renderTasks();
  getCheckBoxes();
  getRemoveBtns();

  //add event listener for each new list item and their checkboxes
  checkboxes.forEach((box) => box.addEventListener("change", checkedHandler));

  //add event listener for each remove button
  removeBtns.forEach((btn) => btn.addEventListener("click", removedHandler));
};

export { addItemForm, submitHandler, taskArr };
