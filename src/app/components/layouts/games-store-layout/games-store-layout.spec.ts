import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesStoreLayoutComponent } from './games-store-layout';

describe('GamesStoreLayout', () => {
  let component: GamesStoreLayoutComponent;
  let fixture: ComponentFixture<GamesStoreLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesStoreLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesStoreLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
