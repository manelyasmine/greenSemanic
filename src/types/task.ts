export interface Task {
    id?:string;
    _id?:string;
    taskName?: string;
    targetName?: string;
    dueDate?:Date;
 
    usersIds?: string[]; 
    status?:string;
    createdBy?:string;
    progress?:string;
    createdAt?: string;
    timezone?: string; 
  }
  