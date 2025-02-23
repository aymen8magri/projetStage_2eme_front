import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSocieteComponent } from './view-societe.component';

describe('ViewSocieteComponent', () => {
  let component: ViewSocieteComponent;
  let fixture: ComponentFixture<ViewSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
