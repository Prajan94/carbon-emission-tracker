import { TestBed } from '@angular/core/testing';
import { CarbonCalculatorService } from './carbon-calculator.service';
import { COUNTRY_EMISSION_FACTORS } from '../../config/emission-factors';
import { CarbonInput } from '../models/carbon-input-form.interface';

describe('CarbonCalculatorService', () => {
  let service: CarbonCalculatorService;

  const mockInput: CarbonInput = {
    electricity: 100,
    gas: 50,
    heatingType: 'Electric',
    carTravel: 200,
    publicTransport: 100,
    flights: '1–2 short-haul',
    meatMeals: 7,
    packagedFood: 5
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate breakdown correctly for a valid country', () => {
    const country = 'Germany'; // Make sure this exists in COUNTRY_EMISSION_FACTORS
    const factors = COUNTRY_EMISSION_FACTORS[country];

    const result = service.calculateBreakdown(mockInput, country);

    const expectedEnergy = mockInput.electricity * factors.electricity + mockInput.gas * factors.gas;
    const expectedTransport = 
      mockInput.carTravel * factors.transportCar +
      mockInput.publicTransport * factors.publicTransport +
      factors.flight.shortHaul;
    const expectedFood = 
      mockInput.meatMeals * factors.meatMeal + 
      mockInput.packagedFood * factors.packagedFood;

    expect(result.energy).toBe(Math.round(expectedEnergy));
    expect(result.transport).toBe(Math.round(expectedTransport));
    expect(result.food).toBe(Math.round(expectedFood));
    expect(result.other).toBe(0);
  });

  it('should throw error if country not found in emission factors', () => {
    expect(() => {
      service.calculateBreakdown(mockInput, 'UnknownLand');
    }).toThrowError('Emission factors not available for country: UnknownLand');
  });

  it('should map flight value: short haul', () => {
    const spy = service as any;
    expect(spy['mapFlightValue']('1–2 short-haul')).toBe('shortHaul');
  });

  it('should map flight value: long haul', () => {
    const spy = service as any;
    expect(spy['mapFlightValue']('1–2 long-haul')).toBe('longHaul');
  });

  it('should map flight value: mixed', () => {
    const spy = service as any;
    expect(spy['mapFlightValue']('3+ mixed')).toBe('mixed');
  });

  it('should map flight value: none for unknown input', () => {
    const spy = service as any;
    expect(spy['mapFlightValue']('random value')).toBe('none');
  });
});
