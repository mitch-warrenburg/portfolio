import { AxiosResponse } from 'axios';

export type AnyObject = {
  [key: string]: any;
};

export interface HttpRequestFunction<R> {
  (path: string, params?: AnyObject, body?: AnyObject): Promise<AxiosResponse<R>>;
}
