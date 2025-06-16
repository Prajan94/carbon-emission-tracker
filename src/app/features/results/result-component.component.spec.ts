import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from './result-component.component';
import { Router } from '@angular/router';
import { CarbonStateService } from '../../shared/services/carbon-state.service';
import { ROUTE_PATHS } from '../../shared/constants/route.constant';
import { ElementRef } from '@angular/core';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let carbonStateStub: Partial<CarbonStateService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    carbonStateStub = {
      breakdown: {
        energy: 100,
        transport: 200,
        food: 300,
        other: 400
      }
    };

    TestBed.configureTestingModule({
      imports: [ResultComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CarbonStateService, useValue: carbonStateStub }
      ]
    });

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;

    // Simulate ViewChild
    component.reportContainer = new ElementRef(document.createElement('div'));
    fixture.detectChanges(); // Trigger effect()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart and total emission from state', () => {
    expect(component.totalEmission).toBe(1000);
    expect(component.pieChartData.datasets[0].data).toEqual([100, 200, 300, 400]);
  });

  it('should navigate to /calculateForm on recalculate()', () => {
    component.recalculate();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTE_PATHS.calculateForm]);
  });

  it('should navigate to /insights on loadInsights()', () => {
    component.loadInsights();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTE_PATHS.insights]);
  });

  it('should return correct number of treesNeeded', () => {
    const expectedTrees = Math.ceil((1000 * 52) / 21);
    expect(component.treesNeeded).toBe(expectedTrees);
  });
});
