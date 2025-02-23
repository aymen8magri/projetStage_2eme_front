import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayementFournisseurComponent } from './add-payement-fournisseur.component';

describe('AddPayementFournisseurComponent', () => {
  let component: AddPayementFournisseurComponent;
  let fixture: ComponentFixture<AddPayementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayementFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
