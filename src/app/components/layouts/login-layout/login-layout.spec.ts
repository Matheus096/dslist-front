import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentLayout } from './login-layout';

describe('LoginLayout', () => {
  let component: LoginComponentLayout;
  let fixture: ComponentFixture<LoginComponentLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponentLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponentLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
