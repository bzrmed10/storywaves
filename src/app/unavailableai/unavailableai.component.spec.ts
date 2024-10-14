import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableaiComponent } from './unavailableai.component';

describe('UnavailableaiComponent', () => {
  let component: UnavailableaiComponent;
  let fixture: ComponentFixture<UnavailableaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnavailableaiComponent]
    });
    fixture = TestBed.createComponent(UnavailableaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
