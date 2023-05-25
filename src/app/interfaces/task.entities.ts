export interface Task {
    id: number;
    name: string;
    priority: Priority
}

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}