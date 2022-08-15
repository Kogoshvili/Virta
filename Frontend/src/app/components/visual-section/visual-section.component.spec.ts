import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSectionComponent } from './visual-section.component';

describe('VisualSectionComponent', () => {
  let component: VisualSectionComponent;
  let fixture: ComponentFixture<VisualSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
