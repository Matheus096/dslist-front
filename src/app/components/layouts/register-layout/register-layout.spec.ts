import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponentLayout } from './register-layout';

describe('RegisterLayout', () => {
  let component: RegisterComponentLayout;
  let fixture: ComponentFixture<RegisterComponentLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponentLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponentLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
