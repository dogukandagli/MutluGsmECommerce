import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://localhost:7261/";
axios.defaults.withCredentials = true;

axios.interceptors.request.use();
axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.isSuccessful) {
      toast.success(data.data);
    }
    return response;
  },
  (error: AxiosError) => {
    const { data } = error.response as AxiosResponse<ApiResponse>;

    if (!data.isSuccessful) {
      if (Array.isArray(data.errorMessages) && data.errorMessages.length > 0) {
        data.errorMessages.forEach((message: string) => {
          toast.error(message);
        });
      } else {
        toast.error("Bilinmeyen hata");
      }
    }
    return Promise.reject(error.response);
  }
);

const queries = {
  get: (url: string) =>
    axios.get(url).then((response: AxiosResponse) => response.data),
  post: (url: string, body: {}) =>
    axios.post(url, body).then((response: AxiosResponse) => response.data),
  put: (url: string, body: {}) =>
    axios.put(url, body).then((response: AxiosResponse) => response.data),
  delete: (url: string) =>
    axios.delete(url).then((response: AxiosResponse) => response.data),
};

export default queries;

export interface ApiResponse {
  data?: string;
  errorMessages?: string[];
  isSuccessful: boolean;
  statusCode: number;
}
