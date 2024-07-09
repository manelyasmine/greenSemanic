'use client';

import axios from 'axios';

import { Report } from '@/types/report';
import type { User } from '@/types/user';

import api from '../api';

class ReportApis {
  private apiReport = axios.create({
    baseURL: `${api}/report/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });
  async createReport(data: FormData): Promise<{ res?: Report; error?: string }> {
    // Make API request
    console.log('createReport front', data);
    try {
      const response = await this.apiReport.post('/', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response', response);
      return { res: { ...response.data, id: response.data._id } };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error';
      return { error: error };
    }
  }

  async uploadImage(formData: FormData, id: string): Promise<{ success?: boolean; error?: string }> {
    try {
      console.log('formdata', { formData });
      const data = {};
      const response = await this.apiReport.post('/' + id + '/image', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { response };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error';
      return { error: error };
    }
  }
  async getReports(filters = {}): Promise<{ res?: any;total?:any,totalPages?:any, error?: string }> {
   
    const queryString = new URLSearchParams(filters); 
    try {
      const res = await this.apiReport.get('/?' + queryString.toString(), { withCredentials: true });
      console.log("backend targets",res.data.total,res.data.totalPages,res.data.pageMin)
      const total = res.data.total || 1;  
      const totalPages=res.data.totalPages || 1;
      return {
        res: res.data.reportRoles.map((e: any) => ({ ...e, id: e._id })), 
         total,
         totalPages
      }; } catch (e) {
      return { error: 'backend error'+e };
    } 

    return {};
  }

  async deleteReport(id: string, data: User): Promise<{ res?: any; error?: string }> {
    try {
      const res = await this.apiReport.delete(`/${id}`, {
        data, // Add data to request body
        headers: { 'Report-ID': id }, // Add id to request headers
        withCredentials: true,
      });

      return { res };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error';
      return { error: error };
    }
  }
}

export const reportApis = new ReportApis();
