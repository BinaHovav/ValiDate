import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

class HttpService {
  private instance = axios.create({
    baseURL: 'http://localhost:3001',
  });

  get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  };

  post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config);
    return response.data;
  };

  put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config);
    return response.data;
  };

  delete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  };
}

const httpService = new HttpService();
export default httpService;
