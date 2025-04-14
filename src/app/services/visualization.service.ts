import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VisualizationRequest {
  code: string;
  lang: 'python' | 'r';
}

export interface VisualizationResponse {
  success: boolean;
  visualizationPath?: string;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisualizationService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }
  
  generateVisualization(request: VisualizationRequest): Observable<VisualizationResponse> {
    return this.http.post<VisualizationResponse>(`${this.apiUrl}/visualize`, request);
  }
}
