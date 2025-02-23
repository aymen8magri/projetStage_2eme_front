import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocieteComponent } from './edit-societe.component';

describe('EditSocieteComponent', () => {
  let component: EditSocieteComponent;
  let fixture: ComponentFixture<EditSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
