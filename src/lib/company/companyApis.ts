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
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    } 

    return {};
  }
  async getCompany(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiCompany.get('/', { withCredentials: true });

    console.log("get compa apissssss",res.data)

      return { res: res.data };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    }
 

    return {};
  }

  async getLocations(id ): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiCompany.get('/location/'+id, { withCredentials: true });


      return { res: res.data.locations };
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};
    }
 

  }
  async addLocation(id , location): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiCompany.put('/location/'+id, location , { withCredentials: true });


      return { res: res.data.newLocation};
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};;
    }
  }

  async deleteLocation(companyId , locationId): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiCompany.delete('/'+companyId+'/location/'+locationId , { withCredentials: true });

    

      return { res: res.data.newLocation};
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};;
    }
  }

  async updateLocation(companyId , location): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiCompany.put('/'+companyId+'/location/'+location._id , location , { withCredentials: true });

    

      return { res: res.data.newLocation};
    } catch (e) {
      const error = e.response ? e.response.data.error : 'Connexion Error' 
      return { error: error};;
    }
  }
}

export const companyApis = new CompanyApis();
