import CryptoJS from 'crypto-js';
import { createJSONStorage } from 'zustand/middleware';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';

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
  const month = date.toLocaleString('en-US', { month: 'short' });
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
  getItem: (name) => {
    const encryptedData = cookies.get(name);
    if (!encryptedData) return null;
    return decryptData(encryptedData);
  },
  setItem: (name, value) => {
    const encryptedValue = encryptData(value);
    cookies.set(name, encryptedValue, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
  },
  removeItem: (name) => {
    cookies.remove(name, { path: '/' });
  },
}));

export const encryptData = (data: any) => {
  if (!ENCRYPTION_KEY) {
    throw new Error('Encryption key is not defined in environment variables');
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: any) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};
