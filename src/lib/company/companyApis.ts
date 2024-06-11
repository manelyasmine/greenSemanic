'use client';

import axios from 'axios';

import { Target } from '@/types/target';
import type { User } from '@/types/user';
 
import api from '../api';
 

export interface NewCompanyParams {
  name?: string;
  type?: string;
  emissionReduction?: string;
  baseYear?: string;
}

class CompanyApis {
  private apiCompany = axios.create({
    baseURL: `${api}/company/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });
  async createCompany(data: NewCompanyParams): Promise<{res? :Target,  error?: string }> {
    // Make API request
    try {
      const response = await this.apiCompany.post('/', data , { withCredentials: true });

      return {res : {...response.data, id: response.data._id}}
    } catch (e) {
      return { error: 'backend error' };
    } 

    return {};
  }
  async getCompany(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiCompany.get('/', { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    }
 

    return {};
  }
}

export const companyApis = new CompanyApis();
