import axios from "axios";

const baseURL = "https://food-recipe-api-et.onrender.com/";

const app = axios.create({
  baseURL,
  withCredentials: true,
});

app.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
    }
    return Promise.reject(error);
  }
);

export default app;
