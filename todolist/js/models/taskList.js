export class TaskList {
  taskList = [];
  selectedType = "all";

  addTask(task) {
    this.taskList = [...this.taskList, task];
  }

  removeTask(id) {
    this.taskList = this.taskList.filter((ele) => ele.id !== id);
  }
}
