
import { FormControl } from '@angular/forms';
import { CarbonInput } from './carbon-input-form.interface';

export type CarbonInputFormControls = {
    [K in keyof CarbonInput]: FormControl<CarbonInput[K]>;
  };