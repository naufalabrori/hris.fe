import { createJSONStorage } from 'zustand/middleware';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/* eslint-disable @typescript-eslint/no-explicit-any */
export const minValue = (val: number, min: number) => {
  if (val < min) return min;
  return val;
};

export const formatDateTime = (isoString: string) => {
  if (isoString == null) {
    return '-';
  }

  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' }); // Menggunakan format bulan singkat (Jul, Aug, etc.)
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

export const formatDate = (isoString: string) => {
  if (isoString == null) {
    return '-';
  }
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}/${month}/${year}`;
};

export function objectToFormData(obj: any) {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value instanceof Object && !Array.isArray(value)) {
        for (const nestedKey in value) {
          if (value.hasOwnProperty(nestedKey)) {
            const nestedValue = value[nestedKey];
            formData.append(`${key}[${nestedKey}]`, nestedValue);
          }
        }
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
}

export const cookieStorage = createJSONStorage(() => ({
  getItem: (name): string | null => {
    const value = cookies.get(name);
    return value ? JSON.stringify(value) : null;
  },
  setItem: (name, value) => {
    cookies.set(name, JSON.parse(value), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  },
  removeItem: (name) => {
    cookies.remove(name, { path: '/' });
  },
}));
