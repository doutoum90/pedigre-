import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeArbresComponent } from './liste-arbres.component';

describe('ListeArbresComponent', () => {
  let component: ListeArbresComponent;
  let fixture: ComponentFixture<ListeArbresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeArbresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeArbresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
