import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSideComponent } from './mobile-side.component';

describe('MobileSideComponent', () => {
  let component: MobileSideComponent;
  let fixture: ComponentFixture<MobileSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
