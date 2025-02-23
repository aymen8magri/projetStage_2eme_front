import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBanqueComponent } from './edit-banque.component';

describe('EditBanqueComponent', () => {
  let component: EditBanqueComponent;
  let fixture: ComponentFixture<EditBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBanqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
