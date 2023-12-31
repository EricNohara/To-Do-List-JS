import { renderList } from "./formView.js";
import { taskArr } from "./taskArrView.js";

//declare global scope
let checkboxes;
let checked = [];

//used to get the current checkboxes in the window
const getCheckBoxes = function () {
  checkboxes = [...document.querySelectorAll(".checkbox")];
};

//function to reassign the element task numbers in the checked array after an element is removed
const reassignChecked = function (e) {
  //selecting the task number for the element that was removed from the task array
  const removedTaskNum = e.target.closest(".list-item").classList[1].slice(-1);

  // reasssigning all of the values that are changed by the current task being unchecked
  checked = checked.map((el) => {
    if (el.slice(-1) > removedTaskNum)
      return `${el.slice(0, el.length - 1)}${el.slice(-1) - 1}`;
    return el;
  });
};

const removeFromCheckedArr = function (e) {
  const index = checked.indexOf(e.target.closest(".list-item").classList[1]);

  //removing the correct list item based on what box was unchecked
  checked = [
    ...checked.slice(0, index),
    ...checked.slice(index + 1, checked.length),
  ];
};

const checkedHandler = function (e) {
  //selecting the closest remove button from the checked box and making it visible
  e.target
    .closest(".list-item")
    .querySelector(".btn-remove-task")
    .classList.toggle("hidden");

  //finding correct index in taskArr
  const index = +taskArr.findIndex(
    (el) =>
      el.itemNum === +e.target.closest(".list-item").classList[1].slice(-1)
  );

  //update the checked array for use in selecting all checked elements to mark as important
  if (e.target.checked) {
    checked.push(e.target.closest(".list-item").classList[1]);
    taskArr[index].checked = true;
  }
  if (!e.target.checked) {
    removeFromCheckedArr(e);
    taskArr[index].checked = false;
  }

  //rerender the list
  renderList();
};

const clearCheckedArr = function () {
  checked.length = 0;
};

const refreshCheckedArr = function (arr) {
  clearCheckedArr();
  arr.forEach((el) => {
    if (el.checked) checked.push(`item${el.itemNum}`);
  });
};

const resetChecked = function () {
  checked.length = 0;
  if (checkboxes) checkboxes.length = 0;
};

export {
  checkboxes,
  checked,
  checkedHandler,
  getCheckBoxes,
  removeFromCheckedArr,
  reassignChecked,
  refreshCheckedArr,
  resetChecked,
};
