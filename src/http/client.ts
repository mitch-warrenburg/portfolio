import { AnyObject, HttpRequestFunction } from './types';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const client: AxiosInstance = axios.create({
  responseType: 'json',
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
  put: async <R>(path: string, body?: AnyObject, config?: AxiosRequestConfig): Promise<R> => {
    return withErrorHandling(client.put, path, body, config);
  },
  post: async <R>(path: string, body?: AnyObject, config?: AxiosRequestConfig): Promise<R> => {
    return withErrorHandling(client.post, path, body, config);
  },
};
