import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeromodleComponent } from './heromodle.component';

describe('HeromodleComponent', () => {
  let component: HeromodleComponent;
  let fixture: ComponentFixture<HeromodleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeromodleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeromodleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
