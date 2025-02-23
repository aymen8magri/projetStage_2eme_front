import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBanquesComponent } from './add-banques.component';

describe('AddBanquesComponent', () => {
  let component: AddBanquesComponent;
  let fixture: ComponentFixture<AddBanquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBanquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBanquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
