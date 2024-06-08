export interface Task {
    id?:string;
    _id?:string;
    taskName?: string;
    targetName?: string;
    dueDate?:string;
<<<<<<< HEAD
    usersIds?: string[];
=======
    usersIds?: string;
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
    status?:string;
    createdBy?:string;
    progress?:string;
    createdAt?: string;
    timezone?: string; 
  }
  