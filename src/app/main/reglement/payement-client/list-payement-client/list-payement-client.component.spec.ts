import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayementClientComponent } from './list-payement-client.component';

describe('ListPayementClientComponent', () => {
  let component: ListPayementClientComponent;
  let fixture: ComponentFixture<ListPayementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayementClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPayementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
