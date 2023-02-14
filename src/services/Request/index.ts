import { RequestOptions } from "./type";

const BASE_URL = import.meta.env.VITE_BASE_URL;

class Request {
  baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            reject(res);
          }
          return res.json();
        })
        .then((data) => {
          resolve(data as T);
        })
        .catch((err) => reject(err));
    });
  }
  get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request(url, {
      ...options,
      method: "GET",
    });
  }
  post<T>(url: string, options: RequestOptions): Promise<T> {
    return this.request(url, {
      ...options,
      method: "POST",
    });
  }
  put<T>(url: string, options: RequestOptions): Promise<T> {
    return this.request(url, {
      ...options,
      method: "PUT",
    });
  }
  delete<T>(url: string, options: RequestOptions): Promise<T> {
    return this.request(url, {
      ...options,
      method: "DELETE",
    });
  }
}

export default new Request(BASE_URL);
