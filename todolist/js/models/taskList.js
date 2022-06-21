export class TaskList {
  toDo = [];
  completed = [];

  addToDo(task) {
    this.toDo = [...this.toDo, task];
  }

  removeToDo(id) {
    this.toDo = this.toDo.filter((ele) => ele.id !== +id);
  }

  addCompleted(task) {
    this.completed = [...this.completed, task];
  }

  removeCompleted(id) {
    this.completed = this.completed.filter((ele) => ele.id !== +id);
  }

  // sortAZToDo() {
  //   this.toDo.sort((a, b) => {
  //     return a.description > b.description ? 1 : -1 ;
  //   });
  // }

  // sortAZCompleted() {
  //   this.completed.sort((a, b) => {
  //     return a.description > b.description ? 1 : -1;
  //   });
  // }

  // sortZAToDo() {
  //   this.toDo.sort((a, b) => {
  //     return b.description > a.description ? 1 : -1;
  //   });
  // }

  // sortZACompleted() {
  //   this.completed.sort((a, b) => {
  //     return b.description > a.description ? 1 : -1;
  //   });
  // }

  // removeCompleted(id) {
  //   this.toDo = this.toDo.filter((ele) => ele.id !== +id)
  // }
}
