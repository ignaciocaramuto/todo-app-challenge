import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskCardComponent } from '../task-card/task-card.component';

import { TodoListComponent } from './todo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListService } from 'src/app/services/todo-list.service';
import { of } from 'rxjs';
import { Priority, Task } from 'src/app/interfaces/task.entities';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoListService: TodoListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatFormFieldModule
      ],
      declarations: [
        TodoListComponent,
        TaskCardComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoListService = TestBed.inject(TodoListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize task and tasksCopy as empty arrays', () => {
    expect(component.tasks).toEqual([]);
    expect(component.tasksCopy).toEqual([]);
  });

  it('should call getTasks to get all tasks, getTasks()', () => {
    const mockTasks: Task[] = [
      { id: 1, name: 'Task 1', priority: Priority.High, done: false },
      { id: 2, name: 'Task 2', priority: Priority.Medium, done: true }
    ];

    spyOn(todoListService, 'getAllTasks').and.returnValue(of(mockTasks));

    component.getTasks();

    expect(todoListService.getAllTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.tasksCopy).toEqual(mockTasks);
  });

  it('should update tasks with filtered tasks based on search value, filterTasks()', () => {
    const mockTasks = [
      { id: 1, name: 'Task 1', priority: Priority.High, done: false },
      { id: 2, name: 'Task 2', priority: Priority.Medium, done: false },
      { id: 3, name: 'Task 3', priority: Priority.Low, done: true },
    ];

    const searchValue = 'task 3';

    spyOn(todoListService, 'getAllTasks').and.returnValue(of(mockTasks));

    component.getTasks();

    fixture.whenStable();

    component.filterTasks({ target: { value: searchValue } });

    expect(component.tasks).toEqual([
      { id: 3, name: 'Task 3', priority: Priority.Low, done: true },
    ]);
  });

});
