'use client';

import axios from 'axios';
import { Role } from '@/types/role';
import type { User } from '@/types/user';
import api from '../api';


 

class RoleApis {
  private apiRole = axios.create({
    baseURL: `${api}/role/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });
  async createRole(data: Role): Promise<{res? :Role,  error?: string }> {
    // Make API request
    try {
      const response = await this.apiRole.post('/', data , { withCredentials: true });

      return {res : {...response.data, id: response.data._id}}
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  }
  async getRoles(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiRole.get('/', { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  }


 /*  */

   async updateRole(role: Role): Promise<{ res?: any; error?: string }> {
    // Make API request
    console.log("update from back==>",role)
    try {
      const res = await this.apiRole.put('/',role,{ withCredentials: true });

      return {  };
    } catch (e) {
      return { error: 'backend error' };
    }

    return {};
  } 

/*   async deleteRole(id: string,data:User): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiRole.delete('/' + id,data, { withCredentials: true });

      return {};
    } catch (e) {
      return { error: 'backend error' + e };
    }
 

    return {};
  }  */


    async deleteRole(id: string, data: User): Promise<{ res?: any; error?: string }> {
      try {
        const res = await this.apiRole.delete(`/${id}`, {
          data, // Add data to request body
          headers: { 'Role-ID': id }, // Add id to request headers
          withCredentials: true,
        });
    
        return { res };
      } catch (e) {
        return { error: 'backend error: ' + e };
      }
    }

    
    
}

export const roleApis = new RoleApis();
