import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Priority, Task } from 'src/app/interfaces/task.entities';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  taskForm = new FormGroup ({
    id: new FormControl(2),
    name: new FormControl('', Validators.required),
    priority: new FormControl(Priority.Medium),
    done: new FormControl(false)
  });

  tasks: Task[] = [];
  tasksCopy: Task[] = [];
  task!: Task;

  lastId!: number | null;

  displayedColumns: string[] = ['id', 'name', 'priority', 'done', 'actions'];

  constructor(private todoListService: TodoListService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.todoListService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.lastId = this.tasks.length === 0 ? 1 : this.tasks[this.tasks.length - 1].id;
        this.tasksCopy = this.tasks;
      },
      error: (error) => console.error(error)
    });
  }

  addTask(): void {
    if (this.taskForm.valid && this.lastId) {
      this.task = {
        id: this.lastId + 1,
        name: this.taskForm.controls.name.value,
        priority: this.taskForm.controls.priority.value,
        done: false
      }
      this.todoListService.addTask(this.task).subscribe({
        next: (data) => {
          if (data) {
            this.getTasks();
            this.taskForm.reset();
            this.taskForm.controls['name'].setErrors(null);
            this.openSuccessSnackBar('Task added successfully!');
          }
        },
        error: (error) => this.openFailureSnackBar(error.message)
      });
    }
  }

  deleteTask(task: Task): void {
    this.todoListService.deleteTask(task).subscribe({
      next: () => {
        this.getTasks();
        this.openSuccessSnackBar('Task deleted successfully!');
      },
      error: (error) => this.openFailureSnackBar(error.message)
    })
  }

  updateTaskPriority(event: any): void {
    if (event.priority !== event.task.priority) {
      event.task.priority = event.priority;
      this.updateTask(event.task);
    }
  }

  updateTaskDone(event: any): void {
    event.task.done = event.checked;
    this.updateTask(event.task);
  }

  updateTask(task: Task): void {
    this.todoListService.editTask(task).subscribe({
      next: (data) => {
        if (data) {
          this.getTasks();
          this.openSuccessSnackBar('Task edited successfully!');
        }
      },
      error: (error) => this.openFailureSnackBar(error.message)
    });
  }

  filterTasks(event: any): void {
    this.tasks = this.tasksCopy.filter(task => task.name?.toLowerCase().includes(event.target.value));
  }

  openSuccessSnackBar(message: string){
    this._snackBar.open(message, "OK", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'app-notification-success'
    });
  }

  openFailureSnackBar(message: string){
    this._snackBar.open(message, "OK", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'app-notification-error'
      });
    }
}
