import { jwtDecode } from 'jwt-decode';

export function setToken(token: string) {
  localStorage.setItem('token', token);
}
export function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

export function logout() {
  localStorage.removeItem('token');
}

