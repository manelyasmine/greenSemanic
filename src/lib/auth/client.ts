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

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface UpdateParams {
  firsname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  city? :string;
  country?: string;
  timezone?:string
}
class AuthClient {
  private user: User = {};
  private client = axios.create({
    baseURL: `${api}/api/users`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-secret': process.env.NEXTAUTH_SECRET || '',
    },
  });
  async signUp(data: SignUpParams): Promise<{ error?: string }> {
    // Make API request
    try {
      const response = await this.client.post('/', { username: data.firstname + data.lastname, ...data });
      this.user = { id: response.data._id, ...response.data };
    } catch (e) {
      return { error: 'backend error' };
    }

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();

    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const response = await this.client.post('/auth', params, { withCredentials: true });

      this.user = { id: response.data._id, ...response.data };
    } catch (e) {
      return { error: 'backend error' };
    }
    const { email, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    // if (email !== 'afafkelly@gmail.com' || password !== 'Secret1') {
    //   return { error: 'Invalid credentials' };
    // }

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }
  async updateUserInfo(params: UpdateParams) {
    try {
      const response = await this.client.put('/profile', params, { withCredentials: true });

      this.user = { id: response.data._id, ...response.data };
    } catch (e) {
      // console.log('error '+ JSON.stringify(e.response.data))
      return { error: 'backend error: '+e.response.data.error };
    }
    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: this.user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    try {
      const response = await this.client.post('/logout', { withCredentials: true });

      this.user = {};
    } catch (e) {
      return { error: 'backend error' };
    }

    return {};
  }
}

export const authClient = new AuthClient();
