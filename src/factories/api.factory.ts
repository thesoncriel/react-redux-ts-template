/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import {
  ErrorModel,
  ErrorRes,
  HashMap,
  UploadStateArgs,
} from '../common/models';
import { getFileName, isServer } from '../util';

// export type HttpApiMethod = <T = any>(url: string, params?: any) => Promise<T>;

/**
 * HTTP 프로토콜을 이용하여 비동기 통신을 수행한다.
 */
export interface IHttpApi {
  /**
   * GET 메서드 호출
   * @param url 호출 경로
   * @param params 전달할 파라미터
   */
  get<T = any, P = any>(url: string, params?: P): Promise<T>;
  /**
   * POST 메서드 호출
   * @param url 호출 경로. 만약 쿼리 파라미터가 포함된다면 이 곳에 추가적으로 명시 해 주어야 한다.
   * @param data body 요청으로 보낼 데이터. json 으로 바꿔서 보내게 된다.
   */
  post<T = any, P = any>(url: string, data?: P): Promise<T>;
  /**
   * PUT 메서드 호출
   * @param url 호출 경로. 만약 쿼리 파라미터가 포함된다면 이 곳에 추가적으로 명시 해 주어야 한다.
   * @param data body 요청으로 보낼 데이터. json 으로 바꿔서 보내게 된다.
   */
  put<T = any, P = any>(url: string, data?: P): Promise<T>;
  /**
   * DELETE 메서드 호출
   * @param url 호출 경로
   * @param params 전달할 파라미터
   */
  delete<T = any, P = any>(url: string, params?: P): Promise<T>;
  /**
   * POST 메서드로 업로드 한다.
   * @param url 업로드 경로
   * @param data 업로드에 쓰이는 데이터
   * @param progCallback 업로드 상황을 보내주는 콜백
   */
  postUpload<T = any, P = any>(
    url: string,
    data: P,
    progCallback?: (args: UploadStateArgs) => void,
  ): Promise<T>;
  /**
   * PUT 메서드로 업로드 한다.
   * @param url 업로드 경로
   * @param data 업로드에 쓰이는 데이터
   * @param progCallback 업로드 상황을 보내주는 콜백
   */
  putUpload<T = any, P = any>(
    url: string,
    data: P,
    progCallback?: (args: UploadStateArgs) => void,
  ): Promise<T>;
  /**
   * GET 메서드로 파일을 비동기로 가져온다.
   * @param url 파일을 가져올 경로
   * @param params 전달할 파라미터
   * @param filename 파일이 받아졌을 때 쓰여질 파일명.
   */
  getFile<P = any>(url: string, params?: P, filename?: string): Promise<File>;
}

function getError(message = '오류', status = 400): ErrorModel {
  return {
    name: '',
    message,
    status,
  };
}

const axiosResponseToData = <T>(axiosRes: AxiosResponse<T>) => axiosRes.data;
const axiosErrorResToData = (err: AxiosError) => {
  const res: AxiosResponse<ErrorRes> = err.response!;

  if (isServer() && err) {
    throw err;
  }

  if (!res) {
    throw getError();
  }

  if (!res.data || !res.data.error) {
    throw getError(res.statusText, res.status);
  }

  throw res.data.error;
};

const uploadCommon = (
  baseUrl: string,
  headerProvider: () => HashMap<string>,
) => <T>(
  method: Method,
  url: string,
  data: any,
  progCallback?: (args: UploadStateArgs) => void,
) => {
  try {
    const argsProgress: UploadStateArgs = {
      progress: 0,
      loaded: 0,
      total: 0,
      completed: false,
    };

    const headers = headerProvider();

    return axios(baseUrl + url, {
      method,
      headers,
      data,
      onUploadProgress: (progressEvent: any) => {
        const args = argsProgress;
        args.progress =
          Math.floor((progressEvent.loaded * 1000) / progressEvent.total) / 10;
        args.loaded = progressEvent.loaded;
        args.total = progressEvent.total;

        if (progCallback) {
          progCallback(args);
        }
      },
    })
      .then((res: any) => axiosResponseToData<T>(res))
      .catch(axiosErrorResToData);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Backend 에서 API를 호출하는 서비스를 생성한다.
 * @param baseUrl 현재 서비스에서 API 호출 시 필요한 도메인 및 하위 경로를 정의 한다.
 * @param headerProvider 헤더 제공자를 주입한다.
 */
export const apiFactory = (
  baseUrl: string,
  headerProvider: () => HashMap<string> = () => ({}),
): IHttpApi => {
  const fnUploadCommon = uploadCommon(baseUrl, headerProvider);

  return {
    get<T>(url: string, params: any = null): Promise<T> {
      try {
        const headers = headerProvider();

        return axios
          .get<T>(baseUrl + url, {
            headers,
            params,
          })
          .then(axiosResponseToData)
          .catch(axiosErrorResToData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    post<T>(url: string, data: any = null): Promise<T> {
      try {
        const headers = headerProvider();

        return axios
          .post<T>(baseUrl + url, data, {
            headers,
          })
          .then(axiosResponseToData)
          .catch(axiosErrorResToData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    put<T>(url: string, data: any = null): Promise<T> {
      try {
        const headers = headerProvider();

        return axios
          .put<T>(baseUrl + url, data, {
            headers,
          })
          .then(axiosResponseToData)
          .catch(axiosErrorResToData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    delete<T>(url: string, params: any = null): Promise<T> {
      try {
        const headers = headerProvider();

        return axios
          .delete(baseUrl + url, {
            headers,
            params,
          })
          .then(axiosResponseToData)
          .catch(axiosErrorResToData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    postUpload<T>(
      url: string,
      data: any,
      progCallback?: (args: UploadStateArgs) => void,
    ): Promise<T> {
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        const value = data[key];

        if (value instanceof Array) {
          value.forEach(val => {
            const file: File = val;
            formData.append(key, file, file.name);
          });
        } else {
          formData.set(key, value);
        }
      });

      return fnUploadCommon('post', url, formData, progCallback);
    },
    putUpload<T>(
      url: string,
      data: any,
      progCallback?: (args: UploadStateArgs) => void,
    ): Promise<T> {
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        const value = data[key];

        if (value instanceof Array) {
          value.forEach(val => {
            const file: File = val;
            formData.append(key, file, file.name);
          });
        } else {
          formData.set(key, value);
        }
      });

      return fnUploadCommon('put', url, formData, progCallback);
    },
    getFile(url: string, params?: any, filename?: string): Promise<File> {
      try {
        const headers = headerProvider();

        return axios
          .get<Blob>(baseUrl + url, {
            headers,
            params,
            responseType: 'blob',
          })
          .then(axiosResponseToData)
          .then(blob => new File([blob], filename || getFileName(url)))
          .catch(axiosErrorResToData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};
