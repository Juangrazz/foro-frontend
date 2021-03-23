import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymyvComponent } from './mymyv.component';

describe('MymyvComponent', () => {
  let component: MymyvComponent;
  let fixture: ComponentFixture<MymyvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymyvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MymyvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
