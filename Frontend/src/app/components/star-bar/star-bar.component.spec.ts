import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarBarComponent } from './star-bar.component';

describe('StarBarComponent', () => {
  let component: StarBarComponent;
  let fixture: ComponentFixture<StarBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
