export interface Task {
    id: number | null;
    name: string | null;
    priority: Priority | null;
    done: boolean | null
}

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}