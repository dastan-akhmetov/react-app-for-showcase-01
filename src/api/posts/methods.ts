import { AxiosResponse } from 'axios';
import { axiosInstance } from '../_';
import { IPost, IPosts } from './types';

export const posts = {
  getAll: (): Promise<AxiosResponse<IPosts>> => {
    return axiosInstance.get<IPosts>('posts');
  },
  getById: (id: number): Promise<AxiosResponse<IPost>> => {
    return axiosInstance.get(`posts/${id}`);
  }
};
