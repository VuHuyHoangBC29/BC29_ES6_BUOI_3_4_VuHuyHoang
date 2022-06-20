// import { TaskList } from "../models/taskList.js";
// import { Task } from "../models/task.js";

// const service = new TaskList();

// const getEle = (id) => document.getElementById(id);

// const renderTaskList = (data) => {
//   let contentHTML = "";
//   data.forEach((item) => {
//     contentHTML += `
//         <li>
//                 ${item.description}
//                 <div class="buttons">
//                   <button onclick = "removeTask('${item.id}')">
//                     <i class="fa-regular fa-trash-can remove"></i>
//                   </button>

//                   <button onclick = "completeTask('${item.id}')">
//                     <i class="fa-solid fa-circle-check complete"></i>
//                   </button>
//                 </div>
//         </li>
//         `;
//   });

//   getEle("todo").innerHTML = contentHTML;
// };

// const getTaskValue = () => {
//   const id = service.taskList.length + 1;
//   const description = getEle("newTask").value;

//   const task = new Task(id, description);
//   return task;
// };

// getEle("addItem").onclick = () => {
//   const task = getTaskValue();
//   console.log(task);
//   service.addTask(task);
//   console.log(service.taskList);
//   renderTaskList(service.taskList);
// };

// window.removeTask = (id) => {
//   console.log(id);
//   service.removeTask(id);
//   renderTaskList(service.taskList);
// };

const getEle = (id) => document.getElementById(id);
let toDo = [];
let completed = [];

// render toDo
const renderToDo = (data) => {
  let contentHTML = "";
  data.forEach((ele) => {
    contentHTML += `
            <li>
                  ${ele}
                  <div class="buttons">
                    <button class="remove" onclick = "removeToDo('${ele}')">
                      <i class="far fa-trash-alt"></i>
                    </button>
                      
                    <button class="complete" onclick = "completeToDo('${ele}')">
                      <i class="fas fa-check-circle"></i>
                    </button>
                  </div>
            </li>
    `;
  });
  getEle("todo").innerHTML = contentHTML;
};

// render completed
const renderCompleted = (data) => {
  let contentHTML = "";
  data.forEach((ele) => {
    contentHTML += `
            <li>
                  ${ele}
                  <div class="buttons">
                    <button class="remove" onclick = "removeCompleted('${ele}')">
                      <i class="far fa-trash-alt"></i>
                    </button>
                      
                    <button class="complete" id="completedTask">
                      <i class="fas fa-check-circle"></i>
                    </button>
                  </div>
            </li>
    `;
  });
  getEle("completed").innerHTML = contentHTML;
};

// add Task
getEle("addItem").onclick = () => {
  let task = getEle("newTask").value;
  toDo = [...toDo, task];
  renderToDo(toDo);
  getEle("newTask").value = "";
  setLocalStorage();
};

// localStorage
const setLocalStorage = () => {
  const stringToDo = JSON.stringify(toDo);
  localStorage.setItem("TO DO", stringToDo);

  const stringCompleted = JSON.stringify(completed);
  localStorage.setItem("COMPLETED", stringCompleted);
};

const getLocalStorage = () => {
  const stringifyToDo = localStorage.getItem("TO DO");
  toDo = stringifyToDo ? JSON.parse(stringifyToDo) : [];
  renderToDo(toDo);

  const stringifyCompleted = localStorage.getItem("COMPLETED");
  completed = stringifyCompleted ? JSON.parse(stringifyCompleted) : [];
  renderCompleted(completed);
};

getLocalStorage();

// remove task at toDo
window.removeToDo = (ele) => {
  toDo = toDo.filter((item) => item !== ele);
  renderToDo(toDo);
  setLocalStorage();
};

// remove task at completed
window.removeCompleted = (ele) => {
  completed = completed.filter((item) => item !== ele);
  renderCompleted(completed);
  setLocalStorage();
};

// complete task at toDo and move to completed
window.completeToDo = (ele) => {
  toDo = toDo.filter((item) => item !== ele);
  renderToDo(toDo);

  completed = [...completed, ele];
  renderCompleted(completed);

  setLocalStorage();
};

// filter completed tasks
getEle("one").onclick = () => {};

//sort a -> z
getEle("two").onclick = () => {
  toDo = toDo.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  renderToDo(toDo);

  completed = completed.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  renderCompleted(completed);

  setLocalStorage();
};

//sort z -> a
getEle("three").onclick = () => {
  toDo = toDo.sort((a, b) => {
    return b > a ? 1 : -1;
  });
  renderToDo(toDo);

  completed = completed.sort((a, b) => {
    return b > a ? 1 : -1;
  });
  renderCompleted(completed);

  setLocalStorage();
};

