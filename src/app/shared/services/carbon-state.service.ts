import { Injectable, signal } from '@angular/core';
import { CarbonBreakdown } from '../models/carbon-break-down.model';

@Injectable({
  providedIn: 'root',
})
export class CarbonStateService {
  // Private signals (encapsulated state)
  private readonly _footprintBreakdown = signal<CarbonBreakdown | null>(null);
  private readonly _selectedCountry = signal<string | null>(null);

  constructor() {}

  // === COUNTRY ===

  public setCountry(country: string): void {
    this._selectedCountry.set(country);
  }

  public get country(): string | null {
    return this._selectedCountry();
  }

  public get countrySignal() {
    return this._selectedCountry;
  }

  // === CARBON BREAKDOWN ===

  public setBreakdown(breakdown: CarbonBreakdown): void {
    this._footprintBreakdown.set(breakdown);
  }

  public get breakdown(): CarbonBreakdown | null {
    return this._footprintBreakdown();
  }

  public get breakdownSignal() {
    return this._footprintBreakdown;
  }

}
