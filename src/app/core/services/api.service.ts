import { Injectable, signal } from '@angular/core';

export interface ApiError {
  status: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = '/api/';

  readonly loading = signal(false);
  readonly error = signal<ApiError | null>(null);

  async get<T>(url: string): Promise<T | null> {
    return this.request<T>('GET', url);
  }

  async post<T>(url: string, body: unknown): Promise<T | null> {
    return this.request<T>('POST', url, body);
  }

  async put<T>(url: string, body: unknown): Promise<T | null> {
    return this.request<T>('PUT', url, body);
  }

  async delete<T>(url: string): Promise<T | null> {
    return this.request<T>('DELETE', url);
  }

  private async request<T>(method: string, url: string, body?: unknown): Promise<T | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseUrl}${url}`, options);

      if (!response.ok) {
        const errorMessage = await this.extractErrorMessage(response);
        this.error.set({ status: response.status, message: errorMessage });
        return null;
      }

      const data: T = await response.json();
      return data;
    } catch (err) {
      this.error.set({ status: 0, message: (err as Error).message || 'Network error' });
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  private async extractErrorMessage(response: Response): Promise<string> {
    try {
      const errorBody = await response.json();
      return errorBody.message || errorBody.error || response.statusText;
    } catch {
      return response.statusText || 'Unknown error';
    }
  }
}
