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

/*   async updateTarget(target: NewTargetParams): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiTarget.put('/',target,{ withCredentials: true });

      return {  };
    } catch (e) {
      return { error: 'backend error' };
    }

    return {};
  } */

 /*  async deleteTarget(id: string): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiTarget.delete('/' + id, { withCredentials: true });

      return {};
    } catch (e) {
      return { error: 'backend error' + e };
    }
 

    return {};
  } */
}

export const roleApis = new RoleApis();
