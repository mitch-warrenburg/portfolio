import { HTTP_SERVER_URL } from '../store/config';
import { AnyObject, HttpRequestFunction } from './types';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const client: AxiosInstance = axios.create({
  responseType: 'json',
  baseURL: HTTP_SERVER_URL,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

const withErrorHandling = async <R>(
  request: HttpRequestFunction<R>,
  path: string,
  ...args: any
) => {
  //TODO : implement global error handling here.
  const response = await request(path, ...args);

  return response.data;
};

export default {
  get: async <R>(path: string, config?: AxiosRequestConfig): Promise<R> => {
    return withErrorHandling(client.get, path, config);
  },
  delete: async <R>(path: string, config?: AxiosRequestConfig): Promise<R> => {
    return withErrorHandling(client.delete, path, config);
  },
  put: async <R>(path: string, config?: AxiosRequestConfig, body?: AnyObject): Promise<R> => {
    return withErrorHandling(client.put, path, body, config);
  },
  post: async <R>(path: string, config?: AxiosRequestConfig, body?: AnyObject): Promise<R> => {
    return withErrorHandling(client.post, path, body, config);
  },
  options: async <R>(path: string, config?: AxiosRequestConfig): Promise<R> => {
    return withErrorHandling(client.options, path, config);
  },
  instance: client,
};
