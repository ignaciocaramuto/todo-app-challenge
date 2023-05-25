import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.todoListService.getAllTasks().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error(error)
    });
  }

}
