import { Component, OnInit, effect, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AiService } from '../../shared/services/ai.service';
import { CarbonStateService } from '../../shared/services/carbon-state.service';
import { CarbonBreakdown } from '../../shared/models/carbon-break-down.model';
import { AiResponse } from '../../shared/models/ai-response-interface';

@Component({
  selector: 'app-insight-component',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './insight-component.component.html',
  styleUrl: './insight-component.component.css'
})
export class InsightComponent {
  public insightsText = '';
  public suggestions: string[] = [];

  public loading = signal<boolean>(false);
  public error = signal<string>('');

  constructor(
    private readonly aiService: AiService,
    private readonly carbonState: CarbonStateService
  ) {
    this.loading.set(true);
    this.error.set('');
    effect(() => {
      const currentReport: CarbonBreakdown | null = this.carbonState.breakdown;
      const country = this.carbonState.country;

      if (currentReport && country) {
        this.fetchAiInsights(currentReport, country); 
      } 
      else if (!country) {
        this.error.set('Selected country is missing.');
        this.loading.set(false);
      }
    },{ allowSignalWrites: true } );
  }

  private fetchAiInsights(report: CarbonBreakdown, country: string): void {
    this.aiService.getAiSuggestionsAndInsights(report, country).subscribe({
      next: (response: AiResponse) => {
        try {
          const rawContent = response.choices?.[0]?.message?.content ?? '{}';
          const parsed = JSON.parse(rawContent);

          this.insightsText = parsed.insights ?? '';
          this.suggestions = parsed.suggestions ?? [];
        } catch {
          this.error.set('Failed to parse AI response.');
        } finally {
          this.loading.set(false);
        }
      },
      error: () => {
        this.error.set('Failed to fetch AI insights.');
        this.loading.set(false);
      }
    });
  }
}
