import axios, { AxiosError, AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { store } from "../redux/store";
import { URLS } from "../redux/urls";
import { setAccessToken } from "../redux/features/notification/notificationSlice";

// Instantiate axios
const instance = axios.create({
  baseURL: URLS.BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function that will be called to refresh authorization
const refreshAuthLogic = async (failedRequest: any) => {
  return axios
    .post(URLS.REFRESH_TOKEN_URL, {
      token_uri: URLS.TOKEN_URL,
      refresh_token: URLS.REFRESH_TOKEN,
    })
    .then(async (tokenRefreshResponse) => {
      const data = tokenRefreshResponse.data;

      const kAccesssToken = data.access_token;

      store.dispatch(setAccessToken(kAccesssToken));
      failedRequest.response.config.headers["Authorization"] = kAccesssToken;
      return Promise.resolve();
    })
    .catch((error) => {
      const message = "Session expired please login again";
    });
};

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const { accessToken } = store.getState().notification;

  return config;
});

// Common error handling
instance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response;
  },
  (error) => {
    // Handle the error here
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return Promise.reject(error);
    }
  }
);

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(instance, refreshAuthLogic);
// Functions to make API calls
const api = {
  post: async (url: string, body: any) => {
    try {
      const response = await instance.post(url, body);
      return response;
    } catch (e: Error | AxiosError | unknown) {
      throw e;
    }
  },
  get: async (uri: string) => {
    try {
      const response = await instance.get(uri);
      return response;
    } catch (e: Error | AxiosError | unknown) {
      throw e;
    }
  },
  put: async (uri: string) => {
    try {
      const response = await instance.get(uri);
      return response;
    } catch (e: Error | AxiosError | unknown) {
      throw e;
    }
  },
};

export default api;
