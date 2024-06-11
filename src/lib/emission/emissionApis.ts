'use client';

import axios from 'axios';

import { Target } from '@/types/target';
import type { User } from '@/types/user';

import api from '../api';

 

export interface NewTargetParams {
  name?: string;
  type?: string;
  emissionReduction?: string;
  baseYear?: string;
}

class EmissionApis {
  private apiEmission = axios.create({
    baseURL: `${api}/emission/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });
 

  async getEmissions(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiEmission.get('/', { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    } 

    return {};
  }

}
 

export const emissionApis = new EmissionApis();
