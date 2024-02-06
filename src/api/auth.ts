import { AuthRequest, AuthResponse } from 'src/types';
import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';

export async function login ({email, password} : Partial<AuthRequest>) : Promise<void> {
  try {
    const response: AxiosResponse<AuthResponse> = await api.post('/login',{
      email,
      password
    });

    localStorage.setItem('userToken', response.data.token);
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export async function register (userObj: AuthRequest) : Promise<void> {
  try {
    await api.post('/register', userObj);
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export async function logout() : Promise<void> {
  try {
    await api.post('logout');

    localStorage.removeItem('userToken');
  } catch (error: any) {
      console.log(error.message);
      throw error;
  }
}
