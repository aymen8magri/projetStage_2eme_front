import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModeDePayementComponent } from './add-mode-de-payement.component';

describe('AddModeDePayementComponent', () => {
  let component: AddModeDePayementComponent;
  let fixture: ComponentFixture<AddModeDePayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModeDePayementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModeDePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
