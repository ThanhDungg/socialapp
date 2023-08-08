import axios from 'axios';

const BASE_URL = 'https://ptit-social-app.onrender.com/';

export const getData = async (url, token) => {
   return await axios.get(BASE_URL + url, { headers: { accessToken: token } });
};

export const postData = async (url, data, token) => {
   return await axios.post(BASE_URL + url, data, { headers: { accessToken: token } });
};

export const putData = async (url, data, token) => {
   return await axios.put(BASE_URL + url, data, { headers: { accessToken: token } });
};

export const deleteData = async (url, token) => {
   return await axios.delete(BASE_URL + url, { headers: { accessToken: token } });
};
