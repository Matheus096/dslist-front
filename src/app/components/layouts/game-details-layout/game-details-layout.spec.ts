import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsLayout } from './game-details-layout';

describe('GameDetailsLayout', () => {
  let component: GameDetailsLayout;
  let fixture: ComponentFixture<GameDetailsLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailsLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
