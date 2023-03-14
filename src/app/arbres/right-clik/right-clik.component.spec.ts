import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightClikComponent } from './right-clik.component';

describe('RightClikComponent', () => {
  let component: RightClikComponent;
  let fixture: ComponentFixture<RightClikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightClikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightClikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
