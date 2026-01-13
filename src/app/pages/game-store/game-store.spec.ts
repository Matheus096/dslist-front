import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStore } from './game-store';

describe('GameStore', () => {
  let component: GameStore;
  let fixture: ComponentFixture<GameStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
