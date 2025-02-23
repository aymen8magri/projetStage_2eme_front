import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFournisseureComponent } from './add-fournisseure.component';

describe('AddFournisseureComponent', () => {
  let component: AddFournisseureComponent;
  let fixture: ComponentFixture<AddFournisseureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFournisseureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFournisseureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
