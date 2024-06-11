export interface Task {
    id?:string;
    _id?:string;
    taskName?: string;
    targetName?: string;
    dueDate?:string;
<<<<<<< HEAD
<<<<<<< HEAD
    usersIds?: string[];
=======
    usersIds?: string;
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
=======
    usersIds?: string[];
>>>>>>> dac5812 (add assign task,add task ,add role,get all roles and start the update roles)
    status?:string;
    createdBy?:string;
    progress?:string;
    createdAt?: string;
    timezone?: string; 
  }
  