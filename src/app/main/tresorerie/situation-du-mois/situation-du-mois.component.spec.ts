import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationDuMoisComponent } from './situation-du-mois.component';

describe('SituationDuMoisComponent', () => {
  let component: SituationDuMoisComponent;
  let fixture: ComponentFixture<SituationDuMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituationDuMoisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituationDuMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
