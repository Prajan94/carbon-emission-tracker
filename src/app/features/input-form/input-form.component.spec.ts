import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFormComponent } from './input-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarbonCalculatorService } from '../../shared/services/carbon-calculator.service';
import { CarbonStateService } from '../../shared/services/carbon-state.service';
import { CarbonBreakdown } from '../../shared/models/carbon-break-down.model';
import { Location } from '@angular/common';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let carbonCalculatorServiceSpy: jasmine.SpyObj<CarbonCalculatorService>;
  let carbonStateServiceStub: Partial<CarbonStateService>;

  const mockBreakdown: CarbonBreakdown = {
    energy: 300,
    transport: 800,
    food: 500,
    other: 0
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    carbonCalculatorServiceSpy = jasmine.createSpyObj('CarbonCalculatorService', ['calculateBreakdown']);

    carbonCalculatorServiceSpy.calculateBreakdown.and.returnValue(mockBreakdown);

    carbonStateServiceStub = {
      country: 'Germany',
      setBreakdown: jasmine.createSpy('setBreakdown')
    };

    await TestBed.configureTestingModule({
      imports: [InputFormComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CarbonCalculatorService, useValue: carbonCalculatorServiceSpy },
        { provide: CarbonStateService, useValue: carbonStateServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.carbonForm.value).toEqual({
      electricity: 200,
      gas: 100,
      heatingType: 'Electric',
      carTravel: 500,
      publicTransport: 300,
      flights: 'None',
      meatMeals: 7,
      packagedFood: 5
    });
  });

  it('should call services and navigate on valid form submit', () => {
    component.onSubmit();

    expect(carbonCalculatorServiceSpy.calculateBreakdown).toHaveBeenCalled();
    expect(carbonStateServiceStub.setBreakdown).toHaveBeenCalledWith(mockBreakdown);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['results']);
  });

  it('should log error if form value is null', () => {
    spyOn(console, 'error');
    spyOn(component.carbonForm, 'getRawValue').and.returnValue(null as unknown as any);

    component.onSubmit();

    expect(console.error).toHaveBeenCalled();
  });

  it('should expose slider config, heating types, and flight options', () => {
    expect(component.sliderConfig).toBeTruthy();
    expect(component.heatingTypes).toBeTruthy();
    expect(component.flightOptions).toBeTruthy();
  });
});