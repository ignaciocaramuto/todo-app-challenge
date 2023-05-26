import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Priority, Task } from 'src/app/interfaces/task.entities';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  priorities = Object.values(Priority);

  @Input() task!: Task;

  @Output() deleteTaskEmitter = new EventEmitter<Task>;
  @Output() updateTaskPriorityEmitter = new EventEmitter<any>;
  @Output() updateTaskDoneEmitter = new EventEmitter<any>;

  public get priority(): typeof Priority {
    return Priority; 
  }

  deleteTask(): void {
    this.deleteTaskEmitter.emit(this.task);
  }

  updateTaskPriority(event: any): void {
    this.updateTaskPriorityEmitter.emit({task: this.task, priority: event.target.value});
  }

  updateTaskDone(event: any): void { 
    this.updateTaskDoneEmitter.emit({task: this.task, checked: event.checked})
  }

}
