import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewitemSectionComponent } from './newitem-section.component';

describe('NewitemSectionComponent', () => {
  let component: NewitemSectionComponent;
  let fixture: ComponentFixture<NewitemSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewitemSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewitemSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
