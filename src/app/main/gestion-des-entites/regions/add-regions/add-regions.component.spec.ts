import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegionsComponent } from './add-regions.component';

describe('AddRegionsComponent', () => {
  let component: AddRegionsComponent;
  let fixture: ComponentFixture<AddRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
