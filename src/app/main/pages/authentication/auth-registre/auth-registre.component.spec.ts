import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegistreComponent } from './auth-registre.component';

describe('AuthRegistreComponent', () => {
  let component: AuthRegistreComponent;
  let fixture: ComponentFixture<AuthRegistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthRegistreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
