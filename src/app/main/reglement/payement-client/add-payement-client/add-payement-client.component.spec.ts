import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayementClientComponent } from './add-payement-client.component';

describe('AddPayementClientComponent', () => {
  let component: AddPayementClientComponent;
  let fixture: ComponentFixture<AddPayementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayementClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
