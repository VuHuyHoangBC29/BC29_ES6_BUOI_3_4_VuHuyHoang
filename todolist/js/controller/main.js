import { TaskList } from "../models/taskList.js";
import { Task } from "../models/task.js";

const service = new TaskList();

const getEle = (id) => document.getElementById(id);

// render toDo
const renderToDo = (data) => {
  let contentHTML = "";
  data.forEach((item) => {
    contentHTML += `
    <li>
      ${item.description}
        <div class="buttons">
          <button class="remove" onclick = "removeToDo('${item.id}')">
            <i class="far fa-trash-alt"></i>
          </button>
        
          <button class="complete" onclick = "completeToDo('${item.id}')">
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
  data.forEach((item) => {
    contentHTML += `
    <li>
      ${item.description}
        <div class="buttons">
          <button class="remove" onclick = "removeCompleted('${item.id}')">
            <i class="far fa-trash-alt"></i>
          </button>
        
          <button class="complete">
           <i class="fas fa-check-circle"></i>
          </button>
        </div>
    </li>
        `;
  });

  getEle("completed").innerHTML = contentHTML;
};

// get Task value
const getTaskValue = () => {
  const id = service.toDo.length + 1;
  const description = getEle("newTask").value;

  const task = new Task(id, description);
  return task;
};

// add Task
getEle("addItem").onclick = () => {
  const task = getTaskValue();
  service.addToDo(task);
  renderToDo(service.toDo);
  console.log(service.toDo);

  getEle("newTask").value = "";
  setLocalStorage();
};

// localStorage
const setLocalStorage = () => {
  const stringToDo = JSON.stringify(service.toDo);
  localStorage.setItem("TO DO", stringToDo);

  const stringCompleted = JSON.stringify(service.completed);
  localStorage.setItem("COMPLETED", stringCompleted);
};

const getLocalStorage = () => {
  const stringifyToDo = localStorage.getItem("TO DO");
  service.toDo = stringifyToDo ? JSON.parse(stringifyToDo) : [];
  renderToDo(service.toDo);

  const stringifyCompleted = localStorage.getItem("COMPLETED");
  service.completed = stringifyCompleted ? JSON.parse(stringifyCompleted) : [];
  renderCompleted(service.completed);
};

getLocalStorage();

// remove Task at toDo
window.removeToDo = (id) => {
  service.removeToDo(id);
  renderToDo(service.toDo);
  setLocalStorage();
};

// completed Task at toDo
window.completeToDo = (id) => {
  service.toDo.forEach((ele) => {
    let newId = +id;
    if (ele.id === newId) {
      service.removeToDo(newId);
      renderToDo(service.toDo);

      ele.id = service.completed.length + 1;
      const task = new Task(ele.id, ele.description);
      service.addCompleted(task);
      console.log(service.completed);
      renderCompleted(service.completed);
    }
  });
  setLocalStorage();
};

// remove Task at Completed
window.removeCompleted = (id) => {
  service.removeCompleted(id);
  renderCompleted(service.completed);
  setLocalStorage();
};

//sort a -> z
getEle("two").onclick = () => {
 service.toDo.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  renderToDo(service.toDo);

  service.completed.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  renderCompleted(service.completed);

  setLocalStorage();
};

//sort z -> a
getEle("three").onclick = () => {
  service.toDo = service.toDo.sort((a, b) => {
    return b > a ? 1 : -1;
  });
  renderToDo(service.toDo);

  service.completed.sort((a, b) => {
    return b > a ? 1 : -1;
  });
  renderCompleted(service.completed);

  setLocalStorage();
};

// const getEle = (id) => document.getElementById(id);
// let toDo = [];
// let completed = [];

// // render toDo
// const renderToDo = (data) => {
//   let contentHTML = "";
//   data.forEach((ele) => {
//     contentHTML += `
//             <li>
//                   ${ele}
//                   <div class="buttons">
//                     <button class="remove" onclick = "removeToDo('${ele}')">
//                       <i class="far fa-trash-alt"></i>
//                     </button>

//                     <button class="complete" onclick = "completeToDo('${ele}')">
//                       <i class="fas fa-check-circle"></i>
//                     </button>
//                   </div>
//             </li>
//     `;
//   });
//   getEle("todo").innerHTML = contentHTML;
// };

// // render completed
// const renderCompleted = (data) => {
//   let contentHTML = "";
//   data.forEach((ele) => {
//     contentHTML += `
//             <li>
//                   ${ele}
//                   <div class="buttons">
//                     <button class="remove" onclick = "removeCompleted('${ele}')">
//                       <i class="far fa-trash-alt"></i>
//                     </button>

//                     <button class="complete" id="completedTask">
//                       <i class="fas fa-check-circle"></i>
//                     </button>
//                   </div>
//             </li>
//     `;
//   });
//   getEle("completed").innerHTML = contentHTML;
// };

// // add Task
// getEle("addItem").onclick = () => {
//   let task = getEle("newTask").value;
//   toDo = [...toDo, task];
//   renderToDo(toDo);
//   getEle("newTask").value = "";
//   setLocalStorage();
// };

// // localStorage
// const setLocalStorage = () => {
//   const stringToDo = JSON.stringify(toDo);
//   localStorage.setItem("TO DO", stringToDo);

//   const stringCompleted = JSON.stringify(completed);
//   localStorage.setItem("COMPLETED", stringCompleted);
// };

// const getLocalStorage = () => {
//   const stringifyToDo = localStorage.getItem("TO DO");
//   toDo = stringifyToDo ? JSON.parse(stringifyToDo) : [];
//   renderToDo(toDo);

//   const stringifyCompleted = localStorage.getItem("COMPLETED");
//   completed = stringifyCompleted ? JSON.parse(stringifyCompleted) : [];
//   renderCompleted(completed);
// };

// getLocalStorage();

// // remove task at toDo
// window.removeToDo = (ele) => {
//   toDo = toDo.filter((item) => item !== ele);
//   renderToDo(toDo);
//   setLocalStorage();
// };

// // remove task at completed
// window.removeCompleted = (ele) => {
//   completed = completed.filter((item) => item !== ele);
//   renderCompleted(completed);
//   setLocalStorage();
// };

// // complete task at toDo and move to completed
// window.completeToDo = (ele) => {
//   toDo = toDo.filter((item) => item !== ele);
//   renderToDo(toDo);

//   completed = [...completed, ele];
//   renderCompleted(completed);

//   setLocalStorage();
// };

// // filter completed tasks
// getEle("one").onclick = () => {};

// //sort a -> z
// getEle("two").onclick = () => {
//   toDo = toDo.sort((a, b) => {
//     return a > b ? 1 : -1;
//   });
//   renderToDo(toDo);

//   completed = completed.sort((a, b) => {
//     return a > b ? 1 : -1;
//   });
//   renderCompleted(completed);

//   setLocalStorage();
// };

// //sort z -> a
// getEle("three").onclick = () => {
//   toDo = toDo.sort((a, b) => {
//     return b > a ? 1 : -1;
//   });
//   renderToDo(toDo);

//   completed = completed.sort((a, b) => {
//     return b > a ? 1 : -1;
//   });
//   renderCompleted(completed);

//   setLocalStorage();
// };
