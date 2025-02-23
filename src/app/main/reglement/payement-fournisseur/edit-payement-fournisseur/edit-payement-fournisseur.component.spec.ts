import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayementFournisseurComponent } from './edit-payement-fournisseur.component';

describe('EditPayementFournisseurComponent', () => {
  let component: EditPayementFournisseurComponent;
  let fixture: ComponentFixture<EditPayementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayementFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPayementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
