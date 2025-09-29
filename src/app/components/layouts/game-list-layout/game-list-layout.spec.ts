import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListLayoutComponent } from './game-list-layout';

describe('GameList', () => {
  let component: GameListLayoutComponent;
  let fixture: ComponentFixture<GameListLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameListLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
