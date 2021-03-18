import { AnyObject, HttpRequestFunction } from './types';
import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({ responseType: 'json' });

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
  get: async <R>(path: string, params?: AnyObject): Promise<R> => {
    return withErrorHandling(axiosClient.get, path, params);
  },
  delete: async <R>(path: string, params?: AnyObject): Promise<R> => {
    return withErrorHandling(axiosClient.delete, path, params);
  },
  put: async <R>(path: string, params?: AnyObject, body?: AnyObject): Promise<R> => {
    return withErrorHandling(axiosClient.put, path, body, params);
  },
  post: async <R>(path: string, params?: AnyObject, body?: AnyObject): Promise<R> => {
    return withErrorHandling(axiosClient.post, path, body, params);
  },
};
