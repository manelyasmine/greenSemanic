'use client';

import axios from 'axios';

import { Data } from '@/types/data';
import type { User } from '@/types/user';

import api from '../api';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface NewDataParams {
  date?: string;
  location?: string;
  category?: string;
  quantity?: string;
  emission_tracker?: string;
}

class DataApis {
  private apiData = axios.create({
    baseURL: `${api}/data/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });

  async uploadData(data: NewDataParams[]): Promise<{ res?: Data; error?: string }> {
    // Make API request
    try {
      const response = await this.apiData.post('/batch', data, { withCredentials: true });

      return { res: { ...response.data, id: response.data._id } };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    }
  }
  async createData(data: NewDataParams): Promise<{ res?: Data; error?: string }> {
    // Make API request
    try {
      const response = await this.apiData.post('/', data, { withCredentials: true });

      return { res: { ...response.data, id: response.data._id } };
    } catch (e) {
      console.log('hrere')
      const error = e.response ? e.response.data.error : 'Connexion Error' 
    
      return { error: error };
    }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async getData(filters:{}): Promise<{res?: any;total?:any,totalPages?:any, error?: string }> {
    const queryString = new URLSearchParams(filters);
    console.log("qyery",queryString)
    try {
    
      const res = await this.apiData.get('/?' + queryString.toString(), { withCredentials: true });
     
      const total = res.data.total || 1;  
      const totalPages=res.data.totalPages || 1;
      console.log("getData from front ",res.data.dataemission)
      return {
        res: res.data.dataemission.map((e: any) => ({ ...e, id: e._id })), 
         total,
         totalPages
      };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async generateRow(rows): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiData.post('/generaterow',rows, { withCredentials: true });

      return { res: res.data.data };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    }


    return {};
  }

  async updateData(data: NewDataParams): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiData.put('/'+data._id, data, { withCredentials: true });

      return {};
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    }
  }

  async deleteData(id: string): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiData.delete('/' + id, { withCredentials: true });

      return { res };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }
}

export const dataApis = new DataApis();
