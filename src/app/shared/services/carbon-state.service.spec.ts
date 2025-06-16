import { CarbonStateService } from './carbon-state.service';
import { CarbonBreakdown } from '../models/carbon-break-down.model';

describe('CarbonStateService', () => {
  let service: CarbonStateService;

  const mockBreakdown: CarbonBreakdown = {
    energy: 100,
    transport: 150,
    food: 200,
    other: 50
  };

  beforeEach(() => {
    service = new CarbonStateService();
  });

  it('should set and get the selected country', () => {
    expect(service.country).toBeNull(); // initially null

    service.setCountry('Germany');
    expect(service.country).toBe('Germany');
    expect(service.countrySignal()).toBe('Germany'); // testing signal directly
  });

  it('should set and get the carbon breakdown', () => {
    expect(service.breakdown).toBeNull(); // initially null

    service.setBreakdown(mockBreakdown);
    expect(service.breakdown).toEqual(mockBreakdown);
    expect(service.breakdownSignal()).toEqual(mockBreakdown); // testing signal directly
  });
});
