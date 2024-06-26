import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '../const';
import { processErrorHandle } from './process-error-handle';
import { getToken } from './token';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};


const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://11.react.htmlacademy.pro/wtw';
const REQUEST_TIMEOUT = 5000;



export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {


      if (error.response && shouldDisplayError(error.response) && error.response.status != StatusCodes.UNAUTHORIZED) {

        processErrorHandle(error.response.data.error);

      }



      if (error.response && shouldDisplayError(error.response) && error.response.status === StatusCodes.UNAUTHORIZED ) {

        window.location.pathname === AppRoute.MyList  ? processErrorHandle(error.response.data.error) : '';
      }


      throw error;
    }
  );

  return api;
};

