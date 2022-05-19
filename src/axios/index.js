import axios from './axiosConfig'

export const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    return response.data;
  };