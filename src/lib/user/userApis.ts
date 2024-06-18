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
    console.log("get users")
    try {
      const response = await this.apiUser.get('/' , { withCredentials: true });
           console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",response.data)
      return {res : response.data}
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  }


  async createUser(data: User): Promise<{res? :User,  error?: string }> {
    // Make API request
    try {
      const response = await this.apiUser.post('/', data , { withCredentials: true });

      return {res : {...response.data, id: response.data._id}}
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  }
 

  async updateUser(  data: User): Promise<{ res?: any; error?: string }> {
   
    try {
      const res = await this.apiUser.put('/' ,data, {withCredentials: true,});
      console.log("update from back==>", data,res);
      return { res };
    } catch (e) {
      console.error('backend error:', e);
      return { error: 'backend error' };
    }
  }
  
  async updateUserStatus(id: any ): Promise<{ res?: any; error?: string }> {
   
    try {
      const res = await this.apiUser.patch('/' + id, {withCredentials: true,});
      console.log("update from back updateUserStatus==>", id,res);
      return { res };
    } catch (e) {
      console.error('backend error:', e);
      return { error: 'backend error' };
    }
  }
  




  async deleteUser(id:any): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiUser.delete('/' + id, { withCredentials: true });

      return {};
    } catch (e) {
      return { error: 'backend error' + e };
    }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }
  
  
 
}

export const userApis = new UserApis();
