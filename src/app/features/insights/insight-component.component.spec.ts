import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsightComponent } from './insight-component.component';
import { AiService } from '../../shared/services/ai.service';
import { CarbonStateService } from '../../shared/services/carbon-state.service';
import { of, throwError } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { CarbonBreakdown } from '../../shared/models/carbon-break-down.model';
import { AiResponse } from '../../shared/models/ai-response-interface';

describe('InsightComponent', () => {
  let component: InsightComponent;
  let fixture: ComponentFixture<InsightComponent>;
  let aiServiceSpy: jasmine.SpyObj<AiService>;
  let carbonStateServiceStub: Partial<CarbonStateService>;

  const mockReport: CarbonBreakdown = {
    energy: 100,
    transport: 200,
    food: 400,
    other: 0,
  };

  beforeEach(() => {
    aiServiceSpy = jasmine.createSpyObj('AiService', ['getAiSuggestionsAndInsights']);
    carbonStateServiceStub = {
      breakdown: mockReport,
      country: 'Germany'
    };

    TestBed.configureTestingModule({
      imports: [InsightComponent],
      providers: [
        { provide: AiService, useValue: aiServiceSpy },
        { provide: CarbonStateService, useValue: carbonStateServiceStub }
      ]
    });

    fixture = TestBed.createComponent(InsightComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AI service and parse insights/suggestions on success', fakeAsync(()=> {
    const mockContent = JSON.stringify({
      insights: 'Reduce your car travel.',
      suggestions: ['Use bike', 'Work from home']
    });

    const mockResponse: AiResponse = {
      choices: [{ message: { content: mockContent } }]
    };

    aiServiceSpy.getAiSuggestionsAndInsights.and.returnValue(of(mockResponse));

    fixture.detectChanges(); // triggers constructor + effect
    tick();

    expect(aiServiceSpy.getAiSuggestionsAndInsights).toHaveBeenCalled();
    expect(component.insightsText).toBe('Reduce your car travel.');
    expect(component.suggestions.length).toBe(2);
    expect(component.loading()).toBeFalse();
    expect(component.error()).toBe('');
  }));
  it('should handle JSON parse error', fakeAsync(()=> {
    const invalidJSONResponse: AiResponse = {
      choices: [{ message: { content: 'Not JSON' } }]
    };

    aiServiceSpy.getAiSuggestionsAndInsights.and.returnValue(of(invalidJSONResponse));

    fixture.detectChanges();
    tick();

    expect(component.error()).toBe('Failed to parse AI response.');
    expect(component.loading()).toBeFalse();
  }));

  it('should handle API error gracefully', fakeAsync(() =>{
    aiServiceSpy.getAiSuggestionsAndInsights.and.returnValue(
      throwError(() => new Error('API Error'))
    );

    fixture.detectChanges();
    tick();

    expect(component.error()).toBe('Failed to fetch AI insights.');
    expect(component.loading()).toBeFalse();
  }));
  it('should set error if country is missing', fakeAsync(() => {
    // Simulate country = null directly on the spy object
    Object.defineProperty(carbonStateServiceStub, 'breakdown', {
      get: () => mockReport
    });
    Object.defineProperty(carbonStateServiceStub, 'country', {
      get: () => null
    });
  
    fixture = TestBed.createComponent(InsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  
    expect(component.error()).toBe('Selected country is missing.');
    expect(component.loading()).toBeFalse();
  }));
  
});
