import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymyvCardComponent } from './mymyv-card.component';

describe('MymyvCardComponent', () => {
  let component: MymyvCardComponent;
  let fixture: ComponentFixture<MymyvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymyvCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MymyvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
