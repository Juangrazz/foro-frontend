import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhyvComponent } from './myhyv.component';

describe('MyhyvComponent', () => {
  let component: MyhyvComponent;
  let fixture: ComponentFixture<MyhyvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyhyvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhyvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
