import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponentLayout } from './home-layout';

describe('Home', () => {
  let component: HomeComponentLayout;
  let fixture: ComponentFixture<HomeComponentLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponentLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponentLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
