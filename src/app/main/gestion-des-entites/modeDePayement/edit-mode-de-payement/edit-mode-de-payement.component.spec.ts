import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeDePayementComponent } from './edit-mode-de-payement.component';

describe('EditModeDePayementComponent', () => {
  let component: EditModeDePayementComponent;
  let fixture: ComponentFixture<EditModeDePayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModeDePayementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModeDePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
