import { instance } from "../axios/axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await instance.get(`/users/profile`);
    return response?.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message);
    // return e;
  }
};
