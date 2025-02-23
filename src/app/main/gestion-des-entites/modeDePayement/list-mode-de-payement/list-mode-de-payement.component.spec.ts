import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeDePayementComponent } from './list-mode-de-payement.component';

describe('ListModeDePayementComponent', () => {
  let component: ListModeDePayementComponent;
  let fixture: ComponentFixture<ListModeDePayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModeDePayementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModeDePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
