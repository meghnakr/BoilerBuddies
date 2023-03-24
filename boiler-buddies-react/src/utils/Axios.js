import axios from "axios";
import { endpoint } from "../global";

/* Create an instance of Axios */
const axiosinstance = axios.create({
    baseURL: endpoint
})

export default axiosinstance;