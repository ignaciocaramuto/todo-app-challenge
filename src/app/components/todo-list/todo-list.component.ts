import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    priority: new FormControl(Priority.High),
    done: new FormControl(false)
  });

  tasks: Task[] = [];
  task!: Task;

  lastId!: number | null;

  displayedColumns: string[] = ['id', 'name', 'priority', 'done', 'actions'];

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.todoListService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.lastId = this.tasks[this.tasks.length - 1].id;
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
            console.log('Task added successfully!');
          }
        }
      })
    }
  }

  deleteTask(task: Task): void {
    this.todoListService.deleteTask(task).subscribe({
      next: () => {
        this.getTasks();
        console.log('delete task succesfully!');
      },
      error: (error) => console.error(error)
    })
  }

}
