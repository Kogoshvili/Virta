import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestSectionComponent } from './suggest-section.component';

describe('SuggestSectionComponent', () => {
  let component: SuggestSectionComponent;
  let fixture: ComponentFixture<SuggestSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
