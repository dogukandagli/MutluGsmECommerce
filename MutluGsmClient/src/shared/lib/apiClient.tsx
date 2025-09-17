import axios, { type AxiosResponse } from "axios";

axios.create({ baseURL: "https://localhost:7261/" });
axios.defaults.withCredentials = true;

axios.interceptors.request.use();
axios.interceptors.response.use();

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
