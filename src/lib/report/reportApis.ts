'use client';

import axios from 'axios';
import { Report } from '@/types/report';
import type { User } from '@/types/user';
import api from '../api';


 

class ReportApis {
  private apiReport = axios.create({
    baseURL: `${api}/role/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });
  async createReport(data: Report): Promise<{res? :Report,  error?: string }> {
    // Make API request
    try {
      const response = await this.apiReport.post('/', data , { withCredentials: true });

      return {res : {...response.data, id: response.data._id}}
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  }
/*   async getRoles(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiRole.get('/', { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  } */


 

 
 

  /*   async deleteRole(id: string, data: User): Promise<{ res?: any; error?: string }> {
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
    } */

    
    
}

export const reportApis = new ReportApis();
