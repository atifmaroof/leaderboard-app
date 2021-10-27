import axios from "axios";
import { constants } from "../constants/constants"
import { Toast } from "./Toast";

const API = axios.create({
    baseURL: `${constants.apiUrl}`,
    validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
    },
    maxRedirects: 5,
});

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')).token : null}`;
    if (config.method === "post" || config.method === "put") {
        console.group(config.url);
        console.info(JSON.stringify(config.data, null, 2));
        console.groupEnd();
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
API.interceptors.response.use((response) => {
    if (response.config.method === "post" || response.config.method === "put") {
        console.group(response.config.url);
        console.info(JSON.stringify(response.data, null, 2));
        console.groupEnd();
    }
    else if (response.config.method === "get") {
        console.group(response.config.url);
        console.info(response.data);
        console.groupEnd();
    }
    if (response.config.parse) {
        //perform the manipulation here and change the response object
    }
    if (response.data['status_code'] == 402 && (response.data.message[0].match('Token Expired') || response.data.message[0].match('Token Invalid'))) {
        Toast.Error(response.data.message[0]);
        localStorage.removeItem('userObj');
    }
    return response;
}, (error) => {
    return Promise.reject(error.message);
});
export default API