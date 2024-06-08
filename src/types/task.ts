export interface Task {
    id?:string;
    _id?:string;
    taskName?: string;
    targetName?: string;
    dueDate?:string;
    usersIds?: string;
    status?:string;
    createdBy?:string;
    progress?:string;
    createdAt?: string;
    timezone?: string; 
  }
  