/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const setCookie = (key: string, value: any) => {
  cookies.set(key, JSON.stringify(value), {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const removeCookie = (key: string) => {
  cookies.remove(key);
};
