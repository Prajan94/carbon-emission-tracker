import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AiService } from './ai.service';
import { environment } from '../../../environments/environment';
import { CarbonBreakdown } from '../models/carbon-break-down.model';
import { AiResponse } from '../models/ai-response-interface';
import { CarbonInput } from '../models/carbon-input-form.interface';

describe('AiService', () => {
  let service: AiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AiService,
        provideHttpClient(),
        ...provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no unmatched HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post with correct URL and body', () => {
    const mockCarbonData: CarbonBreakdown = {
      energy: 100,
      transport: 200,
      food: 400,
      other: 0,
    };

    const mockCountry = 'Germany';

    const mockResponse: AiResponse = {
      choices: [
        {
          message: {
            content: 'Reduce your meat consumption and switch to public transport.'
          }
        }
      ]
    };

    service.getAiSuggestionsAndInsights(mockCarbonData, mockCountry).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(res.choices[0].message.content).toContain('Reduce your meat consumption');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/ask-ai`);
    expect(req.request.method).toBe('POST');

    const expectedPayload = {
      carbonData: {
        ...mockCarbonData,
        country: mockCountry
      }
    };

    expect(req.request.body).toEqual(expectedPayload);

    req.flush(mockResponse);
  });
});
