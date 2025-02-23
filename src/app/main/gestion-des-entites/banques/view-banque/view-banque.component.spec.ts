import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBanqueComponent } from './view-banque.component';

describe('ViewBanqueComponent', () => {
  let component: ViewBanqueComponent;
  let fixture: ComponentFixture<ViewBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBanqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
