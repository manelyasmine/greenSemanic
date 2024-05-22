'use client';

import axios from 'axios';

import type { User } from '@/types/user';

import api from '../api';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

// const user = {
//   id: 'USR-000',
//   avatar: '/assets/avatar.png',
//   firstName: 'Afaf',
//   lastName: 'KELAI',
//   email: 'afafkelly@gmail.com',
// } satisfies User;

export interface SignUpParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}


class TargetApis {
  private apiTarget = axios.create({
    baseURL: `${api}/target/`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });
  async signUp(data: SignUpParams): Promise<{ error?: string }> {
    // Make API request
    // try {
    //   const response = await this.client.post('/', { username: data.firstname + data.lastname, ...data });
    //   console.log('here sign up ' + response);
    // } catch (e) {
    //   return { error: 'backend error' };
    // }

    // // We do not handle the API, so we'll just generate a token and store it in localStorage.
    // const token = generateToken();

    // localStorage.setItem('custom-auth-token', token);

    return {};
  }

}

export const targetApis = new TargetApis();
