import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayementFournisseurComponent } from './list-payement-fournisseur.component';

describe('ListPayementFournisseurComponent', () => {
  let component: ListPayementFournisseurComponent;
  let fixture: ComponentFixture<ListPayementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayementFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPayementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
