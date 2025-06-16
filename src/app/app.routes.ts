import { Routes } from '@angular/router';
import { LandingComponentComponent } from './features/landing/landing-component.component';
import { InputFormComponent } from './features/input-form/input-form.component';
import { ResultComponent } from './features/results/result-component.component';
import { InsightComponent } from './features/insights/insight-component.component';
import { ROUTE_PATHS } from './shared/constants/route.constant';

export const routes: Routes = [
    { path: ROUTE_PATHS.landing, component: LandingComponentComponent },
    { path: ROUTE_PATHS.calculateForm, component: InputFormComponent },
    { path: ROUTE_PATHS.results, component: ResultComponent },
    { path: ROUTE_PATHS.insights, component: InsightComponent },
  ];
