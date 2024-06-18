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
 
  taskName?: string;
  targetName?: string;
  dueDate?: string;
  usersIds?: string[];
  createdBy?:string; 
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

    return {  };
  } catch (e) {
    return { error: 'backend error' };
  }

  return {};
}
  
async getTasks(filters = {}): Promise<{ res?: any; error?: string }> {
  // Build the query string based on filters object
  const queryString = new URLSearchParams(filters);
  console.log("querystring",queryString);

  // Make API request with optional filters
  try {
    const res = await this.apiTask.get('/?' + queryString.toString(), { withCredentials: true });

    // Process and return tasks with optional ID mapping
    return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
  } catch (e) {
    console.error('Error fetching tasks:', e); // Log specific error for debugging
    return { error: 'An error occurred. Please try again later.' }; // More informative error message
  }
}
 


  /* async getTasks(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiTask.get('/', { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    }


    return {};
  } */

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
