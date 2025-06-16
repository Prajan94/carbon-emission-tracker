import { Injectable } from '@angular/core';
import { COUNTRY_EMISSION_FACTORS } from '../../config/emission-factors';
import { EmissionFactors } from '../../config/emission-factors';
import { CarbonBreakdown } from '../models/carbon-break-down.model';
import { CarbonInput } from '../models/carbon-input-form.interface';

@Injectable({
  providedIn: 'root'
})
export class CarbonCalculatorService {

  constructor() { }

  public calculateBreakdown(formValues: CarbonInput, selectedCountry: string): CarbonBreakdown {
    const factors = COUNTRY_EMISSION_FACTORS[selectedCountry];
    if (!factors) {
      throw new Error(`Emission factors not available for country: ${selectedCountry}`);
    }

    const energy = this.calculateEnergy(formValues, factors);
    const transport = this.calculateTransport(formValues, factors);
    const food = this.calculateFood(formValues, factors);
    const other = 0;

    return {
      energy: Math.round(energy),
      transport: Math.round(transport),
      food: Math.round(food),
      other,
    };
  }

  private calculateEnergy(input: CarbonInput, factors: EmissionFactors): number {
    return input.electricity * factors.electricity + input.gas * factors.gas;
  }

  private calculateTransport(input: CarbonInput, factors: EmissionFactors): number {
    const flightKey = this.mapFlightValue(input.flights);
    return (
      input.carTravel * factors.transportCar +
      input.publicTransport * factors.publicTransport +
      factors.flight[flightKey]
    );
  }

  private calculateFood(input: CarbonInput, factors: EmissionFactors): number {
    return input.meatMeals * factors.meatMeal + input.packagedFood * factors.packagedFood;
  }

  private mapFlightValue(userValue: string): keyof EmissionFactors['flight'] {
    switch (userValue) {
      case '1–2 short-haul':
        return 'shortHaul';
      case '1–2 long-haul':
        return 'longHaul';
      case '3+ mixed':
        return 'mixed';
      default:
        return 'none';
    }
  }
}
