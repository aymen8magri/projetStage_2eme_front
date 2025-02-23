import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayementClientComponent } from './edit-payement-client.component';

describe('EditPayementClientComponent', () => {
  let component: EditPayementClientComponent;
  let fixture: ComponentFixture<EditPayementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayementClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPayementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
