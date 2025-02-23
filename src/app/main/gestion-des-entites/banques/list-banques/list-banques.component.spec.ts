import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBanquesComponent } from './list-banques.component';

describe('ListBanquesComponent', () => {
  let component: ListBanquesComponent;
  let fixture: ComponentFixture<ListBanquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBanquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBanquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
