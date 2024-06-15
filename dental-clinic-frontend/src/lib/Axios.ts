import axios from "axios";
axios.defaults.withCredentials = true;

const Axios = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
