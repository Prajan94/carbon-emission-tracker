import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SLIDER_CONFIG } from '../../config/carbon-input.config';
import { FLIGHT_OPTIONS, HEATING_TYPES } from '../../shared/constants/form-option.constant';
import { ROUTE_PATHS } from '../../shared/constants/route.constant';
import { CarbonBreakdown } from '../../shared/models/carbon-break-down.model';
import { CarbonInputFormControls } from '../../shared/models/carbon-input-form-controls.type';
import { CarbonCalculatorService } from '../../shared/services/carbon-calculator.service';
import { CarbonStateService } from '../../shared/services/carbon-state.service';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent {

  public carbonForm: FormGroup<CarbonInputFormControls>;
  public sliderConfig = SLIDER_CONFIG;
  public heatingTypes = HEATING_TYPES;
  public flightOptions = FLIGHT_OPTIONS;

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly carbonCalculatorService : CarbonCalculatorService,
    private readonly carbonStateService: CarbonStateService) {
      this.carbonForm = this.fb.group<CarbonInputFormControls>({
        electricity: this.fb.nonNullable.control(200),
        gas: this.fb.nonNullable.control(100),
        heatingType: this.fb.nonNullable.control('Electric'),
        carTravel: this.fb.nonNullable.control(500),
        publicTransport: this.fb.nonNullable.control(300),
        flights: this.fb.nonNullable.control('None'),
        meatMeals: this.fb.nonNullable.control(7),
        packagedFood: this.fb.nonNullable.control(5)
      });
  }

  public onSubmit(): void {
    try {
      const formValue = this.carbonForm.getRawValue();
    
      if (!formValue) {
        throw new Error('Carbon Footprint Form data is invalid');
      }
  
      const country = this.carbonStateService.country ?? '';
      
      const breakDown: CarbonBreakdown = this.carbonCalculatorService.calculateBreakdown(formValue, country);
  
      this.carbonStateService.setBreakdown(breakDown);

      this.router.navigate([ROUTE_PATHS.results]);
    } catch (error) {
      console.error('Error calculating breakdown:', error);
    }
  }
}
