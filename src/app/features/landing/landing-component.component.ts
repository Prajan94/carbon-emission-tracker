import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CarbonStateService } from '../../shared/services/carbon-state.service'
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LandingFormControls } from '../../shared/models/landing-form.interface';
import { ROUTE_PATHS } from '../../shared/constants/route.constant';
import { COUNTRIES } from '../../shared/constants/countries.constant'

@Component({
  selector: 'app-landing-component',
  standalone: true,
  templateUrl: './landing-component.component.html',
  styleUrl: './landing-component.component.css',
  imports: [NgFor, NgIf, ReactiveFormsModule]
})
export class LandingComponentComponent {
  public landingForm: FormGroup<LandingFormControls>;
  public countries = COUNTRIES;
  constructor(private readonly router: Router,
    private readonly carbonState: CarbonStateService,
    private fb: FormBuilder) {
      this.landingForm = this.fb.nonNullable.group({
        country: ['', Validators.required]
      });
      this.landingForm.controls.country.valueChanges.subscribe(selectedCountry => {
        this.carbonState.setCountry(selectedCountry);
      });
  }
  public startCalculation(): void {
    if (this.landingForm.invalid) {
      this.landingForm.markAllAsTouched();
      return;
    }
    try {
      this.router.navigate([ROUTE_PATHS.calculateForm]);
    } catch (err: unknown) {
      console.error('[LandingComponent] Navigation error:', err);
    }
  }
  
}
