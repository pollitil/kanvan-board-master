import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  task: string = "";

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
  
  addTask = () => {
    if( !this.IsEmpty ){
      this.tasks.push({name: this.task, stage:0});
      this.task = "";
      this.configureTasksForRendering();
    }
  }
  
  next = (task) => {
    task.stage++;
    this.configureTasksForRendering();
  }

  back = (task) => {
    task.stage--;
    this.configureTasksForRendering();
  }

  delete = (task) => {
    this.tasks.splice(this.tasks.indexOf(task),1);
    this.configureTasksForRendering();
  }


  get IsEmpty() {
    return ( this.task.trim() == '' );
  }
}

interface Task {
  name: string;
  stage: number;
}