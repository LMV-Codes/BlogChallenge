import axios from "axios";

export const AxiosApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts/",
});
