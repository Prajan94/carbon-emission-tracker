import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AiResponse } from '../models/ai-response-interface';
import { CarbonBreakdown } from '../models/carbon-break-down.model';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiBaseUrl}/api/ask-ai`;

  getAiSuggestionsAndInsights(carbonBrkDwnData: CarbonBreakdown, country: string ) {
    const carbonData = {
      ...carbonBrkDwnData,
      country: country
    };
    return this.http.post<AiResponse>(
      this.apiUrl,
      { carbonData }
    );
  }
}
