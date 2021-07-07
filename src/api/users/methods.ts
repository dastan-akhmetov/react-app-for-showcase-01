import { AxiosResponse } from "axios";
import { axiosInstance } from "../_";
import { IUser, IUsers } from "./types";

export const users = {
  getAll: (): Promise<AxiosResponse<IUsers>> => {
    return axiosInstance.get<IUsers>("users");
  },
  getById: (id: number): Promise<AxiosResponse<IUser>> => {
    return axiosInstance.get(`users/${id}`);
  },
};
