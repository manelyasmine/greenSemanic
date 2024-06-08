'use client';

import axios from 'axios';

import { Target } from '@/types/target';
import type { User } from '@/types/user';

import api from '../api';

 

export interface UserParams {
  username?: string;
  email?: string;
  isAdmin?: string;
  status?: string;
}

class UserApis {
  private apiUser = axios.create({
    baseURL: `${api}/api/users`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });

 

  async getUsers( ): Promise<{res? :any,  error?: string }> {
    // Make API request
    try {
      const response = await this.apiUser.get('/' , { withCredentials: true });
           // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",response.data)
      return {res : response.data}
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  }
 

  
 
}

export const userApis = new UserApis();
