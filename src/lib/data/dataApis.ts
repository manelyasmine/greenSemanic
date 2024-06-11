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

  async uploadData(data: NewDataParams[]): Promise<{res? :Data,  error?: string }> {
    // Make API request
    try {
      const response = await this.apiData.post('/batch', data , { withCredentials: true });

      return {res : {...response.data, id: response.data._id}}
    } catch (e) {
      return { error: 'backend error' };
    }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }
  async createData(data: NewDataParams): Promise<{res? :Data,  error?: string }> {
    // Make API request
    try {
      const response = await this.apiData.post('/', data , { withCredentials: true });

      return {res : {...response.data, id: response.data._id}}
    } catch (e) {
      return { error: 'backend error' };
    }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async getData(): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiData.get('/', { withCredentials: true });

      return { res: res.data.map((e: any) => ({ ...e, id: e._id })) };
    } catch (e) {
      return { error: 'backend error' };
    }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async updateData(target: NewDataParams): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiData.put('/',target,{ withCredentials: true });

      return {  };
    } catch (e) {
      return { error: 'backend error' };
    }

    return {};
  }

  async deleteData(id: string): Promise<{ res?: any; error?: string }> {
    // Make API request
    try {
      const res = await this.apiData.delete('/' + id, { withCredentials: true });

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

export const dataApis = new DataApis();
