import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownSectionComponent } from './countdown-section.component';

describe('CountdownSectionComponent', () => {
  let component: CountdownSectionComponent;
  let fixture: ComponentFixture<CountdownSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdownSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
