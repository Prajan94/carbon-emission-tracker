import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponentComponent } from './landing-component.component';
import { CarbonStateService } from '../../shared/services/carbon-state.service';
import { Router } from '@angular/router';
import { COUNTRIES } from '../../shared/constants/countries.constant';

describe('LandingComponentComponent', () => {
  let component: LandingComponentComponent;
  let fixture: ComponentFixture<LandingComponentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let carbonStateSpy: jasmine.SpyObj<CarbonStateService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    carbonStateSpy = jasmine.createSpyObj('CarbonStateService', ['setCountry']);

    TestBed.configureTestingModule({
      imports: [LandingComponentComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CarbonStateService, useValue: carbonStateSpy }
      ]
    });

    fixture = TestBed.createComponent(LandingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty country', () => {
    expect(component.landingForm.controls.country.value).toBe('');
    expect(component.landingForm.valid).toBeFalse();
  });

  it('should update CarbonStateService on country selection', () => {
    const mockCountry = COUNTRIES[0];
    component.landingForm.controls.country.setValue(mockCountry);
    expect(carbonStateSpy.setCountry).toHaveBeenCalledWith(mockCountry);
  });

  it('should mark all controls as touched if form is invalid', () => {
    const markSpy = spyOn(component.landingForm, 'markAllAsTouched');
    component.startCalculation();
    expect(markSpy).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to calculate form if form is valid', () => {
    component.landingForm.controls.country.setValue(COUNTRIES[0]);
    component.startCalculation();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['calculate-form']);
  });

  it('should log error if navigation fails', () => {
    component.landingForm.controls.country.setValue(COUNTRIES[0]);
    routerSpy.navigate.and.throwError(new Error('Navigation failed'));
    spyOn(console, 'error');

    component.startCalculation();

    expect(console.error).toHaveBeenCalledWith(
      '[LandingComponent] Navigation error:',
      jasmine.any(Error)
    );
  });
});
