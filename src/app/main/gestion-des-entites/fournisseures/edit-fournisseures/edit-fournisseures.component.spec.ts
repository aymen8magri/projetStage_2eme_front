import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFournisseuresComponent } from './edit-fournisseures.component';

describe('EditFournisseuresComponent', () => {
  let component: EditFournisseuresComponent;
  let fixture: ComponentFixture<EditFournisseuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFournisseuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFournisseuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
