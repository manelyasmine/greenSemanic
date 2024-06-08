'use client';

import axios from 'axios';

import { Task } from '@/types/task';
import type { User } from '@/types/user';
import type {Target} from '@/types/target';
import api from '../api';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface NewTaskParams {
<<<<<<< HEAD
  taskName?: string;
  targetName?: string;
  dueDate?: string;
  usersIds?: string[];
  createdBy?:string;
=======
  name?: string;
  target?: string;
  dueDate?: Date | null;
  usersIds?: string[];
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
}

class TaskApis {
  private apiTask = axios.create({
    baseURL: `${api}/tasks`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });

  async updateTask(task: NewTaskParams): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiTask.put('/',task,{ withCredentials: true });

      return {  };
    } catch (e) {
      return { error: 'backend error' };
    }

    return {};
  }
<<<<<<< HEAD
async assignTask(task: NewTaskParams): Promise<{ res?: any; error?: string }> {
  // Make API request
  try {
    const res = await this.apiTask.patch('/',task,{ withCredentials: true });

    return {  };
  } catch (e) {
    return { error: 'backend error' };
  }

  return {};
}
  async createTask(data: NewTaskParams): Promise<{res? :Task,  error?: string }> {
    // Make API request
    try { 
      const response = await this.apiTask.post('/', data , { withCredentials: true });
   

      return {res : {...response.data }}
=======

  async createTask(id: string,data: NewTaskParams): Promise<{res? :Task,  error?: string }> {
    // Make API request
    try { 
      const response = await this.apiTask.post('/', data , { withCredentials: true });
      console.log("create task apis===>",response,id,data);

      return {res : {...response.data, id: response.data._id}}
>>>>>>> 1099567 (modify ui for add task,add modify drawer ,integration for some apis task)
    } catch (e) {
      return { error: 'backend error' };
    } 

    return {};
  }

 


  async getTasks(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiTask.get('/', { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    }


    return {};
  }

  async getMyTasks(id:string): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiTask.get('/'+id, { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    }


    return {};
  }


async deleteTask(id: string): Promise<{ res?: any; error?: string }> {
  // Make API request
  try {
    const res = await this.apiTask.delete('/' + id, { withCredentials: true });

    return {};
  } catch (e) {
    return { error: 'backend error' + e };
  }
 
  return {};
}






}
export const taskApis = new TaskApis();
