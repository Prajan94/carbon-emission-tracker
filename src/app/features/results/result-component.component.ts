import { Component, ElementRef, ViewChild, effect } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import html2canvas from 'html2canvas';
import { NgFor } from '@angular/common';
import jsPDF from 'jspdf';
import { NgChartsModule } from 'ng2-charts';
import { ROUTE_PATHS } from '../../shared/constants/route.constant';
import { CarbonStateService } from '../../shared/services/carbon-state.service';

@Component({
  selector: 'app-result-component',
  standalone: true,
  templateUrl: './result-component.component.html',
  styleUrl: './result-component.component.css',
  imports: [NgChartsModule, NgFor]
})
export class ResultComponent {
  @ViewChild('reportContainer') reportContainer!: ElementRef;

  // Chart state
  public totalEmission = 0;
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Energy', 'Transport', 'Food', 'Other'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#134235', '#1A563F', '#0F362B', '#2A6A55']
    }]
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#134235' }
      }
    }
  };

  constructor(
    private readonly router: Router,
    private readonly carbonState: CarbonStateService
  ) {
    effect(() => {
      const breakdown = this.carbonState.breakdown;

      if (!breakdown) return;

      const { energy, transport, food, other } = breakdown;

      this.pieChartData = {
        ...this.pieChartData,
        datasets: [{
          ...this.pieChartData.datasets[0],
          data: [energy, transport, food, other]
        }]
      };

      this.totalEmission = energy + transport + food + other;
    });
  }

  // Navigation
  public recalculate(): void {
    this.router.navigate([ROUTE_PATHS.calculateForm]);
  }

  public loadInsights(): void {
    this.router.navigate([ROUTE_PATHS.insights]);
  }

  // PDF Report Export
  public downloadReport(): void {
    const reportElement = this.reportContainer.nativeElement;

    html2canvas(reportElement).then(canvas => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Draw heading text at top
    const headingY = 20;
    pdf.setFontSize(50);
    pdf.setTextColor('#134235');
    pdf.text('Your Carbon Footprint', pdfWidth / 2, headingY, { align: 'center' });

    // Leave vertical space after heading
    const imageY = headingY + 5;

    //Draw image below heading
    pdf.addImage(imageData, 'PNG', 0, imageY, pdfWidth, pdfHeight);
      pdf.save('carbon-footprint-report.pdf');
    }).catch((error: unknown) => {
      console.error('[ResultComponent] Error generating PDF report:', error);
    });
  }
  public get treesNeeded(): number {
    return Math.ceil((this.totalEmission * 52) / 21);
  }
}
